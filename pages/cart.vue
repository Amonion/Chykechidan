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
          <div class="ero-title">CART ITEMS</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            Cart]
          </div>
        </div>
      </div>
    </div>

    <div class="maintenance">
      <div class="custom-container">
        <div class="w-form">
          <div class="mentainance-flex">
            <div class="cart-table">
              <div class="cart-eader">
                <div class="cart-col">S/N</div>
                <div class="cart-col _20">IMAGE</div>
                <div class="cart-col _40">PRODUCT</div>
                <div class="cart-col _20">PRICE</div>
                <div class="cart-col _20">QUANTITY</div>
                <div class="cart-col _15">SUBTOTAL</div>
              </div>
              <div
                v-for="(item, int) in cartProducts"
                :key="int"
                class="cart-body"
                :class="{ even: int % 2 == 1 }"
              >
                <div class="cart-col">
                  <div>{{ int + 1 }}</div>
                </div>
                <div class="cart-col _20 dis">
                  <div class="cart-pix">
                    <img
                      :src="`${FILE_URL}/${item.image}`"
                      loading="lazy"
                      alt=""
                      class="cart-im"
                    />
                  </div>
                </div>
                <div class="cart-col _40 lite">
                  <div class="cart-title">Product</div>
                  <div>{{ item.name }}</div>
                </div>
                <div class="cart-col _20 lite">
                  <div class="cart-title">Price</div>
                  <div>N{{ numberWithCommas(item.sellingPrice * 1) }}</div>
                </div>
                <div class="cart-col _20">
                  <div class="cart-title">Quantity</div>
                  <div class="cart-quantity-flex">
                    <div class="quant-action" @click="removeProduct(item)">
                      -
                    </div>
                    <div>{{ numberWithCommas(item.quantity * 1) }}</div>
                    <div class="quant-action" @click="addProduct(item)">+</div>
                  </div>
                </div>
                <div class="cart-col lite _15">
                  <div class="cart-title">Subtotal</div>
                  <div>
                    N{{
                      numberWithCommas(item.quantity * item.sellingPrice * 1)
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-total-wrap">
              <div class="cart-total-tb">
                <div class="cart-total-title">Cart Totals</div>
                <div class="cart-total-flex">
                  <div class="cart-total-left">Subtotal</div>
                  <div>N{{ numberWithCommas(cartProperties.totalAmount) }}</div>
                </div>
                <div class="cart-total-flex">
                  <div class="cart-total-left">Total</div>
                  <div>N{{ numberWithCommas(cartProperties.totalAmount) }}</div>
                </div>
                <div class="ceck-out-btn" @click="processData">
                  CONFIRM BILLING
                </div>
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

    showOverlayResponse(msg, error, success, warning, show) {
      const payload = {
        msg,
        error,
        success,
        warning,
        show,
      };

      this.$store.commit("SHOW_RESPONSE", payload);
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

    async processData() {
      if (!this.user) {
        this.showOverlayResponse(
          "You have to login or create an account to continue!",
          false,
          false,
          true,
          true
        );

        return;
      }

      const productData = {
        products: JSON.stringify(this.cartItems),
        ordered_time: new Date().getTime(),
        quantity: this.cartProperties.totalQuantity,
        amount: this.cartProperties.totalAmount,
        transactionType: "Order",
        status: false,
        username: this.buyingUser ? this.buyingUser.username : "Anonimous",
      };

      this.$router.push("/checkout");
    },
  },

  mounted() {
    if (this.cartProperties.totalQuantity == 0) {
      this.$router.push("/products");
    } else {
    }
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    company() {
      return this.$store.state.company;
    },

    cartProperties() {
      return this.$store.state.productStore.cartProperties;
    },

    cartProducts() {
      return this.$store.state.productStore.cartProducts;
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
