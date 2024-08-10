<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Make Order</div>
      <div>{{ formattedDate() }}</div>
    </div>

    <div class="tb-top-info">
      <div class="tb-info pass">
        <div v-if="buyingUser">{{ buyingUser.username }}</div>
        <div v-else>Anonimous</div>
      </div>
      <div class="send-email-wrap">
        <input
          class="rane-date search w-input"
          v-model="productWord"
          placeholder="Search Products"
          type="text"
          @keyup="searchProduct"
        />
      </div>
      <div class="das-select">
        <input
          class="rane-date search full w-input"
          @keyup="searchUser"
          v-model="searchWord"
          placeholder="Search User"
          type="text"
        />
        <div class="das-drop-list" :class="{ active: showSearch }">
          <div
            @click="selectUser(user)"
            v-for="user in users"
            :key="user.id"
            class="drop-items"
          >
            {{ user.username }}
          </div>
        </div>
      </div>
    </div>

    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _40">Product</div>
          <div class="das-tb-cell _20">Price (N)</div>
          <div class="das-tb-cell _20">Quantity</div>
        </div>
        <div
          v-for="(item, int) in items"
          :key="item.id"
          :class="{ even: int % 2 == 0 }"
          class="das-tb-body"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
          </div>
          <div class="das-tb-cell _40">{{ item.name }}</div>
          <div class="das-tb-cell _20">
            {{ formatNumber(item.sellingPrice * 1) }}
          </div>
          <div class="das-tb-cell _20 quant">
            <div class="das-foot-pa quant" @click="removeFromCart(item)">-</div>
            <div class="tb-quant">
              <div>{{ item.quantity }}</div>
              <input
                class="stock-input"
                type="text"
                @change="setQuantity($event, item)"
              />
              <!-- {{ item.quantity }} -->
            </div>
            <div class="das-foot-pa quant" @click="addToCart(item)">+</div>
          </div>
        </div>
      </div>
    </div>

    <div class="das-tb-info">
      <div>Page {{ currentPage }} of {{ pages().length }}</div>

      <div class="das-paination">
        <div
          v-if="currentPage > 1"
          class="das-pa-next"
          @click="paginate(currentPage - 1)"
        >
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b4f324c69c44d55719f02_chevron0.svg"
            loading="lazy"
            alt=""
            class="das-paination-icon"
          />
        </div>
        <div
          v-for="(item, int) in pages()"
          @click="paginate(int + 1)"
          :key="int"
          class="das-foot-pa"
        >
          {{ int + 1 }}
        </div>

        <div
          class="das-pa-next"
          @click="paginate(currentPage + 1)"
          v-if="currentPage < pages().length"
        >
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b500072be49a09b6c1d36_chevron10.svg"
            loading="lazy"
            alt=""
            class="das-paination-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  components: {},
  data() {
    return {
      limit: 20,
      currentPage: 1,
      showSearch: false,
      searchWord: "",
      productWord: "",
      note: "",
      pages() {
        let array = [];
        let x = Math.ceil(this.total / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },
      users: [],
      selectedUser: "Anonimous",
      showList: false,

      showOverlay: false,
      overlayMsg: "",

      showAlert: false,
      alertMsg: "",
      alertError: false,
    };
  },
  methods: {
    formatNumber(number) {
      if (!number) {
        return "0.00";
      }
      const options = { style: "decimal", maximumFractionDigits: 0 };
      return number.toLocaleString("en-US", options);
    },

    formattedDate() {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = new Date();
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      // Function to get the day suffix
      function getDaySuffix(day) {
        if (day > 3 && day < 21) return "th"; // catch 11th, 12th, 13th
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }

      return `${month} ${day}${getDaySuffix(day)}, ${year}`;
    },

    paginate(int) {
      this.currentPage = int;
      this.getProducts();
    },

    selectUser(user) {
      this.selectedUser = user.username;
      this.$store.commit("productStore/SET_BUYING_USER", user);
      this.showSearch = false;
      this.searchWord = "";
    },

    clearCart() {
      this.$store.commit("CLEAR_CART");
    },

    removeFromCart(data) {
      this.$store.commit("productStore/REMOVE_FROM_CART", data);
    },

    setQuantity(e, item) {
      const payload = {
        data: item,
        quantity: e.target.value * 1,
      };
      this.$store.commit("productStore/SET_QUANTITY", payload);
    },

    addToCart(data) {
      this.$store.commit("productStore/ADD_TO_CART", data);
    },

    showAlertSuccess(msg, status) {
      this.alertMsg = msg;
      this.showAlert = true;
      this.alertError = status;
      setTimeout(() => {
        this.showAlert = false;
        this.alertMsg = "";
      }, 15000);
    },

    getProducts() {
      this.$store.dispatch(
        "productStore/GET_PRODUCTS",
        `/products/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async searchUser() {
      if (this.searchWord.length > 0) {
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }

      const result = await this.$store.dispatch(
        "MAKE_GET",
        `/users/?username=${this.searchWord}&limit=20&page=1`
      );
      this.users = result.data.data;
    },

    async searchProduct() {
      const result = await this.$store.dispatch(
        "MAKE_GET",
        `/products/?name=${this.productWord}&limit=20&page=1`
      );
      this.$store.commit("productStore/SET_PRODUCTS", result.data);
      console.log(result.data);
    },
  },

  computed: {
    items() {
      return this.$store.state.productStore.products;
    },

    buyingUser() {
      return this.$store.state.productStore.buyingUser;
    },

    total() {
      return this.$store.state.productStore.productLength;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },

    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
