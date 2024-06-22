<template>
  <admin-profile />
</template>

<script>
import AdminProfile from "../../components/Admin/AdminProfile.vue";
export default {
  components: { AdminProfile },
  layout: "admin",

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

    // checkResponse(result, msg, status) {
    //   this.onRequest = false;
    //   if (result.status == 200) {
    //   } else {
    //     this.callResponse(result.response.data.message, true);
    //   }
    // },

    async setPicture(e) {
      const form = new FormData();

      form.append("image", e.target.files[0]);

      const payload = {
        form: form,
        url: `/users/?id=${this.user.id}`,
      };
      const result = await this.$store.dispatch("MAKE_POST", payload);

      this.onRequest = true;
      if (result) {
        this.handleResponse(result);
      }
    },

    handleResponse(result) {
      // console.log(result, result.response);
      if (!result.response) {
        this.onRequest = false;
        this.$store.commit("UPDATE_ME", result.data);
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
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>

<style></style>
