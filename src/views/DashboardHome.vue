<template>
  <div class="full-height">
    <div class="row no-r-margin full-height">
      <div
        class="reflex col-12 col-md-6 full-height mobile-half-height d-flex justify-content-center align-items-center"
        @click="selectTower('reflex')"
      >
      <img src="../assets/img/reflexlogo.png" alt="logoreflex" width="350">
      </div>
      <div
        class="flex col-12 col-md-6 full-height mobile-half-height d-flex justify-content-center align-items-center"
        @click="selectTower('flex')"
      >
        <img src="../assets/img/flexlogo.png" alt="logoflex" width="300">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apartment: "",
      snack: false,
    };
  },
  methods: {
    selectTower(towerSelected) {
      var tower;
      if (towerSelected == "flex") {
        tower = {
          tower: towerSelected,
        };
        window.localStorage.setItem("apartment", JSON.stringify(tower));
        this.$router.push({
          name: "home-flex",
        });
      } else {
        tower = {
          tower: towerSelected,
        };
        window.localStorage.setItem("apartment", JSON.stringify(tower));
        this.$router.push({
          name: "home-reflex",
        });
      }
    },
  },
};
</script>
<style scoped>
.full-height {
  min-height: 100vh;
}
.reflex {
  background: url("../assets/img/reflexbg.png") center center;
  
}
.reflex:hover {
  cursor: pointer;
  box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 50%);
  background: url("../assets/img/Reflex-Vista-al-parque-hover.jpg") top center;
  background-size: cover;
}
.h1Unique {
  font-size: 3em;
  text-transform: uppercase;
  font-family: 'Latinotype-ArquitectaBlack';
  word-spacing: 5px;
  letter-spacing: 1px;
}
.flex {
  background: url("../assets/img/flexbg.png") center center;
}

.flex:hover {
  cursor: pointer;
  box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 50%);
  background: url("../assets/img/vista-a-la-montaña.jpg") top center;
  background-size: cover;
}

.no-r-margin {
  margin-right: 0;
}

@media only screen and (max-width: 600px) {
  .mobile-half-height {
    min-height: 50vh;
    padding-right: 0;
  }

  .h1Unique {
    font-size: 24px;
    word-spacing: 3px;
  }
}
</style>
