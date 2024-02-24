<script>

import Header from "@/components/Header.vue";
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
    axios.get('http://127.0.0.1:8181/files/download/4b2453c773ed42739e1ce78390d5799c.md').then(res => {
      this.text = res
    })
  },
  data() {
    return {
      site_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png',
      text: '',
      article: {
        userId: '',
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
      let imgUrl = res.data.toString()
      navigator.clipboard.writeText(imgUrl)

      this.$message({
        message: '上传成功,已复制URL到剪切板',
        type: 'success'
      });
      this.article.coverImg = imgUrl
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
      if (this.article.title === '' || this.article.category === '' || this.article.tag === '' || this.article.coverImg === '') {
        this.$message({
          message: '请填写完整信息',
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
        this.article.createdAt = new Date()
        this.article.lastUpdatedAt = new Date()
        this.article.userId = this.userDto.userId
        axios.post('/article', this.article).then(res => {
          if(res.code === '200'){
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.$router.push('/')
          }
        })
      })

    }
  }
}
</script>

<template>
  <div>
    <Header style="z-index: 3"/>
    <div class="editor-article-header" :style="{'background-image': `url(${isLogin ? userDto.coverImg : site_img})`}">
      <div class="article-meta">
        <span style="font-size: 20px">文章标题:</span>
        <el-input v-model="article.title" style="margin-left: 10px;width: 150px" placeholder="请输入文章标题"
                  value=""></el-input>
        <span style="font-size: 20px;margin-left: 20px">文章分类:</span>
        <el-input v-model="article.category" style="margin-left: 10px;width: 150px" placeholder="请输入文章分类"
                  value=""></el-input>
        <span style="font-size: 20px;margin-left: 20px">标签:</span>
        <el-input v-model="article.tag" style="margin-left: 10px;width: 150px" placeholder="请输入文章标签"
                  value=""></el-input>
        <span style="font-size: 20px;margin-left: 20px">文章背景图片:</span>
        <el-input v-model="article.coverImg" style="margin-left: 10px;width: 150px" placeholder="CoverUrl"
                  value=""></el-input>
        <el-upload
            style="margin-left: 20px;"
            class="upload-demo"
            show-file-list
            :action="ServerIP() + '/files/upload/img'"
            :on-success="handleSuccess"
        >
          <el-button size="small" type="primary">点击上传图片</el-button>
        </el-upload>

        <el-button type="primary" style="margin:0 60px 0 auto" @click="publish">发布</el-button>
      </div>
    </div>
    <div>
      <v-md-editor v-model="text"
                   :disabled-menus="[]"
                   @upload-image="handleUploadImage"
                   default-show-toc="true"
      ></v-md-editor>
    </div>
  </div>
</template>

<style scoped>
.editor-article-header {
  width: 100%;
  height: 150px;
  background-color: #a29f9f;
}

.article-meta {
  display: flex;
  position: absolute;
  top: 90px;
  left: 40px;
  font-weight: bold;
  color: white;
  width: 100%;
  height: 50px;
  overflow: hidden;
}
</style>
