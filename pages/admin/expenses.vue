<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Expenses</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="tb-top-info">
      <div class="tb-info pass">
        Total: N{{ formatNumber(smallExpense * 1) }}
      </div>
      <div class="send-email-wrap auto">
        <input
          class="rane-date w-input"
          maxlength="256"
          name="field-3"
          data-name="Field 3"
          placeholder="27/10/2024"
          type="text"
          id="field-3"
          required=""
        />
        <div class="tb-action-text">From</div>
      </div>
      <div class="send-email-wrap">
        <input
          class="rane-date w-input"
          maxlength="256"
          name="field-2"
          data-name="Field 2"
          placeholder="27/10/2024"
          type="text"
          id="field-2"
          required=""
        />
        <div class="tb-action-text">To</div>
      </div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _40">Description</div>
          <div class="das-tb-cell _20">Amount (N)</div>
          <div class="das-tb-cell _20">Time</div>
          <div class="das-tb-cell _20">Status</div>
        </div>
        <div
          class="das-tb-body"
          v-for="(item, int) in items"
          :key="item.id"
          :class="{
            even: int % 2 == 0,
          }"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
            <div
              v-if="!item.status"
              :class="{ active: item.checked }"
              class="das-tb-ceck"
              @click="toggleExpenses(int)"
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

          <div class="das-tb-cell _40">{{ item.products }}</div>
          <div class="das-tb-cell _20">{{ formatNumber(item.amount * 1) }}</div>
          <div class="das-tb-cell _20 quant">
            <div class="tb-quant">
              {{ formartTime(item.ordered_time * 1) }} <br />{{
                formatDate(item.ordered_time * 1)
              }}
            </div>
          </div>
          <div class="das-tb-cell _20 quant">
            <div class="trans-approve" v-if="item.status">Approved</div>
            <div class="trans-approve staff" v-else>Pending</div>
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
        @click="editExpenses"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b486dcc7eddebcb1b7c96_trash-alt.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
      />
    </div>

    <div class="das-form">
      <div class="w-layout-grid das-rid">
        <div
          id="w-node-_051910a3-f28c-6eda-27ba-530182602e12-1905ac1a"
          class="eac-form-input"
        >
          <div class="from-rid-label">Amount</div>
          <input
            class="from-rid-input w-input"
            v-model="amount"
            placeholder="Enter Amount"
            type="number"
          />
        </div>
        <div
          id="w-node-_0c0ff2cb-58ba-be13-e791-7c08b3a8e247-1905ac1a"
          class="eac-form-input"
        >
          <div class="from-rid-label">Description</div>
          <textarea
            placeholder="Enter Description"
            v-model="products"
            class="from-rid-input w-input"
          ></textarea>
        </div>
      </div>

      <div
        v-if="showResponse"
        class="das-response error"
        :class="{ error: isError }"
      >
        {{ response }}
      </div>

      <div class="form-btn-roups">
        <div v-if="onRequest" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon"
          />
          <div class="tb-action-text">Processing...</div>
        </div>
        <div v-else @click="processData" class="overlay-btn pad">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      sort: "-ordered_time",
      limit: 10,
      currentPage: 1,
      pages: function () {
        let array = [];
        let x = Math.ceil(this.total / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },

      products: "",
      amount: "",
      payment: "",
      payments: ["POS", "Cash", "Transfer", "Credit"],
      transactionQuery: "&transactionType=Expenses",

      status: 1,
      dateFrom: "",
      dateTo: "",

      timeFrom: "",
      timeTo: "",

      isError: false,
      onRequest: false,
      showResponse: false,
      response: "",
    };
  },

  methods: {
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

    clearInputs() {
      this.amount = "";
      this.products = "";
    },

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

    formartTime(data) {
      if (!data) {
        return "0:0";
      }
      const date = new Date(data);
      return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },

    formatDate(data) {
      function getOrdinalSuffix(day) {
        const suffixes = ["th", "st", "nd", "rd"];
        const mod = day % 100;
        return (
          day + (suffixes[(mod - 20) % 10] || suffixes[mod] || suffixes[0])
        );
      }

      if (!data) {
        return "";
      }
      const date = new Date(data);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();

      return `${getOrdinalSuffix(day)} ${month}. ${year}`;
    },

    formatInputDate(type) {
      const time =
        type == "from" ? new Date().getTime() - 86400000 : new Date().getTime();
      const dateObj = new Date(time);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");

      if (type == "from") {
        this.dateFrom = `${year}-${month}-${day}`;
        this.timeFrom = `&ordered_time[gte]=${time}`;
      } else {
        this.dateTo = `${year}-${month}-${day}`;
        this.timeTo = `&ordered_time[lte]=${time}`;
      }
    },

    toggleExpenses(int) {
      this.$store.commit("admin/TOGGLE_EXPENSES", int);
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getTransactions();
    },

    paginate(page) {
      this.currentPage = page;
      this.getTransactions();
    },

    refresh() {
      this.timeFrom = "";
      this.timeTo = "";
      this.getTransactions();
    },

    copyData(item) {
      this.products = item.products;
      this.amount = item.amount;
    },

    editExpenses() {
      if (this.selectedExpenses.length == 0) {
        this.showOverlayResponse(
          `Please select an email to edit`,
          true,
          false,
          false,
          true
        );
        return;
      }
      const item = JSON.parse(
        JSON.stringify(this.selectedExpenses[this.selectedExpenses.length - 1])
      );

      this.editState = true;
      this.editId = item.id;
      this.copyData(item);
    },

    setTransactionType(type) {
      this.transaction = type;
      if (type == "All Transactions") {
        this.transactionQuery = ``;
      } else {
        this.transactionQuery = `&transactionType=${type}`;
      }
      this.showTransactions = false;
      this.getTransactions();
    },

    setFrom(e) {
      this.timeFrom = `&ordered_time[gte]=${new Date(
        e.target.value
      ).getTime()}`;
      this.status = 1;
      this.getTransactions();
    },

    setTo(e) {
      this.timeTo = `&ordered_time[lte]=${new Date(e.target.value).getTime()}`;
      this.getTransactions();
    },

    async processData() {
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

      const productData = new FormData();
      productData.append("products", this.products);
      if (!this.editState) {
        productData.append("ordered_time", new Date().getTime());
      }
      productData.append("amount", this.amount);
      productData.append("transactionType", "Expenses");
      productData.append("payment", this.payment);
      productData.append("seller", this.user.username);
      productData.append("username", this.company.companyName);

      const payload = {
        form: productData,
        url: this.editState
          ? `/transactions/update/?id=${this.editId}&limit=${this.limit}&page=${this.currentPage}&transactionType=Expenses&sort=${this.sort}`
          : `/transactions/?limit=${this.limit}&page=${this.currentPage}&transactionType=Expenses&sort=${this.sort}`,
      };

      const result = await this.$store.dispatch(
        "productStore/MAKE_POST",
        payload
      );
      this.handleResponse(result);
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
      if (!result.response) {
        this.$store.commit("admin/SET_EXPENSES", result.data);
        this.$store.commit("productStore/CLEAR_CART");
        this.showOverlayResponse(result.data.message, false, true, false, true);
        // this.getExpenses();
        this.clearInputs();
      } else {
        console.log(
          result.response,
          result.response.data,
          result.response.message
        );
      }
    },

    async getExpenses() {
      const query = `/transactions/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}${this.timeFrom}${this.timeTo}${this.transactionQuery}`;
      console.log(query);
      this.$store.dispatch("admin/GET_EXPENSES", query);
    },
  },

  mounted() {
    this.formatInputDate("to");
    this.formatInputDate("from");
    // if (!this.transactionStatus) {
    //   this.getExpenses();
    // }

    this.getExpenses();
  },

  computed: {
    time() {
      return `${this.timeFrom}${this.timeTo}`;
    },

    user() {
      return this.$store.state.auth.user;
    },

    items() {
      return this.$store.state.admin.expenses;
    },

    smallExpense() {
      return this.$store.state.admin.smallExpense;
    },

    company() {
      return this.$store.state.admin.company[0];
    },

    total() {
      return this.$store.state.admin.expenseLength;
    },

    selectedExpenses() {
      return this.$store.state.admin.selectedExpenses;
    },
  },
};
</script>

<style></style>
