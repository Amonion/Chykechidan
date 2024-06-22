<template>
  <div
    id="ero-slide"
    data-delay="6000"
    data-animation="fade"
    class="ome-slider w-slider"
    data-autoplay="true"
    data-easing="ease"
    data-hide-arrows="false"
    data-disable-swipe="true"
    data-autoplay-limit="0"
    data-nav-spacing="3"
    data-duration="1500"
    data-infinite="true"
  >
    <div class="slide-mask w-slider-mask">
      <div class="ome-slide w-slide">
        <img
          src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627aabb4abe6d29ccd71c0e_banner-2.jpg"
          loading="lazy"
          sizes="100vw"
          srcset="
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627aabb4abe6d29ccd71c0e_banner-2-p-500.jpg   500w,
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627aabb4abe6d29ccd71c0e_banner-2-p-800.jpg   800w,
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627aabb4abe6d29ccd71c0e_banner-2-p-1080.jpg 1080w,
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627aabb4abe6d29ccd71c0e_banner-2-p-1600.jpg 1600w,
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627aabb4abe6d29ccd71c0e_banner-2.jpg        1920w
          "
          alt=""
          class="responsive-pix"
        />
        <div class="slide-cover">
          <div class="slide-flex">
            <div class="ero-play _3">
              <div class="ero-play _2">
                <div class="ero-play _1">
                  <div class="ero-play">
                    <img
                      src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627b1180b6109f61d727221_play.svg"
                      loading="lazy"
                      alt=""
                      class="play-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="ero-text">TURN TO <br />SOLAR POWER</div>
            <div class="ero-subtitle">
              SAVE TODAY RESOURCES FOR BRITER TOMOROW
            </div>
            <a href="#" class="custom-btn w-inline-block"
              ><img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627ced1b84d6af368e52e15_arrow-forward.svg"
                loading="lazy"
                alt=""
                class="btn-icon"
              />
              <div>Read More</div></a
            >
          </div>
        </div>
      </div>
      <div class="ome-slide w-slide">
        <img
          src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d02e0539dbef8dbe4231_banner-3.jpg"
          loading="lazy"
          sizes="100vw"
          srcset="
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d02e0539dbef8dbe4231_banner-3-p-500.jpg   500w,
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d02e0539dbef8dbe4231_banner-3-p-800.jpg   800w,
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d02e0539dbef8dbe4231_banner-3-p-1080.jpg 1080w,
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d02e0539dbef8dbe4231_banner-3-p-1600.jpg 1600w,
            https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d02e0539dbef8dbe4231_banner-3.jpg        1920w
          "
          alt=""
          class="responsive-pix"
        />
        <div class="slide-cover">
          <div class="slide-flex">
            <div class="ero-play _3">
              <div class="ero-play _2">
                <div class="ero-play _1">
                  <div class="ero-play">
                    <img
                      src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627b1180b6109f61d727221_play.svg"
                      loading="lazy"
                      alt=""
                      class="play-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="ero-text">TURN TO <br />SOLAR POWER</div>
            <div class="ero-subtitle">
              SAVE TODAY RESOURCES FOR BRITER TOMOROW
            </div>
            <a href="#" class="custom-btn w-inline-block"
              ><img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627ced1b84d6af368e52e15_arrow-forward.svg"
                loading="lazy"
                alt=""
                class="btn-icon"
              />
              <div>Read More</div></a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="left-arrow w-slider-arrow-left">
      <div class="w-icon-slider-left"></div>
    </div>
    <div class="right-arrow w-slider-arrow-right">
      <div class="w-icon-slider-right"></div>
    </div>
    <div class="w-slider-nav w-round"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    loadScript() {
      if (!process.server) {
        let el1 = document.getElementById("script");

        if (el1 == null) {
          const script = document.createElement("script");

          script.type = "text/javascript";

          script.src = "/script/home.js";

          script.id = "script";
          const app = document.querySelector("#ero-slide");
          if (app) {
            app.appendChild(script);
          } else {
            console.error("Could not find app node to append script element");
          }
        }
      }
    },
  },

  // :style="{
  //       backgroundImage: `url(${FILE_URL}/${banner.bannerImage})`,
  //     }"

  mounted() {
    this.loadScript();
    // setInterval(() => {
    //   if (this.services.length > 0) {
    //     this.active = true;
    //   }
    //   if (this.active) {
    //     this.loadScript();
    //   }
    // }, 5000);
  },

  computed: {
    banners() {
      const items = this.$store.state.banners;
      const banners = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.bannerCategory == "Home") {
          banners.push(el);
        }
      }
      return banners;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
