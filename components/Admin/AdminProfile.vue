<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Profile</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="profile-wrap">
      <div class="profile-left">
        <div class="profile-pix">
          <div v-if="!user.image">
            {{ user.username.charAt(0).toUpperCase() }}
          </div>
          <img
            v-else
            :src="`${FILE_URL}/${user.image}`"
            loading="lazy"
            alt=""
            class="responsive-pix"
          />
        </div>
        <label for="image" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/66605c571255a4e63fb9cb4f_upload.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon"
          /><input
            class="hide w-input"
            type="file"
            id="image"
            @change="setPicture"
          />
          <div class="tb-action-text">Upload Image</div>
        </label>
      </div>
      <div class="profile-rit">
        <div
          id="w-node-_63a32388-2899-bff8-cb3c-f8ca7058f854-1905ac1a"
          class="eac-form-input pro"
        >
          <div class="from-rid-label">Username</div>
          <input
            class="from-rid-input w-input"
            :placeholder="user.username"
            type="text"
          />
        </div>
        <div
          id="w-node-_2c03cd5b-da46-292e-f182-2c99faca5afe-1905ac1a"
          class="eac-form-input pro"
        >
          <div class="from-rid-label">Email</div>
          <input
            class="from-rid-input w-input"
            :placeholder="user.email"
            type="text"
          />
        </div>
        <div
          id="w-node-_11f06c1c-77a6-3de7-6f3a-e3ff2a3ac930-1905ac1a"
          class="eac-form-input pro"
        >
          <div class="from-rid-label">Phone Number</div>
          <input
            class="from-rid-input w-input"
            :placeholder="user.phone"
            type="text"
          />
        </div>
        <!-- <div class="form-btn-roups">
            <div class="overlay-btn pad">
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
                loading="lazy"
                alt=""
                class="form-btn-icon"
              /><input
                class="hide w-input"
                maxlength="256"
                name="field-3"
                data-name="Field 3"
                placeholder="27/10/2024"
                type="text"
                id="field-3"
                required=""
              />
              <div class="tb-action-text">Processing...</div>
            </div>
            <div class="overlay-btn pad">Submit</div>
          </div>-->
        <div v-if="showResponse" class="das-response error">
          {{ response }}
        </div>
      </div>
    </div>

    <admin-set-password />
  </div>
</template>

<script>
import AdminSetPassword from "./AdminSetPassword.vue";
export default {
  components: { AdminSetPassword },

  data() {
    return {
      response: "",
      showResponse: "",
    };
  },

  methods: {
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

    formatDate(time = new Date().getTime()) {
      const today = new Date(time);
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

    formatTimeToAMPM(time = new Date().getTime()) {
      if (typeof time !== "number") {
        return "Invalid timestamp";
      }

      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
    },

    showAlert(msg, status) {
      this.$store.commit("SHOW_ALERT_BOX", { msg, status });
    },

    callResponse(msg, state) {
      this.response = msg;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    async setPicture(e) {
      const form = new FormData();

      form.append("image", e.target.files[0]);
      this.onRequest = true;

      const payload = {
        form: form,
        url: `/users/?id=${this.user.id}`,
      };

      const result = await this.$store.dispatch("MAKE_POST", payload);
      this.handleResponse(result);
    },

    handleResponse(result) {
      console.log(result, result.response);
      if (!result.response) {
        this.onRequest = false;
        this.$store.commit("UPDATE_ME", result.data.data);
      } else {
        this.callResponse(result.response.data.message, true);
      }
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    currencies() {
      return this.$store.state.admin.currencies;
    },

    users() {
      return this.$store.state.admin.users;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
