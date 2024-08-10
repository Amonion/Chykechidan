<template>
  <div
    @click.self="showCart"
    class="checkout-wrap"
    :class="{ active: isShowingCart }"
  >
    <div class="checkout-child">
      <div class="das-tb-flow checkout">
        <div class="das-tb checkout">
          <div class="das-tb-ead">
            <div class="das-tb-cell _40">Product</div>
            <div class="das-tb-cell _30">Price (N)</div>
            <div class="das-tb-cell _30">Quantity</div>
          </div>
          <div
            class="das-tb-body"
            v-for="(item, int) in cartItems"
            :key="int"
            :class="{ even: int % 2 == 0 }"
          >
            <div class="das-tb-cell _40">{{ item.name }}</div>
            <div class="das-tb-cell _30">
              {{ formatNumber(item.sellingPrice * 1) }}
            </div>
            <div class="das-tb-cell _30 quant">
              <div class="das-foot-pa quant" @click="removeFromCart(item)">
                -
              </div>
              <div class="tb-quant">{{ item.quantity }}</div>
              <div class="das-foot-pa quant" @click="addToCart(item)">+</div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-info">
        <div class="checkout-text-info">
          Total Items: {{ cartProperties.totalQuantity }}
        </div>
        <div class="checkout-text-info">
          Total Amount: N{{ formatNumber(cartProperties.totalAmount * 1) }}
        </div>
      </div>
      <div class="checkout-payment">
        <div class="das-select">
          <div class="das-drop-ead top" @click="togglePayments">
            <div>{{ payment }}</div>
            <img
              src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b42b9cdc93e201b85bd05_chevron11.svg"
              loading="lazy"
              alt=""
              class="drop-icon"
            />
          </div>
          <div class="das-drop-list" :class="{ active: showPayments }">
            <div
              v-for="item in payments"
              :key="item"
              @click="selectPayment(item)"
              class="drop-items"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="payment-description">
        <textarea
          placeholder="Enter Description"
          class="rane-date trx-note w-input"
          v-model="description"
        ></textarea>
      </div>
      <div class="checkout-btns">
        <div class="overlay-btn pass" @click="processCart">Proceed</div>
        <div class="overlay-btn" @click="showCart">Close</div>
        <div class="overlay-btn fail" @click="clearCart">Clear</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payment: "Payment",
      description: "",
      showPayments: false,

      payments: ["POS", "Cash", "Transfer", "Credit"],
      limit: 10,
      currentPage: 1,
      sort: "-ordered_time",
    };
  },

  methods: {
    togglePayments() {
      this.showPayments = !this.showPayments;
    },

    selectPayment(payment) {
      this.payment = payment;
      this.showPayments = false;
    },

    formatNumber(number) {
      if (number == 0) {
        return number;
      }
      if (isNaN(number)) {
        return number;
      }
      const parts = number.toFixed(2).split(".");
      let integerPart = parts[0];
      const decimalPart = parts[1];

      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return `${integerPart}`;
    },

    showCart() {
      this.$store.commit("productStore/TOGGLE_CART");
    },

    clearCart() {
      this.$store.commit("productStore/CLEAR_CART");
      this.showCart();
    },

    removeFromCart(data) {
      this.$store.commit("productStore/REMOVE_FROM_CART", data);
    },

    addToCart(data) {
      this.$store.commit("productStore/ADD_TO_CART", data);
    },

    async processCart() {
      if (this.payment == "Payment") {
        this.showOverlayResponse(
          "Please select payment to proceed",
          true,
          false,
          false,
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
        payment: this.payment,
        status: false,
        seller: this.user.username,
        description: this.description,
        username: this.buyingUser ? this.buyingUser.username : "Anonimous",
      };

      //   this.$store.commit("TOGGLE_PROCESSING");
      this.$store.commit("productStore/HIDE_CART");

      const payload = {
        form: productData,
        url: `/transactions/?limit=${this.limit}&page=${this.currentPage}`,
      };

      const result = await this.$store.dispatch(
        "productStore/MAKE_POST",
        payload
      );
      this.handleResponse(result);

      //   if (result) {
      //     this.$store.commit("TOGGLE_PROCESSING");
      //     this.$store.commit("productStore/SET_BUYING_USER", "");
      //   }
    },

    showOverlayResponse(msg, error, success, warning, show) {
      const payload = {
        msg,
        error,
        success,
        warning,
        show,
      };

      this.$store.commit("admin/SHOW_RESPONSE", payload);
    },

    handleResponse(result) {
      console.log(result, result.response);

      if (!result.response) {
        this.$store.commit("admin/SET_TRANSACTIONS", result.data);
        // this.$store.dispatch(
        //   "productStore/GET_PRODUCTS",
        //   `/products/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        // );
        this.$store.commit("productStore/CLEAR_CART");
        this.showOverlayResponse(result.data.message, false, true, false, true);
      } else {
        console.log(
          result.response,
          result.response.data,
          result.response.message
        );
      }
    },
  },

  computed: {
    cartItems() {
      return this.$store.state.productStore.cartProducts;
    },

    buyingUser() {
      return this.$store.state.productStore.buyingUser;
    },

    cartProperties() {
      return this.$store.state.productStore.cartProperties;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    isShowingCart() {
      return this.$store.state.productStore.isShowingCart;
    },
  },
};
</script>

<style></style>
