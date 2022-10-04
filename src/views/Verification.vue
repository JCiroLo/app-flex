<template>
  <div>
    <base-nav
        class="d-md-none navbar navbar-expand-lg navbar-dark transparent"
        :transparent="transparent"
        v-model="showNavbar"
        type="success"
    >
      <a slot="brand" class="navbar-brand" href="#">
        <img src="../assets/img/logo-flex.png" class="img-fluid" alt width="200"/>
      </a>
      <div class="navbar-collapse-header">
        <div class="row">
          <div class="col-6 collapse-brand">
            <a href="#">
              <img src="../assets/img/logo-flex.png"/>
            </a>
          </div>
          <div class="col-6 collapse-close">
            <button @click="showNavbar = !showNavbar" type="button" class="navbar-toggler"></button>
          </div>
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
            <span class="material-icons text-success">done</span>
            <p class="px-1 text-success">Adáptalo a tu personalidad</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" to="/apartment-reservation-city">
            <span class="material-icons text-success">keyboard_arrow_right</span>
            <p class="px-1 text-success">Reserva tu apartamento</p>
          </router-link>
        </li>
      </ul>
    </base-nav>
    <div class="full-height">
      <div class="row no-r-margin full-height">
        <div class="vistaCiudad d-none d-md-flex col-12 col-md-3 pa-1">
          <div class="container p-3">
            <div class="p-y d-flex align-items-center flex-column mb-6">
              <img src="../assets/img/logo-flex.png" class="img-fluid" alt width="200"/>
            </div>
            <div class="d-flex pt-3">
              <router-link class="d-flex" to="/home">
                <span class="material-icons text-white">done</span>
                <p class="text-white px-1">Selecciona la vista</p>
              </router-link>
            </div>
            <div class="d-flex">
              <router-link class="d-flex" to="/choose-city-apartment">
                <span class="material-icons text-white">done</span>
                <p class="text-white px-1">Elige tu apartamento</p>
              </router-link>
            </div>
            <div class="d-flex">
              <router-link class="d-flex" to="/personality-city">
                <span class="material-icons text-white">done</span>
                <p class="text-white px-1">Adáptalo a tu personalidad</p>
              </router-link>
            </div>
            <div class="d-flex">
              <router-link class="d-flex" to="/apartment-reservation-city">
                <span class="material-icons text-white">keyboard_arrow_right</span>
                <p class="text-white px-1">Reserva tu apartamento</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-9 background-white pa-1 full-height pt-4">
          <div class="container">
            <div class="verification-form">
              <div class="col-12 col-md-7">
                <h1 class="text-greenUnique">VERIFICACIÓN</h1>
                <p>Hemos enviado un código a tu celular para confirmar tus datos.<br>
                  Ingresa tu código.</p>
                <form @submit.prevent="submitCode" action="/" class="pimexForm">
                  <div class="form-group">
                    <fieldset>
                      <input type="text" name="code" class="form-control" id="code" v-model="dataUser.pin"
                             placeholder="Código de confirmación *" required>
                    </fieldset>
                  </div>
                  <div class="alignContent">
                    <button class="btn btn-success" type="submit">
                      ENVIAR
                      <i size="sm" class="ni ni-bold-right"></i>
                    </button>
                  </div>
                </form>
                <div v-if="wrongCode"
                     :class="{
                          wrongCode: wrongCode
                      }">
                  <i size="sm" class="fas fa-thumbs-down"></i>
                  <p>Error. Tu código no ha podido ser confirmado, inténtalo nuevamente.</p>
                </div>
                <div v-if="goodCode"
                     :class="{
                          goodCode: goodCode
                      }">
                  <i size="sm" class="fas fa-thumbs-up"></i>
                  <p>Reserva exitosa. Pronto nos contactaremos contigo.</p>
                </div>
              </div>
            </div>
            <NavArrows
                :canContinue="false"
                :prevUrl="(apartment.view == 'vista-ciudad') ? '/apartment-reservation-city' : '/apartment-reservation-mountain'"
                nextUrl="#"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import registerService from '../services/pimex';
import NavArrows from '../components/NavArrows';

export default {
  data() {
    return {
      apartment: "",
      transparent: true,
      showNavbar: false,
      leadId: "",
      dataUser: {
        pin: ""
      },
      verified: false,
      wrongCode: false,
      goodCode: false
    }
  },
  mounted() {
    this.leadId = window.localStorage.getItem("leadId");
    this.apartment = JSON.parse(window.localStorage.getItem("apartment"));
  },
  components: {
    NavArrows
  },
  methods: {
    submitCode(e) {
      e.preventDefault();

      registerService.checkCode(this.leadId, this.dataUser.pin)
          .then(data => {
            console.log(data)
            if (data) {
              this.verified = data.data.data.verified;
              if (this.verified) {
                this.goodCode = true;
                this.$router.push({
                  name: "Final Information",
                });
              } else {
                this.wrongCode = true;
              }
            } else {
              console.log("Data from checkCode is empty")
            }
          }).catch(() => this.wrongCode = true)
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

.verification-form {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25%;
  margin-bottom: 25%;
}

.text-greenUnique {
  color: #62aa95;
}

.no-r-margin {
  margin-right: 0;
}

.alignContent {
  text-align: left;
}

div.wrongCode {
  display: flex;
  background-color: #f05977;
  color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
}

div.wrongCode i {
  padding: 10px;
}

div.wrongCode p {
  font-size: 0.8rem !important;
  margin: 10px;
  text-align: justify;
}

div.goodCode {
  display: flex;
  background-color: #6cea49;
  color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
}

div.goodCode i {
  padding: 10px;
}

div.goodCode p {
  font-size: 0.8rem !important;
  margin: 10px;
  text-align: justify;
}
</style>
