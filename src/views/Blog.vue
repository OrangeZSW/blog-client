
<template>
  <div>
    <div class="wrapper">
      <Header/>
      <Center/>
    </div>
    <div class="main"></div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Center from "@/components/Center.vue";
export default {
  components: {
    Header,
    Center
  },
  name: "Blog",
  computed: {
  },
  data(){
    return {
      background_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png',
    }
  },
  methods: {

  },
}
</script>

<style scoped>


.wrapper{
  width: 100%;
  display: flex;
  flex-direction: column;
  background-position: center;
  /*图片将被拉伸或缩小以覆盖整个容器，可能会有部分裁剪*/
  background-size: cover;
  background-image: url("https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png");
  /*设置背景大小*/
  height: 100vh;
  /*超过的隐藏*/
  overflow: hidden;
  border-radius: 10px;
  /*滤镜*/
  filter: brightness(0.9);
}

.main{
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
