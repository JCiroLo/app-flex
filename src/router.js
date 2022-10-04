/* eslint-disable no-extra-boolean-cast */
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/DashboardHome.vue";
import Homeflex from "./views/Dashboardflex.vue";
import Homereflex from "./views/Dashboardreflex.vue";

import ChooseCityApartment from "./views/City/ChooseApartment.vue"
import ChooseMountainApartment from "./views/Mountain/ChooseApartment.vue"

import ChooseCityApartmentReflex from './views/CityReflex/ChooseApartment.vue'
import ChooseParkApartmentReflex from './views/Park/ChooseApartment.vue'

import PersonalityCity from "./views/City/Personality.vue"
import PersonalityMountain from "./views/Mountain/Personality.vue"
import PersonalityCityReflex from "./views/CityReflex/Personality.vue"
import PersonalityParkReflex from "./views/Mountain/Personality.vue"

import ApartmentReservationCity from "./views/City/ApartmentReservation.vue"
import ApartmentReservationMountain from "./views/Mountain/ApartmentReservation.vue"
import ApartmentReservationCityReflex from "./views/CityReflex/ApartmentReservation.vue"
import ApartmentReservationPark from "./views/Park/ApartmentReservation.vue"

import Verification from "./views/Verification.vue";
import VerificationReflex from "./views/Verification-reflex.vue";
import FinalInformation from "./views/FinalInformation";
import TermsConditions from "./views/TermsConditions";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/home-flex",
      name: "home-flex",
      component: Homeflex,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/home-reflex",
      name: "home-reflex",
      component: Homereflex,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/choose-city-apartment",
      name: "Choose City Apartment",
      component: ChooseCityApartment,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/choose-mountain-Apartment",
      name: "Choose Mountain Apartment",
      component: ChooseMountainApartment,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/choose-city-Reflex",
      name: "Choose-City-Reflex",
      component: ChooseCityApartmentReflex,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/choose-park-Reflex",
      name: "Choose-Park-Reflex",
      component: ChooseParkApartmentReflex,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/personality-city",
      name: "Personality City",
      component: PersonalityCity,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/personality-mountain",
      name: "Personality Mountain",
      component: PersonalityMountain,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/personality-city-reflex",
      name: "Personality City Reflex",
      component: PersonalityCityReflex,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/personality-park-reflex",
      name: "Personality Park Reflex",
      component: PersonalityParkReflex,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/apartment-reservation-city",
      name: "Apartment Reservation City",
      component: ApartmentReservationCity,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/apartment-reservation-mountain",
      name: "Apartment-reservation-mountain",
      component: ApartmentReservationMountain,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/apartment-reservation-city-reflex",
      name: "Apartment Reservation City Reflex",
      component: ApartmentReservationCityReflex,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/apartment-reservation-park",
      name: "Apartment Reservation Park",
      component: ApartmentReservationPark,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/verification",
      name: "Verification",
      component: Verification,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/verification-reflex",
      name: "Verification-reflex",
      component: VerificationReflex,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/final-information",
      name: "Final Information",
      component: FinalInformation,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/terms-conditions",
      name: "Terms Conditions",
      component: TermsConditions,
      meta: {
        requiresAuth: true
      },
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!localStorage.getItem(AUTH_TOKEN)) {
//       next({
//         path: "/login"
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;