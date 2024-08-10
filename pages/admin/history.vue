<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>History</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="tb-top-info">
      <div class="tb-info pass">Sold: N{{ formatNumber(order * 1) }}</div>
      <div class="tb-info fail">Expenses: N{{ formatNumber(expense * 1) }}</div>
      <div class="tb-info fail">
        Purchased: N{{ formatNumber(purchase * 1) }}
      </div>
      <div class="tb-info pass">Profits: N{{ formatNumber(profits * 1) }}</div>
      <div class="das-select">
        <div
          @click="showTransactions = !showTransactions"
          class="das-drop-ead top"
        >
          <div>{{ transaction }}</div>
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b42b9cdc93e201b85bd05_chevron11.svg"
            loading="lazy"
            alt=""
            class="drop-icon"
          />
        </div>
        <div class="das-drop-list" :class="{ active: showTransactions }">
          <div
            v-for="item in transactionTypes"
            :key="item"
            @click="setTransactionType(item)"
            class="drop-items"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _20">Username</div>
          <div class="das-tb-cell _40">Products</div>
          <div class="das-tb-cell _20">Price (N)</div>
          <div class="das-tb-cell _20">Time</div>
        </div>
        <div
          v-for="(item, int) in items"
          :key="item.id"
          :class="{
            even: int % 2 == 0,
            fail: item.transactionType == 'Purchase',
            sell: item.transactionType == 'Order',
            dam: item.transactionType == 'Expenses',
          }"
          class="das-tb-body"
          style="cursor: pointer"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
          </div>

          <div class="das-tb-cell _20 link">
            <NuxtLink
              v-if="item.username != 'Anonimous'"
              :to="`admin/user-detail/?username=${item.username}`"
              class="istory-name"
              >{{ item.username }}</NuxtLink
            >
            <span v-else class="istory-name">{{ item.username }}</span>

            <NuxtLink
              v-if="item.seller != 'Admin'"
              :to="`/admin/user-detail/?username=${item.seller}`"
              class="istory-name staff"
              >{{ item.seller }}</NuxtLink
            >
            <span v-else class="istory-name staff">{{ item.seller }}</span>
          </div>
          <div class="das-tb-cell _40 block">
            <div v-if="item.transactionType == 'Expenses'">
              {{ item.products }}
            </div>
            <div v-else>
              <NuxtLink
                :to="`/admin/transaction-details/?id=${item.id}`"
                style="text-decoration: none; color: #2a3247"
              >
                <div
                  v-for="(product, index) in JSON.parse(item.products)"
                  :key="index"
                >
                  <div>
                    {{ product.quantity }}
                    <span v-if="transaction.transactionType == 'Purchase'">{{
                      product.productBuyingUnit
                    }}</span>
                    <span v-if="transaction.transactionType == 'Order'">{{
                      product.sellingUnit
                    }}</span>
                    of
                    {{ product.name }} =
                    {{ formatNumber(product.quantity * product.sellingPrice) }}
                    <br />
                  </div></div
              ></NuxtLink>
            </div>
          </div>
          <div class="das-tb-cell _20">
            <div>
              N{{ formatNumber(item.amount * 1) }}<br />
              -N{{ formatNumber(item.discount * 1) }}
            </div>
          </div>
          <div class="das-tb-cell _20">
            {{ formartTime(item.ordered_time * 1) }}, <br />{{
              formatDate(item.ordered_time * 1)
            }}
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
      <div class="send-email-wrap">
        <input
          class="rane-date w-input"
          placeholder="27/10/2024"
          type="datetime-local"
          v-model="dateFrom"
          @change="setFrom"
        />
        <div class="tb-action-text">From</div>
      </div>
      <div class="send-email-wrap">
        <input
          class="rane-date w-input"
          placeholder="27/10/2024"
          type="datetime-local"
          v-model="dateTo"
          @change="setTo"
        />
        <div class="tb-action-text">To</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      sort: ``,
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

      status: 1,
      dateFrom: "",
      dateTo: "",

      timeFrom: "",
      timeTo: "",

      showTransactions: false,
      transaction: "All Transactions",
      transactionQuery: "",
      transactionTypes: ["All Transactions", "Order", "Purchase", "Expenses"],
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

    formatNumber(number) {
      if (!number) {
        return "0.00";
      }
      const options = { style: "decimal", maximumFractionDigits: 0 };
      return number.toLocaleString("en-US", options);
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
      const now = new Date(e.target.value);
      let startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );

      this.timeFrom = `&ordered_time[gte]=${startOfToday.getTime()}`;
      this.status = 1;
      this.getTransactions();
    },

    setTo(e) {
      this.timeTo = `&ordered_time[lte]=${new Date(e.target.value).getTime()}`;
      this.getTransactions();
    },

    closeOverlay() {
      this.showOverlay = false;
      this.overlayMsg = "";
      if (this.deleteId != "" && this.overlaySignal == "single") {
        this.deleteuser();
      } else {
        this.deletetransactions();
      }
    },

    async fetchItems(e) {
      const data = {
        keyWord: e.target.value,
        limit: this.limit,
        page: this.currentPage,
      };
      this.$socket.emit("fetchItems", data);
    },

    async getTransactions() {
      const query = `/transactions/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}${this.timeFrom}${this.timeTo}${this.transactionQuery}&status=${this.status}`;

      this.$store.dispatch("admin/GET_TRANSACTIONS", query);
    },
  },

  mounted() {
    // this.formatInputDate("to");
    // this.formatInputDate("from");
    // if (!this.transactionStatus) {
    //   this.getTransactions();
    // }

    let now = new Date();
    let startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );

    this.sort = `-ordered_time&ordered_time[gte]=${startOfToday.getTime()}`;
    this.getTransactions();
    setInterval(() => {
      this.getTransactions();
    }, 3 * 60 * 1000);
  },

  computed: {
    time() {
      return `${this.timeFrom}${this.timeTo}`;
    },

    user() {
      return this.$store.state.auth.user;
    },

    transactionStatus() {
      return this.$store.state.admin.transactionStatus;
    },

    order() {
      return this.$store.state.admin.order;
    },

    purchase() {
      return this.$store.state.admin.purchase;
    },

    expense() {
      return this.$store.state.admin.expense;
    },

    profits() {
      return this.$store.state.admin.profits;
    },

    items() {
      return this.$store.state.admin.transactions;
    },

    total() {
      return this.$store.state.admin.transactionLength;
    },
  },
};
</script>

<style></style>
