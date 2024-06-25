<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Notifications</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div v-for="item in items" :key="item.id" class="eac-notification-wrap">
      <img src="/Icon.png" loading="lazy" alt="" class="note-loo" />
      <div class="note-content">
        <div class="note-title">{{ item.title }}</div>
        <div v-html="item.content"></div>
        <div class="note-date">{{ formattedDate(item.time) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "customer",

  data() {
    return {
      sort: "time",
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
    // this.updateNotifications();
  },

  computed: {
    items() {
      return this.$store.state.notifications;
    },

    total() {
      return this.$store.state.admin.notificationLength;
    },
  },
};
</script>

<style></style>
