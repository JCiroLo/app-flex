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
        <img src="../../assets/img/logo-flex.png" class="img-fluid" alt width="200" />
      </a>
      <div class="navbar-collapse-header">
        <div class="row">
          <div class="col-6 collapse-brand">
            <a href="#">
              <img src="../../assets/img/logo-flex.png" />
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
            <span class="material-icons text-success">done</span>
            <p class="px-1 text-success">Adáptalo a tu personalidad</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" to="/apartment-reservation-mountain">
            <span class="material-icons text-success">keyboard_arrow_right</span>
            <p class="px-1 text-success cutsom-bold">Reserva tu apartamento</p>
          </router-link>
        </li>
      </ul>
    </base-nav>
    <div class="full-height">
      <div class="row no-r-margin full-height">
        <!-- Start side bar -->
        <CustomSideBar
          :canContinue="false"
          currentView="mountain"
          currentLink="apartmentReservation"
        />
        <!-- End side bar -->
        <div class="col background-white pa-1 full-height pt-4">
          <div class="container">
            <h1 class="text-greenUnique text-center py-3">
              PASO 4 DE 4: RESERVA TU APARTAMENTO
              <hr class="title-underline"/>
            </h1>
            <div class="error-notice" v-if="!isStillAvailable">¡Parece que alguien reservó tu apartamento! inténtalo de nuevo</div>
            <div class="apt-specification d-flex justify-content-center p-3">
              <div class="row">
                <ul class="inline">
                  <li
                    class="d-block d-md-inline"
                  >{{ (apartment.view == 'vista-ciudad') ? "Con vista a la Ciudad": "Con vista a la Montaña"}}</li>
                  <li class="d-block d-md-inline">Apto {{apartment.floor}}-{{apartment.apartment}}</li>
                  <li class="d-block d-md-inline">{{apartment.size}}</li>
                  <li class="d-block d-md-inline">Tipo {{apartment.personality}}</li>
                  <li class="d-block d-md-inline">Valor: {{ (apartment.size == '54 M2') ? "desde $278.100.000 " : (apartment.size == '64 M2') ? "$321.800.000" : "$0" }}</li>
                </ul>
              </div>
            </div>
            <div class="text-center py-5">
              <div class="container">
                <h1 class="text-green-flex text-center">COMPLETA TUS DATOS</h1>
                <p
                  class="text-center"
                >Has creado un apartamento según tu personalidad, ahora resérvalo completando tus datos.</p>
                <div class="row d-flex justify-content-center">
                  <div class="col-12 col-md-7">
                    <loading :active.sync="isLoading"
                      color="#61b7a3"
                    ></loading>
                    <form @submit.prevent="submitForm" action="/" class="pimexForm">
                      <div class="form-group">
                        <fieldset>
                          <input type="text" pmx-data="name" name="name" class="form-control" id="name" v-model="dataUser.name" placeholder="Nombre *" required>
                        </fieldset>
                      </div>
                      <div class="form-group">
                        <fieldset>
                          <input type="tel" pmx-data="phone" name="phone" class="form-control" id="phone" v-model="dataUser.phone" placeholder="Celular *" pattern="[0-9]{10}" required>
                        </fieldset>
                      </div>
                      <div class="alignContent">
                        <div class="form-group">
                          <fieldset>
                            <input type="email" pmx-data="email" name="email" class="form-control" id="email" v-model="dataUser.email" aria-describedby="emailHelp" placeholder="Email *" required>
                          </fieldset>
                        </div>
                        <div class="form-check">
                          <fieldset>
                            <input type="checkbox" class="form-check-input" id="term" pmx-custom="term" v-model="dataUser.term" required>
                          </fieldset>
                          <label class="form-check-label" for="exampleCheck1">Acepto 
                            <a href="/terms-conditions" target="_blank" class="links-to-info">  
                              términos y condiciones
                            </a>
                          </label>
                        </div>
                        <div class="form-check">
                          <fieldset>
                            <input type="checkbox" class="form-check-input" id="data" pmx-custom="data" v-model="dataUser.data" required>
                          </fieldset>
                           <label class="form-check-label" for="exampleCheck1">Estoy de acuerdo con la
                              <a href="https://proyectoflexliving.com/data-policy/" target="_blank" class="links-to-info">
                                política de datos
                              </a>
                            </label>
                        </div>
                        <div class="d-flex py-3">
                          <button class="btn btn-success">
                            ENVIAR
                            <i size="sm" class="ni ni-bold-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <NavArrows 
              :canContinue="false" 
              prevUrl="/personality-mountain"
              nextUrl="#"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavArrows from '../../components/NavArrows';
