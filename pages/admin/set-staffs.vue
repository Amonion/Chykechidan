<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Staffs</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _20">Image</div>
          <div class="das-tb-cell _20">Username</div>
          <div class="das-tb-cell _20">Phone</div>
          <div class="das-tb-cell">Position</div>
          <!-- <div class="das-tb-cell _20">Date</div> -->
        </div>
        <div
          v-for="(item, int) in items"
          :key="item.id"
          class="das-tb-body"
          :class="{ even: int % 2 == 0 }"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
            <div
              :class="{ active: item.checked }"
              class="das-tb-ceck"
              @click="toggleUser(int)"
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
            <div class="profile-pix sm">
              <div v-if="!item.image">
                {{ item.username.charAt(0).toUpperCase() }}
              </div>
              <img
                v-else
                :src="`${FILE_URL}/${item.image}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
            </div>
          </div>

          <NuxtLink
            :to="`/admin/user-detail/?id=${item.id}&username=${item.username}`"
            class="das-tb-cell _20 link"
            >{{ item.username }}</NuxtLink
          >
          <div class="das-tb-cell _20">{{ item.phone }}</div>
          <div class="das-tb-cell">
            {{ item.position }}
          </div>
          <!-- <div class="das-tb-cell _20">
            {{ formatDateToTime(item.time * 1000) }} <br />
            {{ formatNumberToDate(item.time * 1000) }}
          </div> -->
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
      <div class="das-tb-cell all">
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
      <div class="send-email-wrap">
        <div class="das-select">
          <div class="das-drop-ead">
            <div>Select Email</div>
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
        <div class="tb-action-text">Send</div>
      </div>
      <div class="send-email-wrap">
        <div class="das-select">
          <div @click="showPositions = !showPositions" class="das-drop-ead">
            <div>{{ selectedPosition }}</div>
            <img
              src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b42b9cdc93e201b85bd05_chevron11.svg"
              loading="lazy"
              alt=""
              class="drop-icon"
            />
          </div>
          <div class="das-drop-list" :class="{ active: showPositions }">
            <div
              v-for="item in positions"
              :key="item"
              @click="selectPosition(item)"
              class="drop-items"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div @click="makeStaff" class="tb-action-text">Make User</div>
      </div>
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b486d0ffa805b48773e0d_times-circle.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon auto"
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
      newLimit: 5,
      sort: "-dateCreated",
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

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,

      showEmails: false,
      selectedEmail: "",
      selectedEmailName: "Select Email",

      positions: ["Admin", "Secretary", "Sales Person"],
      selectedPosition: "Select Position",
      showPositions: false,
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

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
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

    sortResult() {
      this.sort = this.sort == "-dateCreated" ? "dateCreated" : "-dateCreated";
      this.getUsers();
    },

    paginate(page) {
      this.currentPage = page;
      this.getUsers();
    },

    toggleUser(int) {
      this.$store.commit("admin/TOGGLE_USER", int);
    },

    toggleEmailList() {
      this.showEmails = !this.showEmails;
      this.showSMS = false;
    },

    toggleSMSList() {
      this.showSMS = !this.showSMS;
      this.showEmails = false;
    },

    selectEmail(email) {
      this.selectedEmailName = email.title;
      this.selectedEmail = email;
      this.showEmails = false;
      this.showSMS = false;
    },

    selectSMS(sms) {
      this.showSMS = false;
      this.showEmails = false;
      this.selectedSMS = sms;
      this.selectedSMSName = sms.title;
    },

    checkAll() {
      this.$store.commit("settingsStore/CHECK_ALL_USERS");
    },

    showAlertBox(msg, status) {
      this.$store.commit("admin/SHOW_ALERT_BOX", { msg, status });
    },

    startBulkDelete() {
      if (this.isAllChecked) {
        this.overlaySignal = "bulk";
        this.deleteId = "";
        this.showOverlay = true;
        this.overlayMsg = `Are you sure you want to delete the selected users?`;
      }
    },

    returnAction(response) {
      if (response.status == 200) {
        this.showAlertBox("The user was updated successfully", false);
      } else {
        this.showResponseMsg(response.response.data.message, true);
      }
    },

    selectPosition(item) {
      this.selectedPosition = item;
      this.showPositions = false;
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

    setPositions(users) {
      for (let i = 0; i < users.length; i++) {
        const el = users[i];
        el.position = "User";
      }
      return users;
    },

    async getUsers() {
      const result = await this.$store.dispatch(
        "admin/GET_USERS",
        `/users/?limit=${this.limit}&page=${this.currentPage}&userType=User&sort=${this.sort}`
      );
    },

    async sendEmail() {
      if (this.selectedUsersArray.length === 0) {
        this.showAlertBox(
          "Please select at least one user in the table to send email",
          true
        );
        return;
      }

      if (!this.selectedEmail) {
        this.showResponseMsg("Please select an Email to Continue", true);
        return;
      }
      const query = `?limit=${this.limit}&page=${this.currentPage}&status=User`;
      const form = {
        users: this.selectedUsers,
        email: this.selectedEmail,
        time: new Date().getTime(),
      };

      try {
        const result = await this.$axios.post(
          `/emails/send-email/${query}`,
          form
        );
        this.emails = result.data.data;
        this.showResponseMsg("The emails were sent successfully", false);
      } catch (err) {
        this.showResponseMsg(err.response.data, true);
      }
    },

    async sendSMS() {
      if (!this.checkSelectedUsers()) {
        return;
      }

      if (!this.selectedSMS) {
        this.showResponseMsg("Please select an SMS to Continue", true);
        return;
      }
      const form = {
        template: this.selectedSMS.template,
        users: this.selectedUsers,
      };
      try {
        const result = await this.$axios.post(`/sms/send-sms/`, form);
        this.showResponseMsg("Emails were sent successfully", false);
      } catch (err) {
        this.showResponseMsg(err.response.data.message, true);
      }
    },

    async makeStaff() {
      if (this.selectedUsersArray.length == 0) {
        this.showOverlayResponse(
          "Select at least one user to update",
          true,
          false,
          false,
          true
        );
        return;
      }

      if (this.selectedPosition == "Select Position") {
        this.showOverlayResponse(
          "Please select a position to assign the selected users",
          true,
          false,
          false,
          true
        );
        return;
      }

      const payload = {
        form: this.setPositions(
          JSON.parse(JSON.stringify(this.selectedUsersArray))
        ),
        url: `/users/toggle-status/?&limit=${this.limit}&page=${this.currentPage}&userType=User`,
      };
      const result = await this.$store.dispatch(`MAKE_POST`, payload);
      if (!result.response) {
        this.$store.commit(`admin/SET_USERS`, result.data);
      } else {
        console.log(result.response);
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
  },

  mounted() {
    if (!this.userStatus) {
      this.getUsers();
    }
    // this.getSMS();
    // this.getEmails();
    // this.$socket.on("fetchedItems", (data, cb) => {
    //   this.users = data;
    // });
  },

  computed: {
    items() {
      return this.$store.state.admin.staffs;
    },

    userStatus() {
      return this.$store.state.admin.staffStatus;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },

    selectedUsersArray() {
      return this.$store.state.admin.selectedStaffs;
    },

    total() {
      return this.$store.state.admin.staffLength;
    },

    isAllChecked() {
      return this.$store.state.settingsStore.isStaffsChecked;
    },
  },
};
</script>

<style></style>
