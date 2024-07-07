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
          :class="{ even: int % 2 == 0 }"
          class="das-tb-body"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
            <div
              :class="{ active: item.checked }"
              class="das-tb-ceck"
              @click="toggleComment(int)"
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
                :src="`${FILE_URL}/${item.image}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
            </div>
          </div>
          <div class="das-tb-cell _30">{{ item.username }}</div>
          <div class="das-tb-cell _40">{{ item.content }}</div>
          <div class="das-tb-cell _20">
            {{ formatNumberToDate(item.time * 1) }}
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
        @click="editComment(selectedItems[selectedItems.length - 1])"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b486dcc7eddebcb1b7c96_trash-alt.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
      />
    </div>

    <div class="das-form">
      <div class="eac-form-input">
        <div class="from-rid-label">Comment</div>
        <textarea
          placeholder="Enter Comment"
          v-model="content"
          class="from-rid-input w-input"
        ></textarea>
      </div>
      <div v-if="showResponse" class="das-response" :class="{ error: isError }">
        {{ response }}
      </div>

      <div class="form-btn-roups">
        <div v-if="onRequest" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon spinner"
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
  layout: "customer",

  data() {
    return {
      limit: 10,
      currentPage: 1,
      sort: "-time",
      content: "",

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,

      editingState: false,
      editId: "",
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

    toggleComment(int) {
      this.$store.commit("TOGGLE_COMMENT", int);
    },

    clearInputs() {
      this.editId = "";
      this.editingState = false;
      this.content = "";
    },

    editComment(data) {
      if (data.length == 0) {
        this.showOverlayResponse(
          "Please select comment to proceed",
          true,
          false,
          false,
          true
        );

        return;
      }

      const load = JSON.parse(JSON.stringify(data));
      this.editId = load.id;
      this.editingState = true;
      this.content = load.content;
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

    async processData() {
      if (this.content.trim().length < 30) {
        this.showOverlayResponse(
          "Sorry, comment must be at least 20 characters",
          true,
          false,
          false,
          true
        );

        return;
      }

      const commentData = {
        content: this.content,
        username: this.user.username,
        image: this.user.image,
        time: new Date().getTime(),
      };

      const payload = {
        form: commentData,
        url: this.editingState
          ? `/comments/?id=${this.editId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&username=${this.user.username}`
          : `/comments/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&username=${this.user.username}`,
      };

      this.onRequest = true;

      const result = await this.$store.dispatch("MAKE_POST", payload);
      this.handleResponse(result);
    },

    handleResponse(result) {
      if (!result.response) {
        this.$store.commit("SET_COMMENTS", result.data);
        this.onRequest = false;
        this.clearInputs();
        this.showOverlayResponse(
          "The comment operation was successful",
          false,
          true,
          false,
          true
        );
      } else {
        console.log(result.response);
        this.onRequest = false;
      }
    },
  },

  mounted() {
    // this.$store.dispatch(
    //   "GET_COMMENTS",
    //   `/comments/?username=${this.user.username}&limit=10&page=1`
    // );
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },

    total() {
      return this.$store.state.commentLength;
    },

    items() {
      return this.$store.state.comments;
    },

    selectedItems() {
      return this.$store.state.selectedComments;
    },
  },
};
</script>

<style></style>
