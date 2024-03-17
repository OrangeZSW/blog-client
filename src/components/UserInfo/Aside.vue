<script>
import router from "@/router";

export default {
  name: "Aside",
  methods: {
    router() {
      return router
    }
  }
}
</script>

<template>
  <el-aside width="200px" style="background-color: rgba(238, 241, 246,0.8);overflow: hidden;">
    <el-menu router>
      <el-menu-item index="/userinfo">
        <template><v-icon>mdi-account</v-icon>基本信息</template>
      </el-menu-item>
      <el-menu-item index="/bind-email">
        <template><v-icon>mdi-email-sync</v-icon>绑定邮箱</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>

</style>
