<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Articles-Content",
  computed:{
    ...mapState(['articles','userDto','isLogin','total']),
    ...mapState('moment',['searchKey','isSearch']),
    length(){
      return Math.ceil(this.total/this.numberSize)
    }
  },
  methods:{
    saveArticle(res){
      this.setArticles(res.data.articles.records)
      this.setCategory(res.data.category)
      this.setTotal(res.data.articles.total)
      this.setTag(res.data.tag)
      setTimeout(()=>{
        this.loading=false
      },800)
    },
    ...mapMutations(['setArticles','setCategory','setTotal','setTag',"setAuthor"]),
    ...mapMutations('moment',['setSearchKey']),
    load(){
      this.loading = true
      if(this.$route.path==='/'){
        if(this.isLogin){
          axios.get('/article/userId/'+this.userDto.userId,{
            params: {
              Number: this.number,
              NumberSize: this.numberSize
            }
          }).then(res => {
            this.setAuthor(this.userDto)
            this.saveArticle(res)
          })
        }else{
          axios.get('/article', {
            params: {
              Number: this.number,
              NumberSize: this.numberSize
            }
          }).then(res => {
            this.setAuthor(this.user)
            this.saveArticle(res)
          })
        }
      }else if(this.$route.path==='/all-articles'){
        this.numberSize = 30
        axios.get('/article', {
          params: {
            Number: this.number,
            NumberSize: this.numberSize
          }
        }).then(res => {
          this.saveArticle(res)
        })
      }else if(this.$route.path==='/article') {
        setTimeout(()=>{
          this.loading=false
        },800)

      }
    },
    changeNumber(){
      this.load()
      document.body.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    },
    searchArticle(id){
      this.loading=true
      axios.post('/article/search',{
        userId:id,
        title: this.searchKey.title,
        category: this.searchKey.category,
        tag: this.searchKey.tag,
        number: this.number,
        numberSize: this.numberSize
      }).then(res => {
        this.saveArticle(res)
        this.$notify({
          title: '搜索成功',
          message: '搜索到'+res.data.articles.total+'篇文章',
          type: 'success',
          position: 'top-left',
        });

      })
    },
    searchSetting(){
      this.setSearchKey(this.key)
      let id=this.$route.path==='/' ? ( this.isLogin ? this.userDto.userId : '') : ''
      this.searchArticle(id)
    },
    reSet(){
      this.key={}
      this.searchSetting()
    }
  },
  watch:{
    userDto : {
      handler:function(){
        this.load()
      },
      deep:true
    },
    isSearch:{
      handler:function(){
        this.searchArticle("")
      },
      deep:true
    },
  },
  mounted() {
    this.load()
  },
  data(){
    return{
      fullscreenLoading: false,
      number:1,
      content:[],
      numberSize:10,
      site_img:'https://server.blog.zorange.online/files/download/8dab8d9ad1c5489e9d49f7d1b05656bf.png',
      user:{
        username:'Orange',
        description:'一个前端小白',
      },
      key:{
        category:'',
        tag:'',
        title:'',
      },
      loading:true,
    }
  }
}
</script>
<template>
  <div class="articles-content "  >


    <!--    搜索-->
    <div style="display: flex;margin: auto auto auto auto;flex-wrap: wrap;justify-content: center;align-items: center">
      <el-input  class="mr-2 mt-2 phone-input"  placeholder="标题" v-model="key.title"></el-input>
      <el-input class="mr-2 mt-2 phone-input" placeholder="分类" v-model="key.category"></el-input>
      <el-input class="mr-2 mt-2 phone-input"  placeholder="标签" v-model="key.tag" ></el-input>
      <el-button class="mr-2 mt-2"  type="primary" style="width: 150px" @click="searchSetting"  >搜索</el-button>
      <el-button class="mr-2 mt-2" type="primary" style="width: 150px" @click="reSet"  >重置</el-button>
    </div>


    <!--    当搜索到文章为0时-->
    <div v-loading="loading" class="mt-4" v-if="articles.length===0" style="width: 100%;height: 50vh;display: flex;justify-content: center;align-items: center">
      <el-skeleton />
      <h1>
        没有搜索到相关文章
      </h1>
      <el-image style="width: 100%;height: 100%" src="https://server.blog.zorange.online/files/download/130010d2f1cf42c5a6d46949bfc01c44.png" fit="cover"></el-image>
    </div>

    <div  v-for="(article,index) in articles" :key="index" style="width: 100%;height: auto">
      <slot v-if="index<articles.length&&index%2===0">
        <div v-loading="loading" @contextmenu="" class="article-item"  >
          <router-link :to="/article-context/+articles[index].articleId"  class="a-bg">
            <el-image lazy  fit="cover"  class="article-bg" :title="articles[index].title" :src="articles[index].coverImg" >
            </el-image>
          </router-link>
          <div class="article-info">
            <router-link :to="/article-context/+articles[index].articleId" class="article-title" :title="articles[index].title">{{ articles[index].title }}</router-link>
            <div class="article-meta">
              <v-icon style="font-size: 1.5em">mdi-calendar-range</v-icon>
              <span style="margin-right: 4px">发表于</span>
              <span>{{ articles[index].createdAt }} </span>
              <span v-if="articles[index].category!==''">
                |
                <v-icon style="font-size: 1.5em" >mdi-book-variant</v-icon>
              <span>{{ articles[index].category }}</span>
              </span>
              <span v-if="articles[index].tag!==''">
                |
                <v-icon style="font-size: 1.5em">mdi-tag</v-icon>
              <span>{{ articles[index].tag }}</span>
              </span>
            </div>
            <div class="content" >{{articles[index].content}}</div>
          </div>
        </div>


        <div v-loading="loading"  class="article-item phone-item"  v-if="index<articles.length-1" >
          <el-skeleton />
          <div class="article-info"  >
            <router-link :to="/article-context/+articles[index+1].articleId" class="article-title" :title="articles[index+1].title">{{ articles[index+1].title }} </router-link>
            <div class="article-meta" >
              <v-icon style="font-size: 1.5em">mdi-calendar-range</v-icon>
              <span style="margin-right: 4px">发表于</span>
              <span>{{ articles[index+1].createdAt }}</span>
              <span v-if="articles[index+1].category!==''">
                |
                <v-icon style="font-size: 1.5em">mdi-book-variant</v-icon>
              <span>{{ articles[index+1].category }}</span>
              </span>
              <span v-if="articles[index+1].tag!==''">
                |
                <v-icon style="font-size: 1.5em">mdi-tag</v-icon>
              <span>{{ articles[index+1].tag }}</span>
              </span>
            </div>
            <div class="content">{{articles[index+1].content}}</div>
          </div>

          <router-link :to="/article-context/+articles[index+1].articleId" class="a-bg" style=" @media (max-width: 768px) {
                display: none;
              }">
            <el-image lazy fit="cover" class="article-bg" :title="articles[index+1].title" :src="articles[index+1].coverImg" >
            </el-image>
          </router-link>

        </div>
      </slot>
    </div>
    <v-pagination :length="length"
                  class="pagination"
                  v-model="number"
                  @input="changeNumber"
    ></v-pagination>
  </div>
