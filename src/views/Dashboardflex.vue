<template>
  <div class="full-height">
    <div class="row no-r-margin full-height">
      <div
        class="vistaCiudad col-12 col-md-6 full-height mobile-half-height d-flex justify-content-center align-items-center"
        @click="selectApartment('vista-ciudad')"
      >
        <h1 class="text-white h1Unique">Con vista a la ciudad</h1>
      </div>
      <div
        class="vistaMontaña col-12 col-md-6 full-height mobile-half-height d-flex justify-content-center align-items-center"
        @click="selectApartment('vista-montaña')"
      >
        <h1 class="text-white h1Unique">Con vista a la montaña</h1>
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
      if (apartment == "vista-ciudad") {
        apt = {
          view: apartment,
        };
        window.localStorage.setItem("apartment", JSON.stringify(apt));
        this.$router.push({
          name: "Choose City Apartment",
        });
      } else {
        apt = {
          view: apartment,
        };
        window.localStorage.setItem("apartment", JSON.stringify(apt));
        this.$router.push({
          name: "Choose Mountain Apartment",
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
.vistaCiudad {
  background-color: #61b7a3; /* #62aa95 */
  
}
.vistaCiudad:hover {
  cursor: pointer;
  box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 50%);
  background: url("../assets/img/Vista-a-la-ciudad.jpg") top center;
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
.vistaMontaña {
  background-color: #e1830d;
}

.vistaMontaña:hover {
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
