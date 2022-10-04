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
          <router-link class="d-flex" to="/choose-mountain-apartment">
            <span class="material-icons text-success">done</span>
            <p class="px-1 text-success">Elige tu apartamento</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" to="/personality-mountain">
            <span class="material-icons text-success">keyboard_arrow_right</span>
            <p class="px-1 text-success cutsom-bold">Adáptalo a tu personalidad</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" :event="showNextArrow ? 'click' : ''" to="/apartment-reservation-mountain">
            <span class="material-icons text-success">https</span>
            <p class="px-1 text-success">Reserva tu apartamento</p>
          </router-link>
        </li>
      </ul>
    </base-nav>
    <div class="full-height">
      <div class="row no-r-margin full-height">
        <!-- Start side bar -->
        <CustomSideBar
          :canContinue="showNextArrow"
          currentView="mountain"
          currentLink="personality"
        />
        <!-- End side bar -->
        <div class="col background-white pa-1 full-height pt-4">
          <div class="container">
            <h1 class="text-greenUnique text-center py-3">
              PASO 3 DE 4: ADÁPTALO A TU PERSONALIDAD
              <hr class="title-underline"/>
              </h1>
            <p class="p-general-text text-center">¡Excelente! Ahora sigue lo mejor, porque este apartamento lo puedes personalizar. Elige la opción que mejor se adapte a tu personalidad y te lo entregamos sin acabados para que lo termines a tu gusto.</p>
            <!-- Sart tabs -->
            <PersonalityTabs v-on:p-select="selectPersonality" />
            <!-- End tabs -->
          </div>
          <NavArrows 
            :canContinue="showNextArrow" 
            prevUrl="/choose-park-Reflex"
            nextUrl="/apartment-reservation-park"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PersonalityTabs from '../../components/PersonalityTabs/PersonalityTabsReflex.vue';
import NavArrows from '../../components/NavArrows';
import CustomSideBar from '../../components/CustomSideBar';
export default {
  components: { PersonalityTabs, NavArrows, CustomSideBar },
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
.full-height {
  min-height: 100vh;
}
.vistaCiudad {
  background-color: #62aa95;
}
.text-greenUnique {
  color: #61b7a3;
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
