<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Comments</div>
      <div>Sep 20th, 2024</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _20">Image</div>
          <div class="das-tb-cell _30">Username</div>
          <div class="das-tb-cell _40">Comment</div>
          <div class="das-tb-cell _20">Time</div>
        </div>
        <div class="das-tb-body">
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
          <div class="das-tb-cell _20">
            <div class="das-eader-pix">
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f80d1c1cea9efa6271a5b_testimonial-3.jpg"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
            </div>
          </div>
          <div class="das-tb-cell _30">3 * 300W Solar Panel = N400,500,</div>
          <div class="das-tb-cell _40">70,500</div>
          <div class="das-tb-cell _20">70,500</div>
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
          <div class="das-tb-cell _40">3 * 300W Solar Panel = N400,500,</div>
          <div class="das-tb-cell _20">70,500</div>
          <div class="das-tb-cell _20 quant">
            <div class="das-foot-pa quant">-</div>
            <div class="tb-quant">100</div>
            <div class="das-foot-pa quant">+</div>
          </div>
        </div>
        <div class="das-tb-body">
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
          <div class="das-tb-cell _40">3 * 300W Solar Panel = N400,500,</div>
          <div class="das-tb-cell _20">70,500</div>
          <div class="das-tb-cell _20 quant">
            <div class="das-foot-pa quant">-</div>
            <div class="tb-quant">100</div>
            <div class="das-foot-pa quant">+</div>
          </div>
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
        <div class="das-foot-pa">...</div>
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
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b486dcc7eddebcb1b7c96_trash-alt.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      limit: 10,
      currentPage: 1,
      sort: "-time",
    };
  },
  methods: {
    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

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

    paginate(int) {
      this.currentPage = int;
      this.getActiveDeposits();
    },

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    formatDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      const year = today.getFullYear();

      // Function to add ordinal suffix to the day
      const addOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return day + "th";
        } else {
          switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "th";
          }
        }
      };

      const formattedDate = `${addOrdinalSuffix(day)} ${month}, ${year}`;
      return formattedDate;
    },

    async getActiveDeposits() {
      this.$store.dispatch(
        "admin/getActiveDeposits",
        `/transactions/active-deposits/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },

  mounted() {
    this.getActiveDeposits();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    isSuccess() {
      return this.$store.state.admin.isModalSuccess;
    },

    isWarning() {
      return this.$store.state.admin.isModalWarning;
    },

    isError() {
      return this.$store.state.admin.isModalError;
    },

    totalLength() {
      return this.$store.state.admin.activeDepositLength;
    },

    activeDeposits() {
      return this.$store.state.admin.activeDeposits;
    },

    url() {
      return this.$store.state.admin.modalURL;
    },

    responseMsg() {
      return this.$store.state.admin.modalMsg;
    },

    showModal() {
      return this.$store.state.admin.showModal;
    },
  },
};
</script>

<style></style>
