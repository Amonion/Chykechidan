<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Stock</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="tb-top-info">
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
          <div class="das-tb-cell _20">Remaining</div>
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
            <div>
              {{ item.buyingUnitRem }} {{ item.buyingUnit }} <br />
              {{ item.sellingUnitRem }} {{ item.sellingUnit }}
            </div>
            <br />
          </div>
          <div class="das-tb-cell block _20 quant">
            <div class="flex-btw">
              <div class="das-foot-pa quant">-</div>
              <div class="tb-quant">
                <input
                  class="stock-input"
                  type="text"
                  v-model="item.buyingUnitRem"
                />
              </div>
              <div class="das-foot-pa quant">+</div>
            </div>
            <div class="flex-btw">
              <div class="das-foot-pa quant">-</div>
              <div class="tb-quant">
                <input
                  class="stock-input"
                  type="text"
                  v-model="item.sellingUnitRem"
                />
              </div>
              <div class="das-foot-pa quant">+</div>
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

    <div class="das-tb-footer">
      <div class="trans-approve" @click="updateStock">Update Stocks</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      sort: "-name",
      productWord: "",
      stockStatus: false,
      limit: 10,
      currentPage: 1,
      // items: [],
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
    selectAll() {},
    sortProductName() {},
    sortProductSellingPrice() {},
    duplicateProduct() {},
    prepareProductEdit() {},

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

    async updateStock() {
      const payload = {
        form: this.items,
        url: `/stock/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`,
      };

      const result = await this.$store.dispatch("admin/MAKE_POST", payload);
      console.log(result.response, result);
      if (!result.response) {
        this.$store.commit("admin/SET_STOCK", result.data);
        this.showOverlayResponse(
          "Stocks updated successfully",
          false,
          true,
          false,
          true
        );
      } else {
        console.log(result.response);
      }
    },

    async searchProduct() {
      const result = await this.$store.dispatch(
        "MAKE_GET",
        `/stock/?name=${this.productWord}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
      this.$store.commit("admin/SET_STOCK", result.data);
    },

    async getStocks() {
      this.$store.dispatch(
        "admin/GET_STOCK",
        `/stock/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    formatNumber(number) {
      if (!number) {
        return "0.00";
      }
      const options = { style: "decimal", maximumFractionDigits: 0 };
      return number.toLocaleString("en-US", options);
    },
  },

  mounted() {
    // setInterval(() => {
    //   if (!this.stockStatus) {
    //     if (this.stocks.length > 0) {
    //       this.items = JSON.parse(
    //         JSON.stringify(this.$store.state.admin.stocks)
    //       );
    //     }
    //     this.stockStatus = true;
    //   }
    // }, 1000);
    this.getStocks();
  },

  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    isAllChecked() {},

    total() {
      return this.$store.state.admin.stockLength;
    },

    items() {
      return JSON.parse(JSON.stringify(this.$store.state.admin.stocks));
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },

  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
};
</script>

<style></style>
