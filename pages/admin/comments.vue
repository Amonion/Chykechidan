<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Comments</div>
      <div>{{ formattedDate() }}</div>
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
        <div
          v-for="(item, int) in items"
          :key="item.id"
          :class="{
            even: int % 2 == 0,
            fail: item.status == 0,
          }"
          class="das-tb-body"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
            <div
              :class="{ active: item.checked }"
              class="das-tb-ceck"
              @click="selectComment(int)"
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
            <div class="das-eader-pix">
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f80d1c1cea9efa6271a5b_testimonial-3.jpg"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
            </div>
          </div>
          <div class="das-tb-cell _30">{{ item.username }}</div>
          <div class="das-tb-cell _40">{{ item.content }}</div>
          <div class="das-tb-cell _20">
            <div>
              {{ formatDateToTime(item.time) }} <br />
              {{ formattedDate(item.time) }}
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
      <div @click="approveComment" class="tb-action-text">Toggle Comment</div>

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
    pages() {
      const num = Math.ceil(this.total / this.limit);
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

    async approveComment() {
      if (this.selectedComments.length == 0) {
        this.showOverlayResponse(
          "Select at least one comment to update",
          true,
          false,
          false,
          true
        );
        return;
      }

      const payload = {
        form: JSON.parse(JSON.stringify(this.selectedComments)),
        url: `/comments/toggle-status/?&limit=${this.limit}&page=${this.currentPage}`,
      };
      const result = await this.$store.dispatch(`MAKE_POST`, payload);

      if (!result.response) {
        this.$store.commit(`admin/SET_COMMENTS`, result.data);
      } else {
        console.log(result.response);
      }
    },

    selectComment(int) {
      this.$store.commit("admin/TOGGLE_COMMENT", int);
    },

    async getActiveDeposits() {
      this.$store.dispatch(
        "admin/getActiveDeposits",
        `/transactions/active-deposits/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    total() {
      return this.$store.state.admin.commentLength;
    },

    items() {
      return this.$store.state.admin.comments;
    },

    selectedComments() {
      return this.$store.state.admin.selectedComments;
    },
  },
};
</script>

<style></style>
