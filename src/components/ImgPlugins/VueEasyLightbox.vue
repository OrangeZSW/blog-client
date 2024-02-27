<script>
export default {

  name: "VueEasyLightbo",
  props: {
    visible:{
      type: Boolean,
      default: false
    },
    imgsRef:{
      type: Array,
      default: () => ['']
    },
    indexRef: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visibleRef:false,
    }
  },
  watch:{
    visible:{
      handler(){
        this.visibleRef = true
      },
      deep:true
    },
  },
  methods:{
    onHide() {
      this.visibleRef = false
    }
  },
  mounted() {
    // 将图片插件的显示状态同步到当前组件的显示状态
    document.body.style.overflow = this.visibleRef ? 'hidden' : 'auto'
  }
}
</script>

<template>
  <div>
    <vue-easy-lightbox
        :visible="visibleRef"
        :imgs="imgsRef"
        :index="indexRef"
        @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
