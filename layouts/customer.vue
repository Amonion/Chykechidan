<template>
  <div class="dashboard">
    <admin-response />
    <div class="checkout-wrap">
      <div class="checkout-child progress"></div>
    </div>

    <div class="dash-container">
      <div class="das-flex">
        <user-navigation />
        <div style="overflow: clip" class="das-main">
          <user-header />
          <Nuxt />
          <div v-if="company" class="das-footer">
            Copyright@{{ company.companyDomain }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminResponse from "../components/Admin/AdminResponse.vue";
import UserHeader from "../components/Customer/UserHeader.vue";
import UserNavigation from "../components/Customer/UserNavigation.vue";
export default {
  components: {
    AdminResponse,
    UserNavigation,
    UserHeader,
  },
  head() {
    return {
      title: "Customer", // Set the page title

      link: [
        { rel: "stylesheet", href: "/css/main.css" },
        // {
        //   rel: "stylesheet",
        //   href: "/css/theme.css",
        // },
        {
          rel: "stylesheet",
          href: "/css/custom.css",
        },
      ],
    };
  },

  data() {
    return {
      limit: 20,
      currentPage: 1,
      sort: "-name",
      payment: "",
      showPayments: false,

      payments: ["POS", "Cash", "Transfer"],
    };
  },

  methods: {
    toggleNavBar() {
      this.$store.commit("admin/toggleNavBar");
    },

    togglePayments() {
      this.showPayments = !this.showPayments;
    },

    selectPayment(payment) {
      this.payment = payment;
    },

    formatNumber(number) {
      if (number == 0) {
        return number;
      }
      if (isNaN(number)) {
        return number;
      }
      const parts = number.toFixed(2).split(".");
      let integerPart = parts[0];
      const decimalPart = parts[1];

      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return `${integerPart}`;
    },

    showCart() {
      this.$store.commit("productStore/TOGGLE_CART");
    },

    showPurchase() {
      this.$store.commit("productStore/TOGGLE_PURCHASE");
    },

    removeFromCart(data) {
      this.$store.commit("productStore/REMOVE_FROM_CART", data);
    },

    addToCart(data) {
      this.$store.commit("productStore/ADD_TO_CART", data);
    },

    getProducts() {
      this.$store.dispatch(
        "productStore/GET_PRODUCTS",
        `/products/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },

  async mounted() {
    this.$store.commit("SET_FILE_URL", this.$config.FILE_URL);
    this.$store.dispatch("INITIALIZE_APP", this.user);
    if (!this.productStatus) {
      this.getProducts();
    }
  },

  computed: {
    productStatus() {
      return this.$store.state.productStore.productStatus;
    },

    cartProducts() {
      return this.$store.state.productStore.cartProducts;
    },

    cartProperties() {
      return this.$store.state.productStore.cartProperties;
    },

    purchaseProperties() {
      return this.$store.state.productStore.purchaseProperties;
    },

    isShowingCart() {
      return this.$store.state.productStore.isShowingCart;
    },

    isShowPurchase() {
      return this.$store.state.productStore.showPurchase;
    },

    isShowCart() {
      return this.$store.state.productStore.showCart;
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    company() {
      return this.$store.state.company;
    },

    isNotification() {
      return this.$store.state.admin.isNotification;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style>
.admin-tl-time1 {
  display: flex;
}

.das-main {
  overflow: clip;
}
</style>
