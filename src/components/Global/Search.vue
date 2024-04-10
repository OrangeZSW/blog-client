<script>
import {mapMutations, mapState} from "vuex";
import router from "@/router";
import moment from "@/store/moment";

export default {
  name: "Search",
  computed:{
    ...mapState(['search']),
    ...mapState('moment',['isSearch'])
  },
  methods:{
    ...mapMutations(['setSearch']),
    ...mapMutations(['setArticles','setCategory','setTotal','setTag']),
    ...mapMutations('moment',['setSearchKey','setIsSearch',]),
    handleClose(){
      this.setSearch(false)
    },
    searchArticle(){
      this.searchParams.tag = this.searchParams.title
      this.searchParams.category = this.searchParams.title
      this.setSearchKey(this.searchParams)
      this.setSearch(false)

      setTimeout(()=>{
        this.setIsSearch(!this.isSearch)
      },1000)
      router.push({path: '/all-articles'})

    }
  },
  data() {
    return {
      dialogWidth: window.innerWidth>768 ? '30%' : '80%',
      searchParams: {
        title: '',
        category: '',
        tag: '',
      }
    }
  },
}
</script>

<template>
  <el-dialog :visible.sync="search"
             title="文章搜索"
             :width="dialogWidth"
             center
             :destroy-on-close="true"
             :before-close="handleClose">
    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
      <el-input class="mb-2" placeholder="搜索" v-model="searchParams.title"  :style="'width:80%'"></el-input>
      <el-button class="mb-2" type="primary" @click="searchArticle" style="width: 30%">搜索</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>
