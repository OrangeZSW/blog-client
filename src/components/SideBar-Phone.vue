<script>
export default {
  name: "SideBar-Phone"
}
</script>

<template>
  <div class="sideBar-menu" ref="sideBarPhone">

  </div>
</template>

<style scoped>
.sideBar-menu{
  z-index: 3;
  background-color: white;
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  transition: all 0.5s ease;
}

</style>
