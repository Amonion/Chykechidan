<template>
  <div class="dashboard">
    <admin-response />

    <admin-checkout />

    <admin-purchase-checkout />

    <div class="checkout-wrap">
      <div class="checkout-child progress"></div>
    </div>

    <div class="dash-container">
      <div class="das-flex">
        <admin-navigation />
        <div style="overflow: clip" class="das-main">
          <admin-header />
          <Nuxt />
          <div v-if="company" class="das-footer">
            Copyright@{{ company.companyDomain }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="isShowCart">
      <div
        @click="showCart"
        v-if="cartProperties.totalQuantity > 0"
        class="scroll-up cart active w-inline-block"
      >
        <div class="cart-wrap">
          <div
            v-if="
              cartProperties.totalQuantity < 10 &&
              cartProperties.totalQuantity > 0
            "
            class="cart-text"
          >
            {{ cartProperties.totalQuantity }}
          </div>
          <div v-else class="cart-text">9+</div>
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6657141a03a0bb8927cb10a3_cart-plus.svg"
            loading="lazy"
            alt=""
          />
        </div>
      </div>
    </div>

    <div v-if="isShowPurchase">
      <div
        @click="showPurchase"
        v-if="purchaseProperties.totalQuantity > 0"
        class="scroll-up cart active w-inline-block"
      >
        <div class="cart-wrap">
          <div
            v-if="
              purchaseProperties.totalQuantity < 10 &&
              purchaseProperties.totalQuantity > 0
            "
            class="cart-text"
          >
            {{ purchaseProperties.totalQuantity }}
          </div>
          <div v-else class="cart-text">9+</div>
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6657141a03a0bb8927cb10a3_cart-plus.svg"
            loading="lazy"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminCheckout from "../components/Admin/AdminCheckout.vue";
import AdminHeader from "../components/Admin/AdminHeader.vue";
import AdminNavigation from "../components/Admin/AdminNavigation.vue";
import AdminPurchaseCheckout from "../components/Admin/AdminPurchaseCheckout.vue";
import AdminResponse from "../components/Admin/AdminResponse.vue";
export default {
  components: {
    AdminNavigation,
    AdminHeader,
    AdminCheckout,
    AdminResponse,
    AdminPurchaseCheckout,
  },
  head() {
    return {
      title: "Admin", // Set the page title

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
    this.$store.commit("admin/SET_FILE_URL", this.$config.FILE_URL);
    // this.$store.commit("SET_FILE_URL", this.$config.FILE_URL);
    this.$store.dispatch("admin/INITIALIZE_APP");
    // this.$store.dispatch("INITIALIZE_APP", this.user);
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
      return this.$store.state.admin.company[0];
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
