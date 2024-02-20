<script>
import {mapState} from "vuex";

export default {
  name: "Page-Header",
  computed: {
    ...mapState(['userDto', 'isLogin']),
  },
  data(){
    return{
      site_img:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png',
    }
  }
}
</script>

<template>
  <div class="page-header" :style="{'background-image': `url(${isLogin ? userDto.coverImg : site_img})`}">
      <span class="blog-title">{{this.$route.name}}</span>
  </div>
</template>

<style scoped>
.meta-firstLine{
  color: white;
  z-index: 1;
}
.blog-title{
  font-size: 2.85em;
  color: white;
  font-weight: bold;
  z-index: 1;
}
.page-header{
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
}
.page-header:before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 0;
  border-radius: 10px;
}

</style>
