<template>
  <div class="full-height">
    <div class="row no-r-margin full-height">
      <div
        class="vistaCiudadReflex col-12 col-md-6 full-height mobile-half-height d-flex justify-content-center align-items-center"
        @click="selectApartment('vista-ciudad-reflex')"
      >
        <h1 class="text-white h1Unique">Vista a la ciudad</h1>
      </div>
      <div
        class="vistaParqueReflex col-12 col-md-6 full-height mobile-half-height d-flex justify-content-center align-items-center"
        @click="selectApartment('vista-parque')"
      >
        <h1 class="text-white h1Unique">Vista al parque</h1>
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
    selectApartment(apartment) {
      var apt;
      if (apartment == "vista-ciudad-reflex") {
        apt = {
          view: apartment,
        };
        window.localStorage.setItem("apartment", JSON.stringify(apt));
        this.$router.push({
          name: "Choose-City-Reflex",
        });
      } else {
        apt = {
          view: apartment,
        };
        window.localStorage.setItem("apartment", JSON.stringify(apt));
        this.$router.push({
          name: "Choose-Park-Reflex",
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
.vistaCiudadReflex {
  background: url("../assets/img/Reflex-Vista-a-la-ciudad-hover.jpg") top center;
  background-size: cover;
  transition: background-image .5s ease-out;
}
.vistaCiudadReflex:hover {
  cursor: pointer;
  box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 50%);
  background: url("../assets/img/Reflex-Vista-a-la-ciudad.jpg") top center;
  background-size: cover;
}
.h1Unique {
  font-size: 3em;
  text-transform: uppercase;
  font-family: 'Latinotype-ArquitectaBlack';
  word-spacing: 5px;
  letter-spacing: 1px;
  text-align:center;
}
.vistaParqueReflex {
  background: url("../assets/img/Reflex-Vista-al-parque-hover.jpg") top center;
  background-size: cover;
  transition: background-image .5s ease-out;
}

.vistaParqueReflex:hover {
  cursor: pointer;
  box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 50%);
  background: url("../assets/img/Reflex-Vista-al-parque.jpg") top center;
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
