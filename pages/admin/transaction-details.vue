<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Transactions</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="each-pending-order">
      <div v-if="transaction" class="tb-top-info no-space">
        <div class="tb-info pass">{{ transaction.username }}</div>
        <div class="tb-info amount sell">
          Total: N{{ formatNumber(transaction.amount * 1) }}
        </div>
        <div class="tb-info no">
          {{ formartTime(transaction.ordered_time) }},
          {{ formatDate(transaction.ordered_time) }}
        </div>
      </div>
      <div v-if="transaction" class="das-tb-flow">
        <div class="das-tb">
          <div class="das-tb-ead">
            <div class="das-tb-cell">S/N</div>
            <div class="das-tb-cell _40">Products</div>
            <div class="das-tb-cell _20">Price (N)</div>
            <div class="das-tb-cell">Quantity</div>
            <div class="das-tb-cell _20">Total</div>
          </div>
          <div v-if="transaction.transactionType != 'Expenses'">
            <div
              v-for="(item, int) in JSON.parse(transaction.products)"
              :key="int"
              :class="{
                even: int % 2 == 0,
                fail: transaction.transactionType == 'Purchase',
                pass: transaction.transactionType == 'Order',
              }"
              class="das-tb-body"
            >
              <div class="das-tb-cell">
                <div>{{ int + 1 }}</div>
              </div>
              <div class="das-tb-cell _40">{{ item.name }}</div>
              <div
                class="das-tb-cell _20"
                v-if="transaction.transactionType == 'Order'"
              >
                N{{ formatNumber(item.sellingPrice) }}
              </div>
              <div class="das-tb-cell _20" v-else>
                N{{ formatNumber(item.buyingPrice) }}
              </div>
              <div class="das-tb-cell">{{ item.quantity }}</div>
              <div
                class="das-tb-cell _20"
                v-if="transaction.transactionType == 'Order'"
              >
                N{{ formatNumber(item.quantity * item.sellingPrice) }}
              </div>
              <div class="das-tb-cell _20" v-else>
                N{{ formatNumber(item.quantity * item.buyingPrice) }}
              </div>
            </div>
          </div>
          <div v-else>
            <div class="das-tb-body">
              <div class="das-tb-cell">
                <div>1</div>
              </div>
              <div class="das-tb-cell _40">{{ transaction.products }}</div>
              <div class="das-tb-cell _20">
                N{{ formatNumber(transaction.amount * 1) }}
              </div>

              <div class="das-tb-cell">1</div>
              <div class="das-tb-cell _20">
                N{{ formatNumber(1 * transaction.amount) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminOrders from "../../components/Admin/AdminOrders.vue";
export default {
  components: { AdminOrders },
  layout: "admin",
  data() {
    return {
      sort: "-ordered_time",
      field: "",
      limit: 10,
      transaction: "",
      currentPage: 1,
      items: [],
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
    paginate(int) {
      this.currentPage = int;
      this.getTransactions();
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
      const date = new Date(Number(data));
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
      const date = new Date(Number(data));
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();

      return `${getOrdinalSuffix(day)} ${month}. ${year}`;
    },

    formatNumber(number) {
      if (!number) {
        return "0.00";
      }
      const options = { style: "decimal", maximumFractionDigits: 0 };
      return number.toLocaleString("en-US", options);
    },

    async getTransactions(id) {
      const result = await this.$store.dispatch(
        "admin/MAKE_GET",
        `/transactions/?id=${id}`
      );
      this.transaction = result.data;
    },
  },

  mounted() {
    this.getTransactions(this.$route.query.id);
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
