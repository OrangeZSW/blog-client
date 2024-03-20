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
  <el-aside width="200px" class="content">
    <el-menu router class="menu">
      <el-menu-item class="aside_item" index="/userinfo">
        <template><v-icon>mdi-account</v-icon>基本信息</template>
      </el-menu-item>
      <el-menu-item class="aside_item"  index="/bind-email">
        <template><v-icon>mdi-email-sync</v-icon>绑定邮箱</template>
      </el-menu-item>
      <el-menu-item class="aside_item" index="/change-password">
        <template><v-icon>mdi-lock-reset</v-icon>修改密码</template>
      </el-menu-item>
      <el-menu-item  class="aside_item" index="/Custom-Settings">
        <template><v-icon>mdi-account-multiple</v-icon>自定义设置</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>

.content{
  background-color: rgba(238, 241, 246,0.8);
  overflow: hidden;
}
@media (max-width: 768px) {
  .content{

    width: auto !important;
  }
  .menu{
    padding-left: 0 !important;
  }
  .aside_item{
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
}
</style>
