<script>
export default {

  name: "VueEasyLightbo",
  props: {
    visibleRef:{
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

    }
  },
  methods:{
    onHide() {
      this.visibleRef = false
    }
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

</style>
