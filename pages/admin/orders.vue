<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Transactions</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <admin-orders v-for="order in items" :key="order.id" :order="order" />

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
import AdminOrders from "../../components/Admin/AdminOrders.vue";
export default {
  components: { AdminOrders },
  layout: "admin",
  data() {
    return {
      sort: "-ordered_time",
      field: "",
      limit: 10,
      message: "",
      currentPage: 1,
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

    getTransactions() {
      this.$store.dispatch(
        "admin/GET_ORDERS",
        `/transactions/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&status=0`
      );
    },
  },

  mounted() {
    this.getTransactions();
    setInterval(() => {
      this.getTransactions();
    }, 3 * 60 * 1000);
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    transactionStatus() {
      return this.$store.state.admin.orderStatus;
    },

    total() {
      return this.$store.state.admin.orderLength;
    },

    items() {
      return this.$store.state.admin.orders;
    },
  },
};
</script>

<style></style>
