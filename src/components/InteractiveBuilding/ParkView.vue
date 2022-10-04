<template>
  <div>
    <div class="row">
      <!-- <div class="col-12" v-bind:class="{'col-md-3':!showBuild}"> -->
      <div class="int-container">
        <div class="top-number-parent">
          <div></div>
          <div class="top-number">D</div>
          <div class="top-number">E</div>
          <div class="top-number">F</div>
        </div>
        <div class="outer-layout py-2">
          <div class="number-space"></div>
          <img
            class="building-img reflex-park-img"
            src="../../assets/img/ReflexParque.png"
          />
          <div class="floor-overlay">
            <div
              v-for="floor in floor_options"
              :key="floor.floor"
              class="floor-row"
            >
              <div
                class="floor-label"
                :class="{
                  'selected-floor': selectedFloor == floor.floor
                }"
              >
                {{ floor.floor }}
              </div>
              <div
                class="apartment"
                :class="{
                  reserved: apartment.isReserved,
                  sold: apartment.isSold,
                  selected:
                    selectedApt === `${floor.floor}-${apartment.apartment}`
                }"
                v-for="apartment in floor.apartments"
                :key="apartment.apartment"
                @click="selectHandler(floor.floor, apartment)"
              >
                <div
                  v-if="!apartment.isSold && !apartment.isReserved"
                  class="area-label"
                  :class="{
                    showLabel:
                      selectedApt === `${floor.floor}-${apartment.apartment}`
                  }"
                >
                  {{ apartment.size }}
                </div>
                <div
                  v-if="apartment.isSold"
                  class="sold"
                  :class="{ 'sold-build': !showBuild }"
                >
                  <span>V</span>
                </div>
                <div
                  v-else-if="apartment.isReserved"
                  class="reserved"
                  :class="{ 'reserved-build': !showBuild }"
                >
                  <span>R</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- Right portion -->
      <div v-if="!showBuild" class="col-12 col-md-6 mx-auto">
        <div class="col-12">
          <div class="plane-container py-2">
            <img :src="planeSrc" class="img-fluid" alt />
          </div>
        </div>
        <modal :show.sync="modal1">
          <div class="panoramic-crop">
            <img :src="panoramicSrc" alt="Vista Ciudad" class="img-fluid" />
          </div>
        </modal>
        <div class="col-12">
          <div class="text-center py-2">
            <img
              size="30"
              class="img-fluid"
              src="img/previews/preview-Reflex-parque.jpg"
              @click="modal1 = true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityView',
  props: ['showBuild', 'floor_options', 'planeSrc'],
  data () {
    return {
      modal1: false,
      panoramicSrc: 'img/previews/p3-9-parque.jpg',
      selectedApt: '',
      selectedFloor: ''
    }
  },
  methods: {
    // this method only runs after valid apartment selection
    apartmentSelected (floor, aptInfo) {
      this.selectedApt = `${floor}-${aptInfo.apartment}`
      this.selectedFloor = floor
      this.changePanoramicImage(floor)
    },
    selectHandler (floor, aptInfo) {
      this.$emit('apt-select', floor, aptInfo)
    },
    changePanoramicImage (floorNumber) {
      if (floorNumber >= 3 && floorNumber <= 9) {
        this.panoramicSrc = 'img/previews/p3-9-parque.jpg'
      } else {
        this.panoramicSrc = 'img/previews/p10-18-parque.jpg'
      }
    }
  }
}
</script>

<style scoped>
.int-container {
  width: 550px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
}

.top-number-parent {
  position: absolute;
  margin-right: 60px;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 44px 68px 80px 68px;
  grid-template-rows: 22px;
  justify-items: center;
}

.top-number {
  font-family: 'Latinotype-ArquitectaHeavy';
  font-size: 15px !important;
}

.outer-layout {
  display: flex;
  justify-content: center;
  /* grid-template-columns: 10% 90%;
  grid-template-rows: 100%; */
}

img {
  width: 500px;
}

.floor-overlay {
  position: absolute;
  margin-right: 37.5px;
  top: 75px;
  font-size: 15px;
}
.floor-row {
  display: grid;
  grid-gap: 0;
  grid-template-columns: 44px 68px 80px 68px;
  grid-template-rows: 22.5px;
}
.floor-label {
  text-align: center;
  width: 25px;
  padding: 0 5px;
  font-family: 'Latinotype-ArquitectaHeavy';
  font-size: 15px !important;
}
.floor-row:hover div.floor-label {
  color: #fff;
  background: #e1830d;
  border-radius: 50%;
}
.selected-floor {
  color: #fff;
  background: #e1830d;
  border-radius: 50%;
}
.apartment {
  cursor: pointer;
}
.apartment:hover {
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px #000;
}
.area-label {
  display: none;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-family: 'Latinotype-ArquitectaHeavy';
  text-align: center;
  font-size: 16px !important;
}

.apartment:hover .area-label {
  display: flex;
}

.showLabel {
  display: flex;
}
.apartment.selected {
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px #000;
}
.apartment.sold {
  background-color: #ee0202;
  opacity: 0.9;
  height: 100%;
}
.apartment div.sold span {
  color: #ee0202;
  border-radius: 50%;
  background-color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 100%;
  text-align: center;
  font-family: 'Latinotype-ArquitectaHeavy';
  font-size: 15px !important;
}
.apartment div.reserved {
  background-color: #f18f0e;
  opacity: 0.9;
  height: 100%;
}
.apartment div.reserved span {
  color: #f18f0e;
  border-radius: 50%;
  background-color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 100%;
  text-align: center;
  font-family: 'Latinotype-ArquitectaHeavy';
  font-size: 15px !important;
}
.plane-container {
  height: 100%;
  width: 500px;
  margin: 0 auto;
}

@media screen and (max-width: 1050px) {
  .plane-container {
    width: 100%;
    height: auto;
  }
}
.plane-container img {
  max-height: 100%;
}
.panoramic-crop {
  width: 100%;
  height: 450px;
  /* overflow: hidden; */
}
.panoramic-crop img {
  height: 100%;
  display: block;
  margin: 0 auto;
}

@media screen and (max-width: 400px) {
  .floor-overlay {
    top: 60px;
    margin-right: 30px;
  }
  img {
    width: 400px;
  }
  .floor-row {
    display: grid;
    grid-gap: 0;
    grid-template-columns: 35.2px 54.4px 64px 54.4px;
    grid-template-rows: 18px;
  }
  .floor-label {
    width: 20px;
    padding: 0 4px;
    font-size: 12px !important;
  }

  .area-label {
    font-size: 12.8px !important;
  }

  .apartment div.sold span {
    width: 18px;
    font-size: 12px !important;
  }

  .apartment div.reserved span {
    width: 18px;
    font-size: 12px !important;
  }
}
</style>
