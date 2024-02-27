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
        document.body.style.overflow = 'auto'
        this.visibleRef = true
      },
      deep:true
    },
  },
  methods:{
    onHide() {
      document.body.style.overflow = 'auto'
      this.visibleRef = false
    }
  },
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