import registerservice from  "../../../src/services/pimex";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import CustomSideBar from '../../components/CustomSideBar';

export default {
  data() {
    return {
      apartment: "",
      transparent: true,
      showNavbar: false,
      isStillAvailable: true,
      dataUser: {
        name: "",
        phone: "",
        email: "",
        term: false,
        data: false
      },
      isLoading: false,
      // eslint-disable-next-line vue/no-reserved-keys
      _compare: true
    };
  },
  mounted() {
    this.apartment = JSON.parse(window.localStorage.getItem("apartment"));
  },
  components: {
    NavArrows,
    Loading,
    CustomSideBar
  },
  methods: {
    closeMobileBar() {
      this.$refs.mobileBar.closeMenu()
    },
    async submitForm(e) {
      e.preventDefault();
      this.isLoading = true;

      // Validate
      this.isStillAvailable = await this.checkAvailable();
      // console.log('this.isStillAvailable', this.isStillAvailable);
      if (!this.isStillAvailable) {
        this.isLoading = false;
        return;
      }

      registerservice.sendLead({
        name: this.dataUser.name,
        phone: "+57" + this.dataUser.phone,
        email: this.dataUser.email,
        custom: {
          view: this.apartment.view,
          floor: this.apartment.floor,
          apto: this.apartment.apartment,
          size: this.apartment.size,
          personality: this.apartment.personality,
          term: true,
          data: true
        },
        _compare: false
      }).then(() => {
        this.isLoading = false;
        this.$router.push({
          name: "Verification",
        });
      });
    },
    checkAvailable() {
      return new Promise((resolve, reject) => {
        // ask for data
        let reservedPr = registerservice.allLeadsReserved();
        let wonPr = registerservice.allLeadsWon();
        let allData = [];

        Promise.all([reservedPr, wonPr]).then((values) => {
          // merge and filter data for this building view
          values.forEach(response => allData = response.data.data.concat(allData));
          allData = allData.filter(lead => lead.custom.view && lead.custom.view === 'vista-montaña');
          // console.log('values', allData);

          // check the selected apartment against data
          let nFloor = Number(this.apartment.floor);
          let nApartment = Number(this.apartment.apartment);
          allData.forEach((lead) => {
            // console.log(`testing floor:${lead.custom.floor} apto:${lead.custom.apto}`);
            if (nFloor === Number(lead.custom.floor) && nApartment === Number(lead.custom.apto)) {
              resolve(false); // apartment is not available
            }
          });
          
          resolve(true); // available by default

        }).catch(err => reject(err))
      });
    }
  },
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
.text-green-flex {
  /* color: #62aa95; */
  color: #61b7a3;
  font-family: 'Latinotype-ArquitectaHeavy';
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
.alignContent {
  text-align: left;
}
.btn-custom {
  background-color: #b1b1b1;
  color: #ffffff;
}
.btn-custom:hover {
  color: #ffffff;
}
.btn-back {
  position:absolute;
  bottom: 1%;
  right: 2rem;
}
.links-to-info {
  color: #62aa95;
}
.links-to-info:hover {
  text-decoration: underline;
}
.error-notice {
  background-color:  #e1830d;
  color: #ffffff;
  text-align: center;
  padding: 0.5rem 0;
  border-radius: 3px;
}
</style>
