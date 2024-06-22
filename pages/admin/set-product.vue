<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Products</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _20">Banner</div>
          <div class="das-tb-cell _30">Name</div>
          <div class="das-tb-cell _30">Title</div>
          <div class="das-tb-cell _30">Geetings</div>
        </div>
        <div
          v-for="(item, int) in items"
          :key="item.id"
          :class="{ even: int % 2 == 0 }"
          class="das-tb-body"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
            <div
              :class="{ active: item.checked }"
              class="das-tb-ceck"
              @click="toggleProduct(int)"
            >
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
                loading="lazy"
                alt=""
                class="das-tb-icon"
                :class="{ active: item.checked }"
              />
            </div>
          </div>
          <div class="das-tb-cell _20">
            <img
              :src="`${FILE_URL}/${item.image}`"
              loading="lazy"
              sizes="(max-width: 479px) 102.86250305175781px, (max-width: 767px) 21vw, (max-width: 991px) 13vw, (max-width: 1279px) 11vw, (max-width: 1439px) 128.8125px, 145.1999969482422px"
              srcset="`
                ${FILE_URL}/${item.image} 500w,
                ${FILE_URL}/${item.image}       550w`
              "
              alt=""
              class="tb-pix"
            />
          </div>
          <div class="das-tb-cell _30">{{ item.name }}</div>
          <div class="das-tb-cell _30">
            Buying Unit: {{ item.buyingUnit }}<br />
            Selling Unit: {{ item.sellingUnit }}
          </div>
          <div class="das-tb-cell _30">
            Buying: N{{ formatNumber(item.buyingUnitPrice * 1) }} <br />
            Selling: N{{ formatNumber(item.sellingPrice * 1) }}
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
      <div class="das-tb-cell">
        <div>3</div>
        <div class="das-tb-ceck foot active">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
            loading="lazy"
            alt=""
            class="das-tb-icon active"
          />
        </div>
      </div>
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/666010bad7eb3baa6c4314b2_edit.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
        @click="prepareProductEdit"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b486dcc7eddebcb1b7c96_trash-alt.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
        @click="deleteProduct"
      />
    </div>

    <div class="das-form">
      <div class="w-layout-grid das-rid">
        <div class="eac-form-input">
          <div class="from-rid-label">Name</div>
          <input
            class="from-rid-input w-input"
            v-model="name"
            placeholder="Enter Product Name"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Buying Unit</div>
          <input
            class="from-rid-input w-input"
            v-model="buyingUnit"
            placeholder="Enter Buying Unit"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Selling Unit</div>
          <input
            class="from-rid-input w-input"
            v-model="sellingUnit"
            placeholder="Enter Selling Unit"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Unit Per Purchase</div>
          <input
            class="from-rid-input w-input"
            v-model="unitsPerPurchase"
            placeholder="Enter Unit Per Purchase"
            type="number"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Buying Price</div>
          <input
            class="from-rid-input w-input"
            v-model="buyingUnitPrice"
            placeholder="Enter title"
            type="number"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Selling Price</div>
          <input
            class="from-rid-input w-input"
            placeholder="Enter Selling Price"
            type="text"
            v-model="sellingPrice"
          />
        </div>
      </div>
      <div class="eac-form-input mb-4">
        <div class="from-rid-label">Content</div>
        <client-only placeholder="loading..."
          ><ckeditor-nuxt
            class="custom-input txt high w-input"
            v-model="description"
            :config="editorConfig"
          />
        </client-only>
      </div>

      <div v-if="showResponse" class="das-response" :class="{ error: isError }">
        {{ response }}
      </div>

      <div class="form-btn-roups">
        <label for="file" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/66605c571255a4e63fb9cb4f_upload.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon"
          /><input
            class="hide w-input"
            type="file"
            id="file"
            accept="image/*"
            @change="setProductImage"
          />
          <div class="tb-action-text">Upload</div>
        </label>
        <div v-if="onRequest" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon spinner"
          /><input
            class="hide w-input"
            maxlength="256"
            name="field-3"
            data-name="Field 3"
            placeholder="27/10/2024"
            type="text"
            id="field-3"
            required=""
          />
          <div class="tb-action-text">Processing...</div>
        </div>
        <div v-else @click="processProduct" class="overlay-btn pad">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      name: "",

      buyingUnit: "",
      sellingUnit: "",
      buyingUnitPrice: "",
      sellingPrice: "",
      unitsPerPurchase: "",
      description: "",
      image: "",

      sort: "",
      limit: 10,
      currentPage: 1,
      pages() {
        let array = [];
        let x = Math.ceil(this.total / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },
      searchedWord: "",
      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
      showEditor: false,
      editId: "",
      editState: false,

      showOverlay: false,
      overlayMsg: "",
      overlaySignal: "",

      sort: "name",
      sortName: "name",
      sortPrice: "-sellingPrice",
    };
  },

  methods: {
    toggleProduct(int) {
      this.$store.commit("admin/TOGGLE_PRODUCT", int);
      if (this.selectedProducts.length == 0) {
        this.clearInputs();
      }
    },

    editCat(category, int) {
      this.productCategoryEditIndex = int;
      this.productCategory = category;
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

    removeCat(int) {
      this.productCategories.splice(int, 1);
    },

    selectAll() {
      this.$store.commit(
        "settingsStore/TOGGLE_ALL_PRODUCTS",
        this.isAllChecked
      );
    },

    showAlertBox(msg, status) {
      this.$store.commit("SHOW_ALERT_BOX", { msg, status });
    },

    sortProductName() {
      this.sortName = this.sortName == "-name" ? "name" : "-name";
      this.getProducts();
    },

    sortProductSellingPrice() {
      this.sortPrice =
        this.sortPrice == "-sellingPrice" ? "sellingPrice" : "-sellingPrice";

      this.getProducts();
    },

    paginate(page) {
      this.currentPage = page;
      this.getProducts();
    },

    setProductData(product) {
      this.name = product.name;
      this.buyingUnit = product.buyingUnit;
      this.sellingUnit = product.sellingUnit;
      this.buyingUnitPrice = product.buyingUnitPrice;
      this.sellingPrice = product.sellingPrice;
      this.unitsPerPurchase = product.unitsPerPurchase;
      this.image = product.image;
    },

    duplicateProduct(product) {
      this.showEditor = true;
      this.setProductData(product);
    },

    async deleteProduct() {
      if (this.selectedProducts.length === 0) {
        this.showOverlayResponse(
          "Please select at least one row in the table to edit",
          true,
          false,
          false,
          true
        );
        return;
      }
      const payload = {
        form: this.selectedProducts,
        url: `/products/delete/?&sort=${this.sort}&limit=${this.limit}&page=${this.currentPage}`,
      };

      const result = await this.$store.dispatch("admin/MAKE_POST", payload);
      if (!result.response) {
        this.$store.commit("admin/SET_PRODUCTS", result.data);
      }
    },

    prepareProductEdit() {
      if (this.selectedProducts.length === 0) {
        this.showAlertBox(
          "Please select at least one row in the table to edit",
          true
        );
        return;
      }
      const product = JSON.parse(
        JSON.stringify(this.selectedProducts[this.selectedProducts.length - 1])
      );
      this.showEditor = true;
      this.editId = product.id;
      this.editState = true;
      this.setProductData(product);
    },

    showResponseMsg(msg, status) {
      this.response = msg;
      this.isError = status;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.response = "";
        this.showResponse = false;
      }, 6000);
    },

    formatNumber(number) {
      if (!number) {
        return "0.00";
      }
      const options = { style: "decimal", maximumFractionDigits: 0 };
      return number.toLocaleString("en-US", options);
    },

    callResponse(msg, state) {
      this.response = msg;
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    clearInputs() {
      this.editId = "";
      this.editState = false;
      this.deleteId = "";
      this.name = "";

      this.buyingUnit = "";
      this.sellingUnit = "";
      this.buyingUnitPrice = "";
      this.sellingPrice = "";
      this.unitsPerPurchase = "";

      this.description = "";
      this.image = "";
    },

    checkInput(data) {
      if (this.sellingPrice == 0 || this.sellingPrice == "") {
        this.callResponse("Please input product selling price", true);

        this.promoPrice = data == "promoPrice" ? "" : this.promoPrice;
        this.discount = data == "discount" ? "" : this.discount;
        return;
      }
      if (data == "promoPrice") {
        this.discount = ((this.promoPrice * 0.01) / this.sellingPrice).toFixed(
          2
        );
      }
      if (data == "discount") {
        this.promoPrice = ((this.discount * this.sellingPrice) / 0.01).toFixed(
          2
        );
      }
    },

    setProductImage(e) {
      this.image = e.target.files[0];
    },

    setProductVideo(e) {
      this.video = e.target.files[0];
    },

    editStatePrice(obj) {
      this.statePriceObj.state = obj.state;
      this.statePriceObj.price = obj.price;
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

    addProductCategories() {
      if (this.productCategory == "") {
        return;
      }
      if (this.productCategoryEditIndex == "") {
        this.productCategories.push(this.productCategory);
      } else {
        this.productCategories[this.productCategoryEditIndex] =
          this.productCategory;
      }
      this.productCategory = "";
      this.productCategoryEditIndex = "";
    },

    checkErrorInputs(input, data) {
      if (input == "name") {
        if (data == "" || !data || data.length < 2) {
          this.isError = true;
          this.callResponse(
            "Product name must be at least two characters long",
            true
          );
          return;
        } else {
          this.isError = false;
          return false;
        }
      } else if (input == "buyingPrice") {
        if (data == 0 || data == "") {
          this.isError = true;
          this.callResponse("Please enter a product buying price", true);
          return true;
        } else {
          this.isError = false;
          return false;
        }
      } else if (input == "sellingPrice") {
        if (data == 0 || data == "") {
          this.isError = true;
          this.callResponse("Please enter a product selling price", true);
          return true;
        } else {
          this.isError = false;
          return false;
        }
      }
    },

    setArray() {
      this.checkArray = [
        { name: "name", data: this.name },
        { name: "buyingPrice", data: this.buyingUnitPrice },
        { name: "sellingPrice", data: this.sellingPrice },
      ];
    },

    processProduct() {
      this.setArray();
      for (let i = 0; i < this.checkArray.length; i++) {
        const el = this.checkArray[i];
        const result = this.checkErrorInputs(el.name, el.data);
        if (result) {
          break;
        }
      }

      if (this.isError) {
        return;
      }
      this.onRequest = true;
      const form = new FormData();
      form.append("name", this.name);

      form.append("buyingUnit", this.buyingUnit);
      form.append("sellingUnit", this.sellingUnit);
      form.append("buyingUnitPrice", this.buyingUnitPrice);
      form.append("sellingPrice", this.sellingPrice);
      form.append("description", this.description);
      form.append("unitsPerPurchase", this.unitsPerPurchase);

      form.append("image", this.image);

      form.append("dateCreated", new Date().getTime());

      this.createProduct(form);
    },

    getProducts() {
      this.$store.dispatch(
        "admin/GET_PRODUCTS",
        `/products/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async createProduct(productData) {
      const payload = {
        form: productData,
        url: !this.editState
          ? `/products/create/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sortName}`
          : `/products/?id=${this.editId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sortName}`,
      };

      const result = await this.$store.dispatch("MAKE_POST", payload);
      this.handleResponse(result);
    },

    handleResponse(result) {
      this.onRequest = false;
      if (result.response) {
        this.callResponse(result.response.data.message, true);
      } else {
        this.onRequest = false;
        this.clearInputs();
        this.$store.commit("admin/SET_PRODUCTS", result.data);
      }
    },

    async fetchItems() {
      const data = {
        keyWord: this.searchedWord,
        limit: this.limit,
        username: this.user.username,
      };

      this.$store.dispatch("settingsStore/SEARCH_PRODUCTS", data);
    },
  },

  mounted() {
    if (!this.productStatus) {
      this.getProducts();
    }
  },

  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    productStatus() {
      return this.$store.state.admin.productStatus;
    },

    items() {
      return this.$store.state.admin.products;
    },

    total() {
      return this.$store.state.admin.productLength;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },

    selectedProducts() {
      return this.$store.state.admin.selectedProducts;
    },

    isAllChecked() {
      return this.$store.state.settingsStore.isProductsChecked;
    },

    states() {
      return this.$store.state.stateArray;
    },

    user() {
      return this.$store.state.auth.user;
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
