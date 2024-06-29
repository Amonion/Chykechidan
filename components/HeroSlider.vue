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
      <div
        v-for="(banner, int) in banners"
        :key="banner.id"
        class="ome-slide w-slide"
      >
        <img
          :src="`${FILE_URL}/${banner.image}`"
          loading="lazy"
          sizes="100vw"
          :srcset="`
            ${FILE_URL}/${banner.image}   500w,
            ${FILE_URL}/${banner.image}   800w,
            ${FILE_URL}/${banner.image} 1080w,
            ${FILE_URL}/${banner.image} 1600w,
            ${FILE_URL}/${banner.image}        1920w`"
          alt=""
          class="responsive-pix"
        />
        <div class="slide-cover">
          <div v-if="int > 0" class="slide-flex">
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
            <div class="ero-text">
              {{ banner.bannerTitle }} <br />{{ banner.bannerSubtitle }}
            </div>
            <div class="ero-subtitle">
              {{ banner.bannerIntro }}
            </div>
            <NuxtLink to="/about" class="custom-btn w-inline-block"
              ><img
                src="/images/arrow-forward.svg"
                loading="lazy"
                alt=""
                class="btn-icon"
              />
              <div>Read More</div></NuxtLink
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
