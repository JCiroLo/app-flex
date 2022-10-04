<template>
    <div class="bar-container d-none d-md-flex">
        <!-- d-none d-md-flex col-12 col-md-3 pa-1 -->
        <div class="container p-3">
            <div class="p-y d-flex align-items-center flex-column mb-6">
                <img src="../assets/img/logo-flex.png" alt width="200" />
            </div>
            <div class="d-flex pt-3">
                <router-link class="d-flex" to="/home-flex">
                    <span class="material-icons text-white">done</span>
                    <p class="text-white px-1">Selecciona la vista</p>
                </router-link>
            </div>
            <div class="d-flex">
                <router-link class="d-flex" :to="chooseApartmentUrl">
                    <span class="material-icons text-white" >{{ iconStr(1) }}</span>
                    <p 
                        class="text-white px-1"
                        :class="{'current-indicator' : currentLink === 'choosApartment'}"
                    >Elige tu apartamento</p>
                </router-link>
            </div>
            <div class="d-flex">
                <router-link :event="isPersonalityClickable ? 'click' : ''" class="d-flex" :to="personalityUrl">
                    <span class="material-icons text-white">{{ iconStr(2) }}</span>
                    <p 
                        class="text-white px-1"
                        :class="{'current-indicator' : currentLink === 'personality'}"
                    >Adáptalo a tu personalidad</p>
                </router-link>
            </div>
            <div class="d-flex">
                <router-link :event="isReserveApartmentClickable ? 'click' : ''" class="d-flex" :to="reserveUrl">
                    <span class="material-icons text-white">{{ iconStr(3) }}</span>
                    <p 
                        class="text-white px-1"
                        :class="{'current-indicator' : currentLink === 'apartmentReservation'}"
                    >Reserva tu apartamento</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export const LINK_NAMES = ['selectView', 'choosApartment', 'personality', 'apartmentReservation'];
export default {
    name: 'CustomSideBar',
    props: ['canContinue', 'currentView', 'currentLink'],
    data () {
        return {
            doneIcon: 'done',
            lockIcon: 'lock',
            currentIcon: 'keyboard_arrow_right',
            availableIcon: 'fiber_manual_record',
            isPersonalityClickable: false,
            isReserveApartmentClickable: false,
            links: {
                city: {

                },
                mountain: {

                }
            },
            chooseApartmentUrl: '',
            personalityUrl: '',
            reserveUrl: ''

        }
    },
    methods: {
        iconStr (linkIdx) {
            // logic to show icons
            const currentIdx = LINK_NAMES.indexOf(this.currentLink);
            if (linkIdx < currentIdx) {
                return this.doneIcon;
            } else if (linkIdx === currentIdx) {
                return this.currentIcon;
            } else if ((currentIdx + 1 === linkIdx) && this.canContinue) { // next link
                return this.currentIcon; // this.availableIcon
            } else { // any other after next link
                return this.lockIcon;
            }
        }
    },
    created () {
        // logic to define router links
        if (this.currentView === 'city') {
            this.chooseApartmentUrl = '/choose-city-apartment';
            this.personalityUrl = '/personality-city';
            this.reserveUrl = '/apartment-reservation-city';
        } else {
            this.chooseApartmentUrl = '/choose-mountain-apartment';
            this.personalityUrl = '/personality-mountain';
            this.reserveUrl = '/apartment-reservation-mountain';
        }

        // if on last step, everything is clickable
        if (this.currentLink === 'apartmentReservation') {
            this.isPersonalityClickable = true;
            this.isReserveApartmentClickable = true;
        }
    },
    beforeUpdate () {
        // logic to enable links
        if (this.canContinue) {
            this.isPersonalityClickable = this.currentLink === 'choosApartment';
            this.isReserveApartmentClickable = this.currentLink === 'personality';
        }

        // if on last step, everything is clickable
        if (this.currentLink === 'apartmentReservation') {
            this.isPersonalityClickable = true;
            this.isReserveApartmentClickable = true;
        }
    }
}
</script>

<style scoped>
.bar-container {
    background-color: #61b7a3;
    padding: 0 1rem;
}
.current-indicator {
    font-weight: bold;
}
</style>