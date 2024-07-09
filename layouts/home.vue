<template>
  <div class="page index">
    <div class="scroll-up">
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ebde30bbbad250f95977a_arrow-up.svg"
        loading="lazy"
        alt=""
        class="scroll-icon"
      />
    </div>

    <user-response />
    <home-header />
    <home-nav />
    <Nuxt />
    <home-footer />

    <NuxtLink
      :to="`/cart/?items=${cartProperties.totalQuantity}`"
      class="scroll-up cart active w-inline-block"
      v-if="isShowCart"
      ><div class="cart-wrap">
        <div class="cart-text">
          <div v-if="cartProperties.totalQuantity < 10">
            {{ cartProperties.totalQuantity }}
          </div>
          <div v-else>9+</div>
        </div>
        <img width="25" src="/images/cart.svg" loading="lazy" alt="" /></div
    ></NuxtLink>
  </div>
</template>

<script>
import UserResponse from "../components/Customer/UserResponse.vue";
import HomeFooter from "../components/HomeFooter.vue";
import HomeHeader from "../components/HomeHeader.vue";
import HomeNav from "../components/HomeNav.vue";
export default {
  components: { HomeNav, HomeFooter, HomeHeader, UserResponse },
  head() {
    return {
      title: "Chykechidan Enterprise", // Set the page title

      link: [
        { rel: "stylesheet", href: "/css/main.css" },
        { rel: "stylesheet", href: "/css/custom.css" },
        // {
        //   rel: "stylesheet",
        //   href: "/css/theme.css",
        // },
      ],
    };
  },

  data() {
    return {
      limit: 8,
      currentPage: 1,
      sort: "name",
    };
  },

  methods: {
    getProducts() {
      this.$store.dispatch(
        "productStore/GET_PRODUCTS",
        `/products/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },

  async mounted() {
    this.$store.commit("SET_FILE_URL", this.$config.FILE_URL);
    this.$store.dispatch("INITIALIZE_APP");
    if (!this.productStatus) {
      this.getProducts();
    }
  },

  computed: {
    productStatus() {
      return this.$store.state.productStore.productStatus;
    },

    cartProperties() {
      return this.$store.state.productStore.cartProperties;
    },

    isShowCart() {
      return this.$store.state.productStore.showCart;
    },
  },
};
</script>

<style>
.whats-app {
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 40px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 3px 4px 3px #999;
  left: 15px;
  z-index: 100;
}

.brand.w-nav-brand {
  width: 200px;
}
.my-float {
  margin-top: 10px;
}

:root {
  --ash-text: #aab0bf;
  --white: white;
  --custom-reen: #ff4141;
  --dark-blue: #2a3247;
  --black: black;
  --smoke: #f4f5f4;
  --as-dark: #888;
  --smoke-as: whitesmoke;
  --custom-yellow: #ff4141;
  /* --custom-yellow: #d1ca4c; */
  --darker-blue: #151239;
}
</style>
