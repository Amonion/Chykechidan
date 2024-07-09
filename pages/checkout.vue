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
            <div class="cart-total-title">Customer Billing Details</div>
            <div class="w-layout-grid bill-rid">
              <div class="bill-input-wrap">
                <div>First Name</div>
                <input
                  class="bill-input w-input"
                  maxlength="256"
                  name="field"
                  data-name="Field"
                  placeholder="Enter First Name"
                  type="text"
                  id="field"
                  required=""
                />
              </div>
              <div
                id="w-node-cd7787f1-eef0-0195-6f81-3f3e71bc96e6-7a51b666"
                class="bill-input-wrap"
              >
                <div>Last Name</div>
                <input
                  class="bill-input w-input"
                  maxlength="256"
                  name="field-2"
                  data-name="Field 2"
                  placeholder="Enter First Name"
                  type="text"
                  id="field-2"
                  required=""
                />
              </div>
              <div
                id="w-node-_8cf403ca-38ed-ff2e-2088-054f766c3448-7a51b666"
                class="bill-input-wrap"
              >
                <div>Phone Number</div>
                <input
                  class="bill-input w-input"
                  maxlength="256"
                  name="field-2"
                  data-name="Field 2"
                  placeholder="Enter First Name"
                  type="text"
                  id="field-2"
                  required=""
                />
              </div>
              <div
                id="w-node-e3c0c72b-85e6-289a-05f7-168de1e28d51-7a51b666"
                class="bill-input-wrap"
              >
                <div>Email Address</div>
                <input
                  class="bill-input w-input"
                  maxlength="256"
                  name="field-2"
                  data-name="Field 2"
                  placeholder="Enter First Name"
                  type="text"
                  id="field-2"
                  required=""
                />
              </div>
              <div
                id="w-node-_8015c16e-096c-7f17-76f5-571a5052b602-7a51b666"
                class="bill-input-wrap"
              >
                <div>Address</div>
                <input
                  class="bill-input w-input"
                  maxlength="256"
                  name="field-2"
                  data-name="Field 2"
                  placeholder="Enter First Name"
                  type="text"
                  id="field-2"
                  required=""
                />
              </div>
              <div
                id="w-node-c3d7ed1e-e3bf-ec3a-93d5-5543a033d489-7a51b666"
                class="bill-input-wrap"
              >
                <div>Optional Note</div>
                <input
                  class="bill-input w-input"
                  maxlength="256"
                  name="field-2"
                  data-name="Field 2"
                  placeholder="Enter First Name"
                  type="text"
                  id="field-2"
                  required=""
                />
              </div>
              <div class="ceck-out-btn btn active">CANCEL ORDER</div>
              <div
                id="w-node-_768973a7-903e-8c5e-55d2-5812611ce613-7a51b666"
                class="ceck-out-btn btn active"
              >
                GO TO HOMEPAGE
              </div>
              <div class="load-btn">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
                  loading="lazy"
                  alt=""
                  class="spinner"
                />
                <div>Processing...</div>
              </div>
              <div
                id="w-node-e6f29867-2c6c-4980-8619-2a65fd59599b-7a51b666"
                class="ceck-out-btn btn"
              >
                PLACE ORDER (N2,300,000)
              </div>
            </div>
            <div class="response error">Please Fill in all the fields</div>
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
