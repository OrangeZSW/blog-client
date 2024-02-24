<script>
import ArticlesContent from "@/components/Articles-Content.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "Display",
  components: {SideBar, ArticlesContent},
  props:{
    articles:[]
  },
  data(){
    return{
    }
  }
}
</script>

<template>
  <div class="display">
    <div class="content" >
      <ArticlesContent :articles="this.articles"/>
      <SideBar/>
    </div>
  </div>
</template>

<style scoped>

.display{
  display: flex;
  width: 100%;
  background-color: #fff;
  flex-direction: column;
  flex-wrap: wrap;
}
.content{
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  margin: 0 auto ;
  flex-wrap: wrap;
  overflow-x: hidden;
  padding: 40px 15px;
  flex: 1;
}
@media (max-width: 768px) {
  .content{
    width: 100%;
  }
}

</style>
