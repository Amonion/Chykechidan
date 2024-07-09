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
              <div class="sop-result">
                Page {{ currentPage }} of {{ pages().length }}
              </div>
              <div class="searc-wrap prod">
                <input
                  class="searc-input w-input"
                  @keyup="searchProduct"
                  v-model="productWord"
                  placeholder="Search Product"
                  type="text"
                />
                <div class="searc-box">
                  <img
                    src="/images/search.svg"
                    loading="lazy"
                    alt=""
                    class="image"
                  />
                </div>
              </div>
            </div>

            <div class="w-layout-grid product-rid">
              <div v-for="item in items" :key="item.id" class="eac-product-rid">
                <div class="product-pix">
                  <img
                    :src="`${FILE_URL}/${item.image}`"
                    loading="lazy"
                    alt=""
                    class="product-im"
                  />
                </div>
                <NuxtLink
                  v-if="item.content"
                  :to="`/product-details/?id=${item.id}`"
                  class="product-name active"
                  >{{ item.name }}
                </NuxtLink>
                <span class="product-name active">{{ item.name }} </span>
                <div class="product-prices">
                  <!-- <div class="old-price">N200K</div> -->
                  <div>N{{ numberWithCommas(item.sellingPrice * 1) }}</div>
                </div>
                <div class="pro-action-flex">
                  <div class="pro-action" @click="removeProduct(item)">-</div>
                  <div class="pro-quantity">{{ item.quantity }}</div>
                  <div class="pro-action" @click="addProduct(item)">+</div>
                </div>
              </div>
            </div>

            <div class="product-painate">
              <div
                class="product-pa-item"
                @click="paginate(currentPage - 1)"
                v-if="currentPage > 1"
              >
                <img
                  src="/images/arrow-red-left.svg"
                  loading="lazy"
                  alt=""
                  class="pae-arrow"
                />
              </div>
              <div
                class="product-pa-item"
                :class="{ active: int + 1 == currentPage }"
                v-for="(item, int) in pages()"
                @click="paginate(int + 1)"
                :key="int"
              >
                {{ int + 1 }}
              </div>
              <div
                class="product-pa-item"
                @click="paginate(currentPage + 1)"
                v-if="currentPage < pages().length"
              >
                <img
                  src="/images/arrow-red.svg"
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
export default {
  layout: "home",
  data() {
    return {
      limit: 8,
      currentPage: 1,
      sort: "name",
      productWord: "",

      pages() {
        let array = [];
        let x = Math.ceil(this.total / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },
    };
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

    addProduct(product) {
      this.$store.commit("productStore/ADD_TO_CART", product);
    },

    removeProduct(product) {
      this.$store.commit("productStore/REMOVE_FROM_CART", product);
    },

    paginate(page) {
      this.currentPage = page;
      this.getProducts();
    },

    async searchProduct() {
      const result = await this.$store.dispatch(
        "MAKE_GET",
        `/products/?name=${this.productWord}&limit=20&page=1`
      );
      this.$store.commit("productStore/SET_PRODUCTS", result.data);
    },

    async getProducts() {
      this.$store.dispatch(
        "productStore/GET_PRODUCTS",
        `/products/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    company() {
      return this.$store.state.company;
    },

    items() {
      return this.$store.state.productStore.products;
    },

    total() {
      return this.$store.state.productStore.productLength;
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
