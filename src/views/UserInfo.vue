<script>
import Header from "@/components/Global/Header.vue";
import PageHeader from "@/components/Page-Header.vue";

export default {
  name: "UserInfo",
  components: {PageHeader, Header}
}
</script>

<template>
  <div>
    <div>
      <Header/>
      <PageHeader style="height: 200px;"/>
      <div class="content">

      </div>
    </div>
  </div>
</template>

<style scoped>
.content{
  width: 50%;
  height: 100vh;
  margin: 20px auto 20px auto;
}
</style>
