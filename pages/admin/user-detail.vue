<template>
  <div v-if="user" class="das-main-body">
    <div class="das-body-eader">
      <div>{{ user.username }} Profile</div>
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
            :placeholder="user.Email"
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

    <admin-user-transactions />
  </div>
</template>
<script>
import AdminUserTransactions from "../../components/Admin/AdminUserTransactions.vue";
export default {
  components: { AdminUserTransactions },
  layout: "admin",

  data() {
    return {
      user: "",
      sort: "-ordered_time",
      limit: 10,
      currentPage: 1,
      transactions: [],
      resultLength: 0,

      pages: function () {
        let array = [];
        let x = Math.ceil(this.resultLength / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },
    };
  },

  methods: {
    showAlert(msg, status) {
      this.$store.commit("SHOW_ALERT_BOX", { msg, status });
    },

    formatNumber(number) {
      if (!number) {
        return "0.00";
      }
      const options = { style: "decimal", maximumFractionDigits: 0 };
      return number.toLocaleString("en-US", options);
    },

    formartTime(data) {
      if (!data) {
        return "0:0";
      }
      const date = new Date(data);
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
      const date = new Date(data);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();

      return `${getOrdinalSuffix(day)} ${month}. ${year}`;
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

    async getUserTransactions() {
      const result = await this.$store.dispatch(
        "MAKE_GET",
        `/transactions/?username=${this.user.username}&sort=${this.sort}`
      );
      this.transactions = result.data.data;
      this.resultLength = result.data.totalLength;
    },
  },

  async mounted() {
    const id = this.$route.query.id;
    const exists = this.users.some((obj) => obj.id == id);

    if (exists) {
      for (let i = 0; i < this.users.length; i++) {
        const el = this.users[i];
        if (el.id == id) {
          this.user = el;
          this.getUserTransactions();
        }
      }
    } else {
      const result = await this.$store.dispatch("MAKE_GET", `/users/?id=${id}`);
      this.user = result.data;
      this.getUserTransactions();
    }
  },

  computed: {
    users() {
      return this.$store.state.admin.users;
    },

    stateArray() {
      return this.$store.state.stateArray;
    },

    lgaArray() {
      return this.$store.state.lgas;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>
