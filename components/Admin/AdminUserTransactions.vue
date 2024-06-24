<template>
  <div>
    <div class="tb-top-info">
      <div class="tb-info pass">Sold: N466,400,000</div>
      <div class="tb-info fail">Purchased: N130,000,000</div>
      <div class="tb-info pass">Profits: N130,000,000</div>
      <div class="das-select">
        <div class="das-drop-ead top">
          <div>All Transaction</div>
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b42b9cdc93e201b85bd05_chevron11.svg"
            loading="lazy"
            alt=""
            class="drop-icon"
          />
        </div>
        <div class="das-drop-list">
          <div class="drop-items">Welcome Email</div>
          <div class="drop-items">Seasonal Users Email</div>
          <div class="drop-items">Send</div>
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
          class="das-tb-body"
          :class="{ even: int % 2 == 0 }"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
          </div>
          <div class="das-tb-cell _20 link">
            <a href="#" class="istory-name">Kennedy</a
            ><a href="#" class="istory-name staff">Kennedy</a>
          </div>
          <div class="das-tb-cell _40">
            3 * 300W Solar Panel = N400,500,<br />4 * Solar Inverter Batteries =
            N100,200
          </div>
          <div class="das-tb-cell _20">70,500</div>
          <div class="das-tb-cell _20">12:34<br />2nd Jun, 2024</div>
        </div>
        <div class="das-tb-body even">
          <div class="das-tb-cell">
            <div>1</div>
            <div class="das-tb-ceck active">
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
                loading="lazy"
                alt=""
                class="das-tb-icon active"
              />
            </div>
          </div>
          <a href="#" class="das-tb-cell _20 link">Kennedy</a>
          <div class="das-tb-cell _40">
            3 * 300W Solar Panel ,<br />4 * Solar Inverter Batteries
          </div>
          <div class="das-tb-cell _20">70,500</div>
          <div class="das-tb-cell _20">12:34<br />2nd Jun, 2024</div>
        </div>
        <div class="das-tb-body dam">
          <div class="das-tb-cell">
            <div>1</div>
            <div class="das-tb-ceck active">
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
                loading="lazy"
                alt=""
                class="das-tb-icon active"
              />
            </div>
          </div>
          <a href="#" class="das-tb-cell _20 link">Kennedy</a>
          <div class="das-tb-cell _40">
            3 * 300W Solar Panel ,<br />4 * Solar Inverter Batteries
          </div>
          <div class="das-tb-cell _20">70,500</div>
          <div class="das-tb-cell _20">12:34<br />2nd Jun, 2024</div>
        </div>
        <div class="das-tb-body sell even">
          <div class="das-tb-cell">
            <div>1</div>
            <div class="das-tb-ceck active">
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
                loading="lazy"
                alt=""
                class="das-tb-icon active"
              />
            </div>
          </div>
          <a href="#" class="das-tb-cell _20 link">Kennedy</a>
          <div class="das-tb-cell _40">
            3 * 300W Solar Panel ,<br />4 * Solar Inverter Batteries
          </div>
          <div class="das-tb-cell _20">70,500</div>
          <div class="das-tb-cell _20">12:34<br />2nd Jun, 2024</div>
        </div>
      </div>
    </div>

    <div class="das-tb-info">
      <div>20 of 210</div>
      <div class="das-paination">
        <div class="das-pa-next">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b4f324c69c44d55719f02_chevron0.svg"
            loading="lazy"
            alt=""
            class="das-paination-icon"
          />
        </div>
        <div class="das-foot-pa active">1</div>
        <div class="das-foot-pa">2</div>
        <div class="das-foot-pa">3</div>
        <div class="das-pa-next">
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
      transactions: [],
      totalLength: 0,
      limit: 10,
      currentPage: 1,
      sort: "-time",
      pages: [],
    };
  },

  methods: {
    formatNumberToDate(inputNumber) {
      if (typeof inputNumber !== "number") {
        return "Not Available";
      }

      const date = new Date(inputNumber);

      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    async getTransactions() {
      const result = await this.$store.dispatch(
        "admin/makeGET",
        `/transactions/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&username=${this.$route.query.username}`
      );
      this.transactions = result.data.data;
      this.totalLength = result.data.totalLength;
    },

    paginate(int) {
      this.currentPage = int;
      this.getTransactions();
    },

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    async processData() {
      const form = {
        wallets: this.wallets,
        user: this.user,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      this.onRequest = true;

      const payload = {
        form: form,
        url: `/users/update-user/?id=${this.user.id}`,
      };

      const result = await this.$store.dispatch("admin/makePOST", payload);

      if (result) {
        this.onRequest = false;
      }
      const payload1 = {
        msg: result.data.message,
        isWarning: false,
        isError: result.data.error,
        isSuccess: !result.data.error,
        table: "",
        action: "",
        url: ``,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload1);

      if (!result.data.error) {
        this.$store.dispatch(`admin/initializeAdminDetails`);
      }
    },
  },

  async mounted() {
    this.getTransactions();
  },

  computed: {
    isUserAvailable() {
      return storeState.user.length > 0;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>
