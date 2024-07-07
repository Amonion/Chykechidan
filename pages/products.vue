<template>
  <div>
    <div class="hero">
      <img
        src="/images/banner2.jpeg"
        loading="lazy"
        sizes="100vw"
        srcset="
          /images/banner2.jpeg  500w,
          /images/banner2.jpeg  800w,
          /images/banner2.jpeg 1080w,
          /images/banner2.jpeg 1600w,
          /images/banner2.jpeg 1920w
        "
        alt=""
        class="responsive-pix"
      />
      <div class="ero-cover"></div>
      <div class="custom-container">
        <div class="custom-flex ero">
          <div class="ero-title">SHOP</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            Shop]
          </div>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <div class="custom-container">
        <div class="w-form">
          <div class="mentainance-flex">
            <div class="sop-eader">
              <div class="sop-sort">
                <div class="sort-eader">
                  <div>Sort Product</div>
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6654b63d3c99f8d43cf57efe_chevron.svg"
                    loading="lazy"
                    alt=""
                    class="cevron-icon"
                  />
                </div>
                <div class="sort-drop">
                  <div class="sort-drop-text">By Cost Price</div>
                  <div class="sort-drop-text">By Cost Price</div>
                  <div class="sort-drop-text">By Cost Price</div>
                  <div class="sort-drop-text">By Cost Price</div>
                  <div class="sort-drop-text">By Cost Price</div>
                  <div class="sort-drop-text">By Cost Price</div>
                  <div class="sort-drop-text">By Cost Price</div>
                </div>
              </div>
              <div class="sop-result">Showing 1–12 of 17 results</div>
              <div class="searc-wrap prod">
                <input
                  class="searc-input w-input"
                  maxlength="256"
                  name="name"
                  data-name="Name"
                  placeholder="Searc Product"
                  type="text"
                  id="name"
                />
                <div class="searc-box">
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6654ba3dcebb0fe0d856837a_search.svg"
                    loading="lazy"
                    alt=""
                    class="image"
                  />
                </div>
              </div>
            </div>

            <div class="w-layout-grid product-rid">
              <div v-for="item in items" :key="item.id" class="eac-product-rid">
                <div
                  id="w-node-_8a083c08-8162-a427-e17f-504a55edf918-7a51b666"
                  class="product-pix"
                >
                  <img
                    :src="`${FILE_URL}/${item.image}`"
                    loading="lazy"
                    alt=""
                    class="product-im"
                  />
                </div>
                <a href="#" class="product-name active">{{ item.name }} </a>
                <div
                  id="w-node-_53651082-bfb1-3757-d142-6e8100171b0c-7a51b666"
                  class="product-prices"
                >
                  <div class="old-price">N200K</div>
                  <div>N199K</div>
                </div>
                <div
                  id="w-node-_183f82a6-48e5-19c7-1283-161e09cc9d73-7a51b666"
                  class="pro-action-flex"
                >
                  <div class="pro-action">-</div>
                  <div class="pro-quantity">0</div>
                  <div class="pro-action">+</div>
                </div>
              </div>
            </div>

            <div class="product-painate">
              <div class="product-pa-item">1</div>
              <div class="product-pa-item">2</div>
              <div class="product-pa-item active">3</div>
              <div class="product-pa-item">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627da8bbae46715d6890829_arrow-forward-reen.svg"
                  loading="lazy"
                  alt=""
                  class="pae-arrow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSlider from "../components/HeroSlider.vue";
import Testimonial from "../components/Testimonial.vue";
export default {
  components: { HeroSlider, Testimonial },
  layout: "home",
  data() {
    return {};
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    formatDateToDD(dateString) {
      const options = { day: "2-digit" };
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },
    formatDateToMon(dateString) {
      const options = { month: "short" };
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    company() {
      return this.$store.state.company;
    },

    about() {
      return this.$store.state.about;
    },

    total() {
      return this.$store.state.productLength;
    },

    topBlogs() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.category == "TopBlog") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    items() {
      return this.$store.state.products;
    },
  },
};
</script>

<style>
a.first-link-header {
  text-decoration: none;
  color: black;
}

.cover {
  background-color: rgba(255, 111, 0, 0.151);
}
</style>
