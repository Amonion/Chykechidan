<template>
  <div class="each-pending-order">
    <div class="tb-top-info no-space">
      <div class="tb-info pass">{{ order.username }}</div>
      <div class="tb-info amount sell">
        Sold: N{{ formatNumber(order.amount) }}
      </div>
      <div class="tb-info no">
        {{ formartTime(order.ordered_time) }},
        {{ formatDate(order.ordered_time) }}
      </div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _40">Products</div>
          <div class="das-tb-cell _20">Price (N)</div>
          <div class="das-tb-cell">Quantity</div>
          <div class="das-tb-cell _20">Total</div>
        </div>
        <div v-if="order.transactionType != 'Expenses'">
          <div
            v-for="(item, int) in JSON.parse(order.products)"
            :key="int"
            :class="{
              even: int % 2 == 0,
              fail: order.transactionType == 'Purchase',
              pass: order.transactionType == 'Order',
            }"
            class="das-tb-body"
          >
            <div class="das-tb-cell">
              <div>{{ int + 1 }}</div>
            </div>
            <div class="das-tb-cell _40">{{ item.name }}</div>
            <div
              class="das-tb-cell _20"
              v-if="order.transactionType == 'Order'"
            >
              N{{ formatNumber(item.sellingPrice) }}
            </div>
            <div class="das-tb-cell _20" v-else>
              N{{ formatNumber(item.buyingPrice) }}
            </div>
            <div class="das-tb-cell">{{ item.quantity }}</div>
            <div
              class="das-tb-cell _20"
              v-if="order.transactionType == 'Order'"
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
            <div class="das-tb-cell _40">{{ order.products }}</div>
            <div class="das-tb-cell _20">
              N{{ formatNumber(order.amount * 1) }}
            </div>

            <div class="das-tb-cell">1</div>
            <div class="das-tb-cell _20">
              N{{ formatNumber(1 * order.amount) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="das-tb-footer trns">
      <div class="send-email-wrap">
        <div class="trans-approve" @click="approveOrder(order)">Approve</div>
        <div class="trans-approve no" @click="cancelOrder(order)">Cancel</div>
        <div class="trans-approve staff">{{ order.seller }}</div>
        <div class="trans-approve no">{{ order.payment }}</div>
        <input
          class="rane-date trx-note w-input"
          v-model="discount"
          placeholder="Discount"
          type="number"
        />
      </div>
      <input
        class="rane-date trx-note w-input"
        v-model="description"
        placeholder="Description"
        type="text"
      />
      <div class="trans-approve pad">Save</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
  },
  data() {
    return {
      message: "",
      sort: "-ordered_time",
      field: "",
      limit: 10,
      currentPage: 1,
      description: "",
      discount: "",
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

    showConfirmBox() {
      this.$store.commit("settingsStore/SHOW_CONFIRM_BOX");
    },

    showOverlayResponse(msg, error, success, warning, show, data) {
      const load = {
        msg,
        error,
        success,
        warning,
        show,
        data,
      };

      this.$store.commit("admin/SHOW_RESPONSE", load);
    },

    approveOrder(order) {
      const load = JSON.parse(JSON.stringify(order));
      load.discount = this.discount;
      const payload = {
        id: load.id,
        type: "POST",
        load: load,
        query: `/transactions/?id=${load.id}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&status=0`,
      };

      this.showOverlayResponse(
        `Are you sure you want to approve this order by ${order.username}?`,
        false,
        false,
        true,
        true,
        payload
      );
    },

    cancelOrder(order) {
      const payload = {
        id: order.id,
        type: "DELETE",
        load: order,
        query: `/transactions/?id=${order.id}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&status=0`,
      };

      this.showOverlayResponse(
        `Are you sure you want to cancel this order by ${order.username}?`,
        false,
        false,
        true,
        true,
        payload
      );
    },
  },

  mounted() {
    this.description = JSON.parse(JSON.stringify(this.order.description));
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
