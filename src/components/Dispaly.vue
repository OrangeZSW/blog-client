<script>
export default {
  name: "Display",
  data(){
    return{
      article:{}
    }
  }
}
</script>

<template>
  <div class="display">

    <div class="content" >
      <div class="post-content" v-model="article">
        <div class="article-item"></div>
        <div class="article-item"></div>
        <div class="article-item"></div>
        <div class="article-item"></div>
      </div>
      <div class="sidebar" style="margin-top: 20px">
        <el-card class="card">

        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>



.card{
  padding: 20px 24px;
}

@media (min-width: 768px) {
  .sidebar{
    width: 26%;
    padding: 0 0 0 15px;
    position: relative;
  }
}
.post-content{
  width: 74%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
}
.display{
  display: flex;
  width: 100%;
  background-color: #fff;
  flex-direction: column;

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
}
.article-item{
  width: 866px;
  height: 235px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px ;
}
@media (max-width: 768px) {
  .post-content{
    width: 100%;
  }
  .content{
    width: 100%;

  }
  .article-item{
    height: 414px;
    width: 100%;
    margin: 20px 5px 5px 5px;
  }
}

</style>
