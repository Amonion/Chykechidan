<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Notifications</div>
      <div>Sep 20th, 2024</div>
    </div>
    <div class="eac-notification-wrap">
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6625e255b4177e1ab26257de_Iron.png"
        loading="lazy"
        alt=""
        class="note-loo"
      />
      <div class="note-content">
        <div class="note-title">Welcome to Iron Heights Engineering</div>
        <div>
          Explore our meticulously crafted Educational Dashboard design for a
          holistic learning experience. Monitor your engagement, achievements,
          statistics, daily schedule
        </div>
        <div class="note-date">Sep 20, 2024</div>
      </div>
    </div>
    <div class="eac-notification-wrap">
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6625e255b4177e1ab26257de_Iron.png"
        loading="lazy"
        alt=""
        class="note-loo"
      />
      <div class="note-content">
        <div class="note-title">Welcome to Iron Heights Engineering</div>
        <div>
          Explore our meticulously crafted Educational Dashboard design for a
          holistic learning experience. Monitor your engagement, achievements,
          statistics, daily schedule
        </div>
        <div class="note-date">Sep 20, 2024</div>
      </div>
    </div>
    <div class="eac-notification-wrap">
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6625e255b4177e1ab26257de_Iron.png"
        loading="lazy"
        alt=""
        class="note-loo"
      />
      <div class="note-content">
        <div class="note-title">Welcome to Iron Heights Engineering</div>
        <div>
          Explore our meticulously crafted Educational Dashboard design for a
          holistic learning experience. Monitor your engagement, achievements,
          statistics, daily schedule
        </div>
        <div class="note-date">Sep 20, 2024</div>
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
      limit: 10,
      currentPage: 1,
      sort: "-time",
    };
  },

  methods: {
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

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    prepareDeleteId(id) {
      const payload = {
        msg: `Are you sure you want to delete this notification?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "manager",
        action: "delete",
        url: `/notifications/?id=${id}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    paginate(int) {
      this.currentPage = int;
      this.getNotifications();
    },

    toggleSelectAllItems() {
      this.$store.commit(`admin/toggleSelectAllItems`, "notification-settings");
    },

    showModal(msg, warning, error, success, action, url, item) {
      const payload = {
        msg: msg,
        isWarning: warning,
        isError: error,
        isSuccess: success,
        action: action,
        url: url,
        item: this.selectedItems,
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getNotifications();
    },

    handleCheckedItems(item, selectedItems, items, type) {
      this.$store.commit("admin/handleCheckedItems", {
        item,
        selectedItems,
        items,
        type,
      });
    },

    prepareDelete() {
      if (this.selectedItems.length == 0) {
        this.showModal(
          `Please select at least one notification`,
          false,
          true,
          false,
          "",
          "",
          ""
        );
        return;
      }

      const url = `/notifications/mass-delete/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      this.showModal(
        `Are you sure you want to delete these notifications?`,
        true,
        false,
        false,
        "mass-delete",
        url,
        this.selectedItems
      );
    },

    async updateNotifications() {
      const result = await this.$store.dispatch(
        "admin/getNotificationState",
        `/notifications/update/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async getNotifications() {
      await this.$store.dispatch(
        "admin/getNotifications",
        `/notifications/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },

  mounted() {
    this.updateNotifications();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    notifications() {
      return this.$store.state.admin.notifications;
    },

    selectedItems() {
      return this.$store.state.admin.selectedNotifications;
    },

    totalLength() {
      return this.$store.state.admin.notificationLength;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllNotificationSelected;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>

<style></style>
