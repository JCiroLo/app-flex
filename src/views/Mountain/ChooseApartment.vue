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
            <span class="material-icons text-success">keyboard_arrow_right</span>
            <p class="px-1 text-success cutsom-bold">Elige tu apartamento</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" :event="showNextArrow ? 'click' : ''" to="/personality-mountain">
            <span class="material-icons text-success">{{showNextArrow ? 'keyboard_arrow_right' : 'https' }}</span>
            <p class="px-1 text-success">Adáptalo a tu personalidad</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="d-flex" event="" to="/apartment-reservation-mountain"><!-- always disabled by event="" -->
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
          currentLink="choosApartment"
        />
        <!-- End side bar -->
        <div class="col background-white pa-1 full-height pt-4">
          <div class="container d-flex flex-column justify-content-center">
            <h1 class="text-greenUnique text-center py-3">
              PASO 2 DE 4: ELIGE TU APARTAMENTO
              <hr class="title-underline"/>
            </h1>
            <p class="choose-general-text text-center">
              Selecciona el nivel y la ubicación que deseas
            </p>
            <!-- Start labels -->
            <div class="legend-container">
              <p class="legend-text">
                Este es el estado de los apartamentos con vista a la montaña
              </p>
              <div class="legend-icons">
                <div>
                  <span class="reserved-icon">R</span>
                  Reservado
                </div>
                <div>
                  <span class="sold-icon">V</span>
                  Vendido
                </div>
              </div>
            </div>
            <!-- End labels -->
            <MountainView 
              ref="interactiveBuilding"
              v-on:apt-select="showApartment"
              :floor_options="floor_options.slice().reverse()" 
              :showBuild="showBuild" 
              :planeSrc="apartment"
              />
            <!-- Start nav buttons -->
            <NavArrows 
              :canContinue="showNextArrow" 
              prevUrl="/home"
              nextUrl="/personality-mountain"
            />
            <!-- End nav buttons -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MountainView from "../../components/InteractiveBuilding/MountainView";
import NavArrows from '../../components/NavArrows';
import CustomSideBar from '../../components/CustomSideBar';
import registerservice from "../../../src/services/pimex";

