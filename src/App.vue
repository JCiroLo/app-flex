<template>
  <div id="app" class="background-white">
    <router-view class="full-height"/>
  </div>
</template>
<script>
// tmp comment: bug fix reservation inconsistencies
</script>
<style>
  @font-face {
    font-family: "Latinotype-ArquitectaBlack";
    src: url("./assets/fonts/Latinotype-ArquitectaBlack.otf") format("opentype");
  }
  @font-face {
    font-family: "Latinotype-ArquitectaLight";
    src: url("./assets/fonts/Latinotype-ArquitectaLight.otf") format("opentype");
  }
  @font-face {
    font-family: "Latinotype-ArquitectaHeavy";
    src: url("./assets/fonts/Latinotype-ArquitectaHeavy.otf") format("opentype");
  }
  #app {
    min-height: 100vh;
    font-family: 'Latinotype-ArquitectaLight', Verdana, Helvetica;
  }
  body, p, span, div {
    font-size: 1.2rem !important;
  }
  .title-underline {
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.5rem;
    margin-bottom: 0;
    width: 10rem;
    border-top: 1px solid #b1b1b1;
  }
  .cutsom-bold {
    font-weight: bold;
  }
</style>
