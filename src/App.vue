<template>
  <v-app>
    <v-main >
      <router-view/>
      <SideBarPhone />
      <Login/>
    </v-main>
  </v-app>
</template>
<script>
const debounce = (fn, delay) => {

  let timer = null;

  return function () {

    let context = this;

    let args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function () {

      fn.apply(context, args);

    }, delay);

  }

}

// 解决ERROR ResizeObserver loop completed with undelivered notifications.

//问题的

const _ResizeObserver = window.ResizeObserver;

window.ResizeObserver = class ResizeObserver extends _ResizeObserver {

  constructor(callback) {

    callback = debounce(callback, 16);

    super(callback);

  }

}
import SideBarPhone from "@/components/SideBar-Phone.vue";
import Login from "@/components/Login.vue";
import {mapMutations} from "vuex";

export default {
  name: 'App',
  components: {Login, SideBarPhone},
  methods:{
    ...mapMutations(['backLoginWindow'])
  },
  mounted() {
    document.addEventListener('click', this.backLoginWindow)
  }
};
</script>

<style>
::selection {
  background-color: #00C4B6;
  color: #ffffff;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 20px;
  line-height: 2;
}
/* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
body::-webkit-scrollbar {
  display: none;

}

/* 隐藏 IE、Edge 和 Firefox 的滚动条 */
body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  overflow: auto;
}
body:before{
  position: fixed;
  top: 0;
  left: 0;
  width: var(--width);
  height: 100%;
  content: '';
  background-color: rgba(0,0,0,0.7);
  transition:width 0.5s ease;
  z-index: 2;
}
:root{
  --width: 0;
}
</style>
