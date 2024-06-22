<script>
import HomeFooter from "../components/HomeFooter.vue";
import HomeNav from "../components/HomeNav.vue";
export default {
  components: { HomeNav, HomeFooter },
  head() {
    return {
      title: "Chykechidan Enterprise", // Set the page title

      link: [
        { rel: "stylesheet", href: "/css/main.css" },
        // {
        //   rel: "stylesheet",
        //   href: "/css/theme.css",
        // },
      ],
    };
  },

  async mounted() {
    this.$store.commit("SET_URL", this.$config.FILE_URL);

    this.$store.dispatch("INITIALIZE_APP", this.user);
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
    <div class="top-hearder">
      <div class="custom-container">
        <div class="top-header-flex">
          <div class="top-hearder-left">
            <img
              src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6625e43ce66b7f6a33be11c4_chat-bubble-icon%201.svg"
              loading="lazy"
              alt=""
              class="top-chat"
            />
            <div>LOOKING FOR SOLAR CONSULTING?</div>
            <a href="#" class="top-book">BOOK NOW</a>
          </div>
          <div class="top-hearder-right">
            <a href="#" class="top-link-blocks ide w-inline-block"
              ><img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662682d336cd0e88f865e207_star-full-icon%201.svg"
                loading="lazy"
                alt=""
                class="top-link-icon"
              />
              <div>UPDATES</div></a
            ><a href="#" class="top-link-blocks w-inline-block"
              ><img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662682d346c9f14729072f99_dollar-icon%201.svg"
                loading="lazy"
                alt=""
                class="top-link-icon dolla"
              />
              <div>Estimate</div></a
            >
            <div class="socials">
              <a href="#" class="top-socials w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6626854bb0fed7c96ee86af9_youtube%201.svg"
                  loading="lazy"
                  alt="" /></a
              ><a href="#" class="top-socials w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c11455071692d4dc6e_black-instagram-icon%201.svg"
                  loading="lazy"
                  alt="" /></a
              ><a href="#" class="top-socials w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c1c479070080d0388d_x-social-media-logo-icon%201.svg"
                  loading="lazy"
                  alt="" /></a
              ><a href="#" class="top-socials w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c168d98f8cc52fcd76_facebook-app-round-icon%201.svg"
                  loading="lazy"
                  alt=""
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
</style>
