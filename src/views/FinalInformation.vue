<template>
    <div class="page">
    </div>
</template>
<style scoped>
div.page {
  background-color: #61b7a3;
  background-image: url("../assets/img/cierre_flex-pc.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
@media screen and (max-width: 550px) {
  div.page {
    background-image: url("../assets/img/cierre_flex_iphone.jpg");
    background-size: 100vh;
    background-repeat: no-repeat;
  }
}
</style>