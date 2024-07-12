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
          <div class="ero-title">CONFIRM BILLING</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            Billing]
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
                <div>Username</div>
                <input
                  class="bill-input w-input"
                  v-model="user.username"
                  placeholder="Enter Username"
                  type="text"
                  disabled
                />
              </div>
              <div class="bill-input-wrap">
                <div>Full Name</div>
                <input
                  class="bill-input w-input"
                  v-model="fullName"
                  placeholder="Enter Full Name"
                  type="text"
                />
              </div>
              <div class="bill-input-wrap">
                <div>Phone Number</div>
                <input
                  class="bill-input w-input"
                  placeholder="Enter Phone Number"
                  type="text"
                  disabled
                  v-model="user.phone"
                />
              </div>
              <div class="bill-input-wrap">
                <div>Email Address</div>
                <input
                  class="bill-input w-input"
                  v-model="user.email"
                  placeholder="Enter First Name"
                  type="text"
                  disabled
                />
              </div>
              <div class="bill-input-wrap">
                <div>Your Address</div>
                <input
                  class="bill-input w-input"
                  v-model="address"
                  placeholder="Enter Address"
                  type="text"
                />
              </div>
              <div class="bill-input-wrap">
                <div>Your Payment</div>
                <div class="das-select full">
                  <div
                    class="das-drop-ead top"
                    @click="showPayments = !showPayments"
                  >
                    <div>{{ payment }}</div>
                    <img
                      src="/images/chevron.svg"
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
              <div class="ceck-out-btn btn active" @click="cancelOrder">
                CANCEL ORDER
              </div>
              <div v-if="onRequest" class="load-btn">
                <img
                  src="/images/spinner.svg"
                  loading="lazy"
                  alt=""
                  class="spinner"
                />
                <div>Processing...</div>
              </div>
              <div v-else @click="processData" class="ceck-out-btn btn">
                PLACE ORDER (N{{
                  numberWithCommas(cartProperties.totalAmount)
                }})
              </div>
            </div>
            <div
              class="response"
              :class="{ error: isError }"
              v-if="showResponse"
            >
              {{ response }}
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
      payment: "Select Payment",
      address: "",
      fullName: "",
      payments: ["POS", "Cash", "Transfer"],
      showPayments: false,
      showResponse: false,
      isError: false,
      response: false,
      onRequest: false,

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
    checkErrorInputs(input, data) {
      if (input == "fullName") {
        if (
          data == "" ||
          !data ||
          data.length < 2 ||
          !/^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/.test(data)
        ) {
          this.response = "Please enter your full name.";
          this.isError = true;
          return true;
        } else {
          this.response = "";
          this.isError = false;
        }
      } else if (input == "address") {
        if (
          data == "" ||
          !data ||
          data.length < 2 ||
          /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/.test(data)
        ) {
          this.response = "Please enter your correct address.";
          this.isError = true;
          return true;
        } else {
          this.response = "";
          this.isError = false;
        }
      } else if (input == "payment") {
        if (data == "Select Payment") {
          this.response = "Please select a payment method.";
          this.isError = true;
          return true;
        } else {
          this.response = "";
          this.isError = false;
        }
      }
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

    setArray() {
      this.checkArray = [
        { name: "fullName", data: this.fullName },
        { name: "address", data: this.address },
        { name: "payment", data: this.payment },
      ];
    },

    callResponse(msg, state) {
      this.showResponse = true;
      this.isError = state;
      this.response = msg;
      this.onRequest = false;
      setTimeout(() => {
        if (!state) {
          this.$router.push("/products");
        }
        this.showResponse = false;
      }, 6000);
    },

    cancelOrder() {
      this.$store.commit("productStore/CLEAR_CART");
      this.$router.push("/");
    },

    selectPayment(item) {
      this.payment = item;
      this.showPayments = false;
    },

    async processData() {
      this.setArray();
      for (let i = 0; i < this.checkArray.length; i++) {
        const el = this.checkArray[i];
        const result = this.checkErrorInputs(el.name, el.data);
        if (result) {
          break; // This will exit the entire loop
        }
      }
      if (this.isError) {
        this.callResponse(this.response, true);
        return;
      }

      const productData = {
        products: JSON.stringify(this.cartItems),
        ordered_time: new Date().getTime(),
        quantity: this.cartProperties.totalQuantity,
        amount: this.cartProperties.totalAmount,
        transactionType: "Order",
        seller: "User",
        status: false,
        username: this.user.username,
        fullName: this.fullName,
        address: this.address,
      };

      const payload = {
        form: productData,
        url: `/transactions/?limit=${this.limit}&page=${this.currentPage}`,
      };

      this.onRequest = true;

      const result = await this.$store.dispatch(
        "productStore/MAKE_POST",
        payload
      );

      if (!result.response) {
        this.callResponse(
          "Your order has been placed successfully, waiting for confirmation.",
          false
        );
        this.$store.commit("productStore/CLEAR_CART");
      } else {
        this.callResponse(result.response.message, true);
      }
    },
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    cartItems() {
      return this.$store.state.productStore.cartProducts;
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
