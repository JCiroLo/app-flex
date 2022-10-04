<template>
  <div>
    <div class="row">
      <!-- <div class="col-12" v-bind:class="{'col-md-3':!showBuild}"> -->
      <div class="int-container" :class="{ 'int-mobile-build': !showBuild }">
        <div class="top-number-parent" :class="{ 'top-number-build': !showBuild }">
          <div></div>
          <div class="top-number" :class="{ 'top-num-build': !showBuild }">16</div>
          <div class="top-number" :class="{ 'top-num-build': !showBuild }">17</div>
          <div></div>
          <div class="top-number" :class="{ 'top-num-build': !showBuild }">18</div>
        </div>
        <div class="outer-layout py-2">
          <div class="number-space"></div>
          <img
            class="img-fluid"
            size="100"
            src="../../assets/img/torre-con-vista-a-la-montaña.jpg"
            alt
          />
          <div
            class="floor-overlay"
            :class="{ 'floor-overlay-build': !showBuild }"
          >
            <div
              v-for="floor in floor_options"
              :key="floor.floor"
              class="floor-row"
              :class="{ 'floor-row-build': !showBuild }"
            >
              <div
                class="floor-label"
                :class="{
                  'floor-label-build': !showBuild,
                  'selected-floor': selectedFloor == floor.floor,
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
                    selectedApt === `${floor.floor}-${apartment.apartment}`,
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
                      selectedApt === `${floor.floor}-${apartment.apartment}`,
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
      <div v-if="!showBuild" class="col-12 col-md-9 mx-auto">
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
              src="img/previews/preview-de-vista-ala-montana.jpg"
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
  name: "MountainView",
  props: ["showBuild", "floor_options", "planeSrc"],
  data() {
    return {
      modal1: false,
      panoramicSrc: "img/previews/p5-10-montana.jpg",
      selectedApt: "",
      selectedFloor: "",
    };
  },
  methods: {
    // this method only runs after valid apartment selection
    apartmentSelected(floor, aptInfo) {
      this.selectedApt = `${floor}-${aptInfo.apartment}`;
      this.selectedFloor = floor;
      this.changePanoramicImage(floor);
    },
    selectHandler(floor, aptInfo) {
      this.$emit("apt-select", floor, aptInfo);
    },
    changePanoramicImage(floorNumber) {
      if (floorNumber >= 5 && floorNumber <= 10) {
        this.panoramicSrc = "img/previews/p5-10-montana.jpg";
      } else if (floorNumber > 10 && floorNumber <= 16) {
        this.panoramicSrc = "img/previews/p11-16-montana.jpg";
      } else {
        this.panoramicSrc = "img/previews/p17-21-montana.jpg";
      }
    },
  },
};
</script>

<style scoped>
.img-fluid-h {
  max-height: 100%;
  width: auto;
}
.int-container {
  width: 270px;
  margin: 0 auto;
  position: relative;
  /* stick to bottom */
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.outer-layout {
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 100%;
}
.number-space {
  /* dummy */
}
.floor-overlay {
  position: absolute;
  bottom: 69px;
  font-size: 15px;
}
.floor-row {
  display: grid;
  grid-gap: 0;
  grid-template-columns: 39px 67px 64px 12px 68px;
  grid-template-rows: 22px;
}
.floor-label {
  text-align: center;
  width: 25px;
  padding: 0 5px;
  font-family: "Latinotype-ArquitectaHeavy";
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
.apartment:nth-child(4) {
  grid-column-start: 5;
  grid-column-end: 6;
}
.apartment:hover {
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px #000;
}
.area-label {
  display: none;
  color: white;
  font-weight: bold;
  font-family: "Latinotype-ArquitectaHeavy";
  text-align: center;
  font-size: 16px !important;
}
.apartment:hover .area-label {
  display: block;
}
.showLabel {
  display: block;
}
.apartment.selected {
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px #000;
}
.apartment div.sold {
  background-color: #ee0202;
  opacity: 0.9;
  height: 100%;
}
.apartment div.sold span {
  color: #ee0202;
  border-radius: 50%;
  background-color: white;
  margin: 0 auto;
  display: block;
  width: 1.5em;
  height: 100%;
  text-align: center;
  font-family: "Latinotype-ArquitectaHeavy";
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
  display: block;
  width: 1.5em;
  height: 100%;
  text-align: center;
  font-family: "Latinotype-ArquitectaHeavy";
  font-size: 15px !important;
}
.plane-container {
  height: 100%;
  width: 500px;
  margin: 0 auto;
}

.top-number-parent {
  display: grid;
  grid-gap: 0;
  grid-template-columns: 39px 67px 64px 12px 68px;
  grid-template-rows: 22px;
  justify-items: center;
}

.top-number {
  font-family: "Latinotype-ArquitectaHeavy";
  font-size: 15px !important;
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
@media screen and (max-width: 600px) {
  .int-mobile-build {
    width: 180px;
  }
  .floor-overlay-build {
    position: absolute;
    bottom: 45px;
    font-size: 15px;
  }
  .floor-row-build {
    display: grid;
    grid-gap: 0;
    grid-template-columns: 26px 45px 41px 9px 46px;
    grid-template-rows: 15px;
  }
  .floor-label-build {
    width: 20px;
    font-size: 10px !important;
  }
  .apartment div.reserved-build span {
    font-size: 10px !important;
  }
  .apartment div.sold-build span {
    font-size: 10px !important;
  }
  .panoramic-crop,
  .panoramic-crop img {
    height: auto;
  }
  .area-label {
    font-size: 12px !important;
  }

    .top-number-build {
    display: grid;
    grid-gap: 0;
    grid-template-columns: 26px 45px 41px 9px 46px;
    grid-template-rows: 15px;
  }
  .top-num-build {
    font-size: 10px !important;
  }
}
</style>