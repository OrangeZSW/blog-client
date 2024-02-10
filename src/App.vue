<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
::selection {
  background-color: #00C4B6;
  color: #ffffff;
}
*{
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 20px;
}
/* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
body::-webkit-scrollbar {
  display: none;
}

/* 隐藏 IE、Edge 和 Firefox 的滚动条 */
body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  overflow-x: hidden;
}

</style>