</template>

<style scoped>
.phone-input{
  width: 19%;
}
.content{
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pagination{
  margin: 20px auto;
  transition: all 0.5s ease;
}
.article-meta{
  margin: 6px 0;
  color: #858585;
  font-size: 0.9em;
}
.article-title{
  text-decoration: none;
  color: black;
  font-size: 1.55em;
  transition: color 0.2s ease;
}
.article-title:hover{
  color: #49B1F5;
}
.article-bg{
  width: 25.9em;
  height: 16.8em;
  object-fit: cover;
  overflow: hidden;
  transition: all 0.5s ease;
}
.a-bg{
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  margin: 0;
}
.article-item:hover .article-bg{
  transform: scale(1.1);
}
.article-info{
  width: 62%;
  padding: 0 40px;
  -webkit-box-orient: vertical;
}

.articles-content{
  width: auto;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  line-height: 2;
}
.article-item{
  display: flex;
  overflow: hidden ;
  height: 16.8em;
  border-radius: 8px;
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
  margin-top: 20px ;
  align-items: center;
}
.articles-content .article-item:hover{
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.09);
  transition: all 0.5s ease;
}

@media (max-width: 768px) {
  .phone-input{
    width: 60%;
  }
  .articles-content{
    width: 100%;
  }

  .article-item{
    height: 35em;
    margin: 20px 5px 5px 5px;
    overflow: hidden;
    flex-direction: column;
  }
  .article-bg{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .a-bg{
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    margin: 0;
  }
  .article-info{
    width: 100%;
    height: 100%;
    padding: 20px 20px 30px;
  }
  .phone-item{
    flex-direction: column-reverse;
  }
}
</style>
