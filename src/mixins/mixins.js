import dashboardService from "../services/Dashboard";
export default {
  data() {
    return {
      "token": "",
      "photoURL": "",
      "displayName": "",
      "email": "",
      "phoneNumber": "",
      "disabled": "",
      "additionalClaims": ""
    };
  },
  mounted() {
    this.token  = window.localStorage.AUTH_TOKEN
    dashboardService.decoded()
    this.user = JSON.parse(window.localStorage.USER);
    // this.studio_name = this.user.studio_name;
    this.photoURL = this.user.photoURL;
    this.displayName = this.user.displayName;
    this.email = this.user.email;
    this.phoneNumber = this.user.phoneNumber;
    this.disabled = this.user.disabled;
    this.additionalClaims = this.user.additionalClaims;
  },
  methods: {
    logoutUser() {
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("USER");
      this.isAuthenticated = false;
      this.$router.go("/login");
    }
  }
}
