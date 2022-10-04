<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      logo="/img/brand/logo.png"
      :background-color="sidebarBackground"
      short-title="bswdigital App"
      title="BSWDigital Manager"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'far fa-window-maximize text-grey',
            path: '/dashboard'
          }"
        />
        
        <sidebar-item :link="{name: 'Quotes', icon: 'far fa-file-alt text-grey', path: '/quotes'}"/>
        <sidebar-item :link="{name: 'Project Type', icon: 'fas fa-project-diagram text-grey', path: '/project'}"/>
        <!-- <sidebar-item :link="{name: 'Orders', icon: 'fas fa-shopping-bag text-grey', path: '/orders'}"/>
        <sidebar-item :link="{name: 'Earnings', icon: 'fas fa-wallet text-grey', path: '/earnings'}"/>
        <sidebar-item :link="{name: 'Invoices', icon: 'fas fa-receipt text-grey', path: '/invoices'}"/>
        <sidebar-item :link="{name: 'My Store', icon: 'fas fa-store text-grey', path: '/store'}"/> -->
        <!-- <sidebar-item :link="{name: 'Calendar', icon: 'far fa-calendar text-grey', path: '/calendar'}"/> -->
        <!-- <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/> -->

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
      </div>
    </div>
    <be-dropdown direction="up" position="right" class="btn-fixed">
      <base-button slot="title" type="bswdigital" round="true" class="dropdown-toggle">
        Create new <i class="text-white fas fa-plus ml-3"></i>
      </base-button>
      <a class="dropdown-item" href="/quotes/create">Quote</a>
      <a class="dropdown-item" href="/project/create">Project Type</a>
    </be-dropdown>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import { FadeTransition } from 'vue2-transitions';
  import BeDropdown from '@/components/BSWDigital/BeDropdown';
  import Mixins from '@/mixins/mixins'

  export default {
    components: {
      DashboardNavbar,
      BeDropdown,
      FadeTransition
    },
    mixins: [Mixins],
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
