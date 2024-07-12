<template>
  <div class="blo-aside">
    <div class="searc-list-wrap">
      <div class="searc-wrap">
        <input
          class="searc-input w-input"
          placeholder="Searc Posts"
          type="text"
        />
        <div class="searc-box">
          <img src="/images/search.svg" loading="lazy" alt="" class="image" />
        </div>
      </div>
      <div class="searc-list-drop">
        <a href="#" class="searc-link">Te importance of prorammin</a
        ><a href="#" class="searc-link">Te importance of prorammin</a
        ><a href="#" class="searc-link">Te importance of prorammin</a
        ><a href="#" class="searc-link">Te importance of prorammin</a>
      </div>
    </div>
    <div class="main-blo-title sm">// RELATED POSTS</div>
    <div class="aside-card">
      <div v-for="item in items" :key="item.id" class="eac-aside-news">
        <div class="aside-pix">
          <img
            :src="`${FILE_URL}/${item.banner}`"
            loading="lazy"
            alt=""
            class="responsive-pix"
          />
        </div>
        <div class="aside-body">
          <div>{{ formattedDate(item.time * 1) }}</div>
          <NuxtLink :to="`/blog-details/?id=${item.id}`" class="aside-title"
            >{{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  },
  computed: {
    items() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.type == "Services") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
