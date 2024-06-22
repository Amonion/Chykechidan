<template>
  <div class="aside-blog">
    <div class="aside-sticky">
      <h1 class="pricing-name blog">Services Posts</h1>
      <div v-for="item in blogs" :key="item.id" class="each-aside-post">
        <div
          class="aside-post-bg"
          :style="{ backgroundImage: `url(${FILE_URL}/${item.banner})` }"
        ></div>
        <div class="aside-content">
          <NuxtLink :to="`/blog/${item.id}`" class="aside-title">{{
            item.title
          }}</NuxtLink>
          <div class="aside-date">{{ formatDate(item.time) }}</div>
        </div>
      </div>

      <h1 class="pricing-name blog top">Tag Cloud</h1>
      <div class="tag-wrapper">
        <span v-for="item in tags" :key="item.id" class="each-tag">{{
          item.title
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    formatDateToDD(dateString) {
      const options = { day: "2-digit" };
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },

    formatDateToMon(dateString) {
      const options = { month: "short" };
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },

    formatDate(time = new Date()) {
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

    paginate(int) {
      this.currentPage = int;
      this.getBlog();
    },

    async getBlog() {
      await this.$store.dispatch(
        "getBlog",
        `/blog/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },
  computed: {
    blogs() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.category == "Services") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    tags() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.category == "Initiative") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    totalLength() {
      return this.blogs.length;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
