<script>
import {mapState} from "vuex";
import Header from "@/components/Global/Header.vue";
import ServerIP from "@/assets/config";

export default {
  name: "update-article",
  components: {Header},
  computed: {
    ...mapState(['userDto', 'articles'])
  },
  data() {
    return {
      drawer: false,
      articleInfo: {},
      articleId: 0,
      articleText: '',
    }
  },
  methods: {
    ServerIP() {
      return ServerIP
    },
    getArticle() {
      this.articles.forEach(item => {
        if (item.articleId + '' === this.articleId) {
          this.articleInfo = item
          // 去掉content字段
          delete this.articleInfo.content
          delete this.articleInfo.createdAt
          axios.get(item.url).then(res => {
            this.articleText = res
          })
        }
      })
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
    saveArticle() {
      //保存text到电脑,让用户自己选择保存路径
      // 创建 Blob 对象
      const blob = new Blob([this.text], {type: 'text/plain'});
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
    handleSuccess(res) {
      //复制res.data到剪切板
      if (res.code === '200') {
        let imgUrl = res.data.toString()
        navigator.clipboard.writeText(imgUrl)

        this.$message({
          message: '上传成功,已复制URL到剪切板',
          type: 'success'
        });
        this.articleInfo.coverImg = imgUrl
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        });
      }
    },
    save() {
      //保存文件信息
      const file = new Blob([this.articleText], {type: 'text/markdown'})
      const formData = new FormData()
      formData.append('file', file, this.articleInfo.title + '.md')
      formData.append('url', this.articleInfo.url)
      axios.post('/files/updateArticle',formData).then(res=>{
        if(res.code === '200'){
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
      //保存文章信息
      axios.post('/article',this.articleInfo).then(res=>{
        if(res.code === '200'){
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
      this.$router.push('/article-context/'+this.articleId)
    }
  },
  mounted() {
    this.articleId = this.$route.params.id
    this.getArticle()
  }
}
</script>

<template>
  <div>
    <Header/>
    <div :style="{'background-image': `url(${userDto.coverImg})`}" style="width: 100%;height: 100vh;display: flex">
      <!--      侧边栏-->
      <el-drawer
          :visible.sync="drawer"
          direction="ltr"
          size="30%"
          title="文章信息">
        <div style="padding: 10px 30px;">
          <el-tag type="success">标题</el-tag>
          <el-input class="mt-5" v-model="articleInfo.title"></el-input>
          <el-tag class="mt-5">分类</el-tag>
          <el-input class="mt-5" v-model="articleInfo.category"></el-input>
          <el-tag class="mt-5" type="info">标签</el-tag>
          <el-input class="mt-5" v-model="articleInfo.tag"></el-input>
          <el-tag class="mt-5" type="warning">背景图片</el-tag>
          <el-input class="mt-5" v-model="articleInfo.coverImg"></el-input>
          <el-upload
              class="upload-demo mt-5"
              show-file-list
              :action="ServerIP()+ '/files/upload/img'"
              :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传图片</el-button>
          </el-upload>
          <el-button class="mt-5" type="primary" style="margin:0 60px 0 auto" @click="save">保存</el-button>
        </div>
      </el-drawer>
      <!--      按钮区-->
      <div style="margin: 70px auto auto auto;z-index: 3">
        <el-button @click="drawer = !drawer" type="primary" >查看文章信息
        </el-button>
        <el-button @click="save" type="primary">保存文章</el-button>
      </div>

      <!--      编辑和预览区-->
      <v-md-editor v-model="articleText"
                   :disabled-menus="[]"
                   @upload-image="handleUploadImage"
                   @save="saveArticle"
                   default-show-toc="true"
                   :include-level="[1,2]"
                   height="800px"
                   style="position: absolute;bottom: 0"
      ></v-md-editor>


    </div>
  </div>

</template>

<style scoped>
* {
  font-size: 20px;
}
</style>
