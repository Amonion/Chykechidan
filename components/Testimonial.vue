<template>
  <div id="init" class="testimonial">
    <div class="ome-cover"></div>
    <div class="custom-container">
      <div class="custom-flex">
        <div class="latest-flex wite">
          <div class="title-sm wite">// LATEST REVEIWS \\</div>
          <div class="ome-title sm">
            WHAT CUSTOMERS & PARTNERS SAY ABOUT US<br />
          </div>
        </div>
        <div
          data-delay="4000"
          data-animation="slide"
          class="test-slider w-slider"
          data-autoplay="false"
          data-easing="ease"
          data-hide-arrows="false"
          data-disable-swipe="false"
          data-autoplay-limit="0"
          data-nav-spacing="3"
          data-duration="500"
          data-infinite="true"
        >
          <div class="test-mask w-slider-mask">
            <div
              v-for="item in reviews"
              :key="item.id"
              class="testimony-slides w-slide"
            >
              <div class="test-slide">
                <div class="quote-flex">
                  <img
                    src="/images/quote-left.svg"
                    loading="lazy"
                    alt=""
                    class="quote-icon"
                  />
                  <div>
                    <div>{{ item.username }}</div>
                    <div class="title-sm rem">Nigeria</div>
                  </div>
                </div>
                <div class="testimony">
                  {{ item.content }}
                </div>
                <div>
                  <img
                    src="/images/star.svg"
                    loading="lazy"
                    alt=""
                    class="test-star"
                  /><img
                    src="/images/star.svg"
                    loading="lazy"
                    alt=""
                    class="test-star"
                  /><img
                    src="/images/star.svg"
                    loading="lazy"
                    alt=""
                    class="test-star"
                  /><img
                    src="/images/star.svg"
                    loading="lazy"
                    alt=""
                    class="test-star"
                  />
                </div>
                <div class="test-pix">
                  <img
                    :src="`${FILE_URL}/${item.image}`"
                    loading="lazy"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div class="w-slide"></div>
          </div>
          <div class="left-arrow-2 w-slider-arrow-left">
            <div class="w-icon-slider-left"></div>
          </div>
          <div class="right-arrow-2 w-slider-arrow-right">
            <div class="w-icon-slider-right"></div>
          </div>
          <div class="slide-nav w-slider-nav w-round w-num"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      active: false,
    };
  },

  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    loadScript() {
      if (!process.server) {
        let initiative = document.getElementById("scriptInit");

        if (initiative == null) {
          const script = document.createElement("script");

          script.type = "text/javascript";

          script.src = "/script/home.js";

          script.id = "scriptInit";
          const app = document.querySelector("#init");
          if (app) {
            app.appendChild(script);
          } else {
            console.error("Could not find app node to append script element");
          }
        }
      }
    },
  },

  mounted() {
    // setInterval(() => {
    //   if (this.reviews.length > 0) {
    //     if (!this.active) {
    //       this.loadScript();
    //       this.active = true;
    //     }
    //   }
    // }, 1000);
    setTimeout(() => {
      this.loadScript();
    }, 6000);
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    reviews() {
      return this.$store.state.reviews;
    },
  },
};
</script>

<style></style>