export default {
  data() {
    return {
      applicants: "",
      quotes: 0,
      invoices: "",
      earnings: 0,
      snack: false,
      showFloor: false,
      apartment: "",
      showBuild: true,
      transparent: true,
      showNavbar: false,
      showNextArrow: false,
      isReservedLoaded: false,
      isWonLoaded: false,
      floor_options: [
        {
          floor: 5,
          apartments: [
            {
              isReserved: false,
              isSold: false,
              apartment: 16,
              size: "54 M2", // ###
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 6,
          apartments: [
            {
              isReserved: false,
              isSold: false,            
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 7,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 8,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 9,
          apartments: [
            {
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 10,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 11,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 12,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 13,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 14,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 15,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 16,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 17,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 18,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 19,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 20,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
        {
          floor: 21,
          apartments: [
            {
              isReserved: false,
              isSold: false,              
              apartment: 16,
              size: "54 M2",
              image: "img/apartments/vista-a-la-montana-planta-1.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 17,
              size: "64 M2",
              image: "img/apartments/vista-a-la-montana-planta-2.jpg",
            },
            {
              isReserved: false,
              isSold: false,              
              apartment: 18,
              size: "54 M2",
              image: "img/apartments/vista-ala-montana-planta-3.jpg",
            },
          ],
        },
      ],
    };
  },
  created () {
    // ask for data from pimex and update
    registerservice.allLeadsReserved()
    .then(data => {
      let processData = data.data.data.concat([]);
      processData = processData.filter(lead => lead.custom.view && lead.custom.view === 'vista-montaña');
      this.showReservedApartments(processData);
      this.isReservedLoaded = true;
    })
    registerservice.allLeadsWon()
    .then(data => {
      let processData = data.data.data.concat([]);
      processData = processData.filter(lead => lead.custom.view && lead.custom.view === 'vista-montaña');
      this.showSoldApartments(processData);
      this.isWonLoaded = true;
    })
  },
  methods: {
    closeMobileBar() {
      this.$refs.mobileBar.closeMenu()
    },
    showApartment(floor, aptInfo) {
      /**
       * Validation: user can only select not
       * sold and not reserved apartments, otherwise
       * can't continue
      */
      const isDataLoaded = this.isReservedLoaded && this.isWonLoaded;
      const isAptAvailable = this.checkAvailability(floor, aptInfo);
      if (!isDataLoaded || !isAptAvailable) return;

      this.$refs.interactiveBuilding.apartmentSelected(floor, aptInfo);
      const { apartment, size } = aptInfo;
      this.showBuild = false;
      this.showNextArrow = true;
      this.apartment = aptInfo.image;
      const apt = JSON.parse(window.localStorage.getItem("apartment"));
      apt.floor = floor;
      apt.apartment = apartment;
      apt.size = size;
      const aptData = {
        floor,
        apartment,
        size,
        ...apt,
      };
      window.localStorage.setItem("apartment", JSON.stringify(aptData));
    },
    showSoldApartments(leads) {
      for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        // find floor
        const floorData = this.floor_options.find((fl) => Number(fl.floor) === Number(lead.custom.floor));
        const floorIdx = this.floor_options.indexOf(floorData);
        // now filter the number
        let aptData = floorData.apartments.find(fd => Number(fd.apartment) === Number(lead.custom.apto))
        const aptIdx = floorData.apartments.indexOf(aptData);

        aptData.isSold = true;

        // save the change
        this.floor_options[floorIdx].apartments[aptIdx] = aptData;
      }
    },
    showReservedApartments(leads) {
      for (let i = 0; i < leads.length; i++) {
         const lead = leads[i];
        // find floor
        const floorData = this.floor_options.find(fl => Number(fl.floor) === Number(lead.custom.floor));
        const floorIdx = this.floor_options.indexOf(floorData)
        // now filter the number
        let aptData = floorData.apartments.find(fd => Number(fd.apartment) === Number(lead.custom.apto))
        const aptIdx = floorData.apartments.indexOf(aptData);

        aptData.isReserved = true;

        // save the change
        this.floor_options[floorIdx].apartments[aptIdx] = aptData;
      }
    },
    checkAvailability(floor, aptInfo) {
      
      // find floor
      const floorData = this.floor_options.find(fl => Number(fl.floor) === Number(floor));

      // now filter the number
      let aptData = floorData.apartments.find(fd => Number(fd.apartment) === Number(aptInfo.apartment))

      let isAvailable = !(aptData.isReserved || aptData.isSold);

      return isAvailable;
    }
  },
  components: { MountainView, NavArrows, CustomSideBar }
};
</script>
<style scoped>
.full-height {
  min-height: 100vh;
}
.background-white {
  background-color: #ffffff;
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
.legend-container {
  display: flex;
  max-width: 300px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 1.2em 0;
  font-size: small;
}
.legend-text {
  max-width: 50%;
  margin: 0;
  font-size: small;
}
.legend-icons {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
@media screen and (max-width: 600px) {
  .legend-container {
    padding: 0;
    max-width: 100%;
    margin: 0;
  }
  .text-greenUnique {
    margin-bottom: 3px;
    padding: 0 !important;
    /* font-size: 1.3rem; */
  }
  .choose-general-text {
    margin-bottom: 0;
    /* font-size: 0.9rem !important; */
  }
  .legend-container {
    flex-direction: column;
  }
  .legend-text {
    max-width: 100%;
    text-align: center;
    /* font-size: 0.9rem !important; */
  }
  .legend-icons {
    flex-direction: row;
    justify-content: space-evenly;
  }
  .legend-icons>div {
    /* font-size: 0.9rem !important; */
  }
}
</style>
