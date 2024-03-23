<script>

import Header from "@/components/Global/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import ServerIP from "@/assets/config";
import {mapState} from "vuex";


export default {
  name: "Editor-Article",
  components: {PageHeader, Header},
  computed: {
    ...mapState(['userDto', 'isLogin'])
  },
  mounted() {
    //获取markdown教程文章
    axios.get("https://server.blog.zorange.online/files/download/fcfcaf84f5614a43b23b48df6d3b0dc8.md").then(res => {
      this.text = res
      this.Markdown = res
    })
  },
  data() {
    return {
      drawer: false,
      toPath:'',
      Markdown: '',
      dialog: false,
      site_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png',
      text: '',
      article: {
        title: '',
        category: '',
        tag: '',
        coverImg: '',
        url: '',
        createdAt:'',
        lastUpdatedAt:''
      }
    }
  },
  methods: {
    ServerIP() {
      return ServerIP
    },
    handleSuccess(res) {
      //复制res.data到剪切板
      if(res.code==='200'){
        let imgUrl = res.data.toString()
        navigator.clipboard.writeText(imgUrl)

        this.$message({
          message: '上传成功,已复制URL到剪切板',
          type: 'success'
        });
        this.article.coverImg = imgUrl
      }else{
        this.$message({
          message: res.msg,
          type: 'error'
        });
      }
    },
    handleUploadImage(event, insertImage, files) {
      console.log(files)
      //上传图片
      files.forEach(file => {
        const formData = new FormData()
        formData.append('file', file)
        axios.post('/files/upload/img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          insertImage({
            url: res.data,
            desc: file.name
          })
        })
      })
    },
    publish() {
      if(!this.isLogin){
        this.$message({
          message: '请先登录',
          type: 'error'
        })
        return
      }
      if (this.article.title === '') {
        this.$message({
          message: '请填写标题',
          type: 'warning'
        })
        return
      }
      //创建一个.md文件，并且将里面的内容设置为text,上传到服务器
      const article = new Blob([this.text], {type: 'text/markdown'})
      const formData = new FormData()
      formData.append('file', article, this.article.title + '.md')
      axios.post('/files/upload/article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.article.url = res.data
        this.article.userId = this.userDto.userId
        axios.post('/article', this.article).then(res => {
          if(res.code === '200'){
            this.$router.push('/article-context/'+res.data)
            this.$message({
              message: '发布成功',
              type: 'success'
            });
          }
        })
      })

    },
    saveArticle() {
      //保存text到电脑,让用户自己选择保存路径
      // 创建 Blob 对象
      const blob = new Blob([this.text], { type: 'text/plain' });
      const fileName = (this.article.title === '' ? 'article' : this.article.title) + '.md'

      // 创建一个隐藏的 <a> 元素
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;

      // 将 <a> 元素添加到页面中
      document.body.appendChild(a);

      // 触发点击事件
      a.click();

      // 清理 URL 对象，释放内存
      URL.revokeObjectURL(a.href);
      document.body.removeChild(a); // 移除 <a> 元素

    },
    confirmLeave() {
      this.dialog = false
      this.text= this.Markdown
      this.$router.push(this.toPath)
    },
    cancel() {
      this.dialog = false
    }
  },
  beforeRouteLeave(to, from, next) {
    if(to.path.includes('/article-context')){
      next()
    }
    if (this.text !== this.Markdown&& this.text !== '') {
      this.dialog = true
      this.toPath = to.path
      next(false)
    } else {
      next()
    }
  }
}
</script>

<template>
  <div style="display: flex">
    <Header style="z-index: 3"/>
    <div class="editor-article-header" :style="{'background-image': `url(${isLogin ? userDto.coverImg : site_img})`}">
<!--      侧边栏-->
      <el-drawer
          title="文章信息编辑"
          :visible.sync="drawer"
          size="30%"
          direction="ltr">
       <div style="padding: 10px 30px">
         <span style="font-size: 20px">文章标题:</span>
         <el-input class="mt-5 mb-5" v-model="article.title"  placeholder="请输入文章标题"
                   value=""></el-input>
         <span style="font-size: 20px;">文章分类:</span>
         <el-input class="mt-5 mb-5" v-model="article.category"  placeholder="请输入文章分类"
                   value=""></el-input>
         <span  style="font-size: 20px;">标签:</span>
         <el-input class="mt-5 mb-5" v-model="article.tag"  placeholder="请输入文章标签"
                   value=""></el-input>
         <span  style="font-size: 20px;">文章背景图片:</span>
         <el-input class="mt-5 " v-model="article.coverImg"   placeholder="CoverUrl"
                   value=""></el-input>
         <el-upload
             class="upload-demo mt-5 mb-5"
             show-file-list
             :action="ServerIP() + '/files/upload/img'"
             :on-success="handleSuccess"
         >
           <el-button  size="small" type="primary">点击上传图片</el-button>
         </el-upload>
       </div>
      </el-drawer>
<!--      按钮区-->
      <div style="margin: 70px auto auto auto" >
          <el-button type="primary" @click="drawer = true">文章信息编辑</el-button>
        <el-button type="primary"  @click="publish">发布</el-button>
      </div>
    </div >
      <v-md-editor v-model="text"
                   :disabled-menus="[]"
                   @upload-image="handleUploadImage"
                   @save="saveArticle"
                   default-show-toc="true"
                   :include-level="[1,2]"
                   height="800px"
                   style=" position: absolute;bottom: 0"
      ></v-md-editor>
    <template>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>确认放弃编辑？</v-card-title>
          <v-card-actions>
            <v-btn color="red darken-1" text @click="cancel">取消</v-btn>
            <v-btn color="green darken-1" text @click="confirmLeave">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<style scoped>
.editor-article-header {
  width: 100%;
  height: 100vh;
  background-color: #a29f9f;
  display: flex;
}

</style>
