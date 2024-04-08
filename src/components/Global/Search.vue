<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Search",
  computed:{
    ...mapState(['search'])
  },
  methods:{
    ...mapMutations(['setSearch']),
    handleClose(done){
      this.setSearch(false)
    }
  }
}
</script>

<template>
  <el-dialog :visible.sync="search"
             title="搜索"
             width="30%"
             center
             :destroy-on-close="true"
             :before-close="handleClose">
  >
    <span>需要注意的是内容是默认不居中的</span>
  </el-dialog>
</template>

<style scoped>

</style>
