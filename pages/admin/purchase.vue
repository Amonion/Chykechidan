<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Purchase</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="tb-top-info">
      <!-- <div class="tb-info pass">Total: N466,400,000</div>
      <div class="tb-info pass">Profits: N130,000,000</div> -->
      <div class="send-email-wrap">
        <input
          class="rane-date search w-input"
          v-model="productWord"
          placeholder="Search Products"
          type="text"
          @keyup="searchProduct"
        />
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
          :class="{
            even: int % 2 == 0,
          }"
          class="das-tb-body"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
          </div>
          <div class="das-tb-cell _40">{{ item.name }}</div>
          <div class="das-tb-cell _20">{{ item.buyingUnitPrice }}</div>
          <div class="das-tb-cell _20 quant">
            <div class="das-foot-pa quant" @click="removeProductPurchase(item)">
              -
            </div>
            <div class="tb-quant">
              <div>{{ item.quantity }}</div>
              <input
                class="stock-input"
                type="text"
                @change="setQuantity($event, item)"
              />
              <!-- {{ item.quantity }} -->
            </div>
            <div class="das-foot-pa quant" @click="addProductPurchase(item)">
              +
            </div>
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

  data() {
    return {
      sort: "name",
      limit: 20,
      currentPage: 1,
      productWord: "",
      pages: function () {
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

    addProductPurchase(product) {
      this.$store.commit("productStore/ADD_TO_PURCHASE", product);
    },

    removeProductPurchase(product) {
      this.$store.commit("productStore/REMOVE_FROM_PURCHASE", product);
    },

    async searchProduct() {
      const result = await this.$store.dispatch(
        "MAKE_GET",
        `/products/?name=${this.productWord}&limit=20&page=1`
      );
      this.$store.commit("productStore/SET_PURCHASE_PRODUCTS", result.data);
    },

    setQuantity(e, item) {
      const payload = {
        data: item,
        quantity: e.target.value * 1,
      };
      this.$store.commit("productStore/SET_PURCHASE_QUANTITY", payload);
    },

    getProducts() {
      this.$store.dispatch(
        "productStore/GET_PURCHASE_PRODUCTS",
        `/products/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },

  mounted() {
    this.getProducts();
  },

  computed: {
    productStatus() {
      return this.$store.state.productStore.productStatus;
    },

    items() {
      return this.$store.state.productStore.purchaseProducts;
    },

    total() {
      return this.$store.state.productStore.purchaseProductsLength;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>

<style></style>
