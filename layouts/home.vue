<script>
import HomeFooter from "../components/HomeFooter.vue";
import HomeHeader from "../components/HomeHeader.vue";
import HomeNav from "../components/HomeNav.vue";
export default {
  components: { HomeNav, HomeFooter, HomeHeader },
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

  async mounted() {
    this.$store.commit("SET_FILE_URL", this.$config.FILE_URL);

    this.$store.dispatch("INITIALIZE_APP");
  },
};
</script>
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
    <home-header />
    <home-nav />
    <Nuxt />
    <home-footer />
    <a href="#" class="scroll-up cart active w-inline-block"
      ><div class="cart-wrap">
        <div class="cart-text">9+</div>
        <img
          src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6657141a03a0bb8927cb10a3_cart-plus.svg"
          loading="lazy"
          alt=""
        /></div
    ></a>
  </div>
</template>

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
