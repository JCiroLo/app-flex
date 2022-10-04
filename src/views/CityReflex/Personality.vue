<template>
  <div>
    <base-nav
      ref="mobileBar"
      class="d-md-none navbar navbar-expand-lg navbar-dark transparent"
      :transparent="transparent"
      v-model="showNavbar"
      type="success"
    >
      <a slot="brand" class="navbar-brand" href="#">
        <img src="../../assets/img/ReflexLogoWhite.png" class="img-fluid" alt width="200" />
      </a>
      <div class="navbar-collapse-header">
        <div class="row">
          <div class="col-6 collapse-brand">
            <a href="#">
              <img src="../../assets/img/reflexlogo.png" />
            </a>
          </div>
          <div class="col-6 collapse-close" @click="closeMobileBar">X</div>
        </div>
      </div>

      <ul class="navbar-nav ml-lg-auto">
        <li class="nav-item">
          <router-link class="d-flex" to="/home">
            <span class="material-icons text-success">done</span>
            <p class="px-1 text-success">Selecciona la vista</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" to="/choose-city-apartment">
            <span class="material-icons text-success">done</span>
            <p class="px-1 text-success">Elige tu apartamento</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" to="/personality-city">
            <span class="material-icons text-success">keyboard_arrow_right</span>
            <p class="px-1 text-success cutsom-bold">Adáptalo a tu personalidad</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" :event="showNextArrow ? 'click' : ''" to="/apartment-reservation-city">
            <span class="material-icons text-success">https</span>
            <p class="px-1 text-success">Reserva tu apartamento</p>
          </router-link>
        </li>
      </ul>
    </base-nav>
    <div class="full-height">
      <div class="row no-r-margin full-height">
        <!-- Start side bar -->
        <CustomSideBarReflex
          :canContinue="showNextArrow"
          currentView="city-reflex"
          currentLink="personality"
        />
        <!-- End side bar -->
        <div class="col background-white pa-1 full-height pt-4">
          <!-- col-12 col-md-9 col-lg-9 col-xl-10 background-white pa-1 full-height pt-4 -->
          <div class="container">
            <h1 class="text-greenUnique text-center py-3">
              PASO 3 DE 4: ADÁPTALO A TU PERSONALIDAD
              <hr class="title-underline"/>
              </h1>
            <p class="p-general-text text-center">
              ¡Excelente! Ahora sigue lo mejor. Este apartamento lo puedes personalizar. Elige la distribución que mejor se adapte a tu personalidad.
            </p>
            <!-- Sart tabs -->
            <PersonalityTabsReflex v-on:p-select="selectPersonality" />
            <!-- End tabs -->
          </div>
          <NavArrowsReflex
            :canContinue="showNextArrow" 
            prevUrl="/choose-city-reflex"
            nextUrl="/apartment-reservation-city-reflex"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PersonalityTabsReflex from '../../components/PersonalityTabs/PersonalityTabsReflex.vue';
import NavArrowsReflex from '../../components/NavArrowsReflex';
import CustomSideBarReflex from '../../components/CustomSideBarReflex';
export default {
  components: { PersonalityTabsReflex, NavArrowsReflex, CustomSideBarReflex },
  data() {
    return {
      personality: "contectados",
      transparent: true,
      showNavbar: false,
      showNextArrow: false
    };
  },
  methods: {
    closeMobileBar() {
      this.$refs.mobileBar.closeMenu()
    },
    selectPersonality(personalityName) {
      this.showNextArrow = true;
      this.personality = personalityName;
    },
  },
  beforeDestroy() {
    // save data to localStorage
    let apt = JSON.parse(window.localStorage.getItem("apartment"))
    apt.personality = this.personality;
    window.localStorage.setItem("apartment", JSON.stringify(apt))
  }
};
</script>
<style scoped>
.background-white {
  background-color: #ffffff;
}
.full-height {
  min-height: 100vh;
}
.vistaCiudad {
  background-color: #62aa95;
}
.text-greenUnique {
  color: #00B1C9;
  font-family: 'Latinotype-ArquitectaHeavy';
}
.vistaMontaña {
  background-color: #e1830d;
}
.no-r-margin {
  margin-right: 0;
}
@media screen and (max-width: 600px) {
  .text-greenUnique {
    margin-bottom: 3px;
    padding: 0 !important;
    /* font-size: 1.3rem; */
  }
  .p-general-text {
    padding: 8px 0;
    margin-bottom: 0;
    /* font-size: 0.9rem !important; */
  }
}
</style>
