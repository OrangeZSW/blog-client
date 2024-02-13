<script>
export default {
  name: "Display",
}
</script>

<template>
  <div class="display">
    <div class="content">
      <div class="post-content">
        <div class="article-item"></div>
        <div class="article-item"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.post-content{
  width: 1200px;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  flex-wrap: wrap;
}
.display{
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
  flex-direction: column;

}
.content{
  width: 1200px;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 20px auto;
  flex-wrap: wrap;
}
.article-item{
  width: 866px;
  height: 235px;
  border-radius: 8px;
  margin: 20px auto 5px 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

</style>
