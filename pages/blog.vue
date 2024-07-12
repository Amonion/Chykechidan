<template>
  <div>
    <div class="hero">
      <img
        src="/images/banner2.jpeg"
        loading="lazy"
        sizes="100vw"
        srcset="
          /images/banner2.jpeg  500w,
          /images/banner2.jpeg  800w,
          /images/banner2.jpeg 1080w,
          /images/banner2.jpeg 1600w,
          /images/banner2.jpeg 1920w
        "
        alt=""
        class="responsive-pix"
      />
      <div class="ero-cover"></div>
      <div class="custom-container">
        <div class="custom-flex ero">
          <div class="ero-title">BLOG POSTS</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            Blog]
          </div>
        </div>
      </div>
    </div>

    <div class="maintenance">
      <div class="custom-container">
        <div class="w-form">
          <div class="mentainance-flex product">
            <div class="blo-main-col">
              <div v-for="item in items" :key="item.id" class="eac-main-blo">
                <div class="blo-date">{{ formattedDate(item.time * 1) }}</div>
                <div class="ome-blo-details">
                  <!-- <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                    loading="lazy"
                    alt=""
                    class="ome-blo-icon"
                  />
                  <div class="blo-det-text">3 days ago</div> -->
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                    loading="lazy"
                    alt=""
                    class="ome-blo-icon"
                  />
                  <div class="blo-det-text">{{ item.author }}</div>
                </div>
                <NuxtLink
                  :to="`/blog-details/?id=${item.id}`"
                  class="main-blo-title"
                  >{{ item.title }}</NuxtLink
                >
                <div
                  class="blo-brief"
                  v-html="truncateText(item.content, 200)"
                ></div>
                <div class="blo-im">
                  <img
                    :src="`${FILE_URL}/${item.banner}`"
                    loading="lazy"
                    sizes="(max-width: 479px) 90vw, (max-width: 767px) 89vw, (max-width: 1279px) 53vw, 654.4000244140625px"
                    :srcset="`${FILE_URL}/${item.banner} 500w,
                      ${FILE_URL}/${item.banner} 710w`"
                    alt=""
                    class="responsive-pix"
                  />
                </div>
                <NuxtLink
                  :to="`/blog-details/?id=${item.id}`"
                  class="blo-read active"
                  >READ MORE</NuxtLink
                >
              </div>

              <div class="product-painate">
                <div
                  v-if="currentPage > 1"
                  class="product-pa-item"
                  @click="paginate(currentPage - 1)"
                >
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b4f324c69c44d55719f02_chevron0.svg"
                    loading="lazy"
                    alt=""
                    class="pae-arrow"
                  />
                </div>
                <div
                  v-for="(item, int) in pages()"
                  @click="paginate(int + 1)"
                  :key="int"
                  class="product-pa-item"
                >
                  {{ int + 1 }}
                </div>

                <div
                  @click="paginate(currentPage + 1)"
                  v-if="currentPage < pages().length"
                  class="product-pa-item"
                >
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627da8bbae46715d6890829_arrow-forward-reen.svg"
                    loading="lazy"
                    alt=""
                    class="pae-arrow"
                  />
                </div>
              </div>
            </div>
            <aside-news />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AsideNews from "../components/AsideNews.vue";
export default {
  components: { AsideNews },
  layout: "home",
  data() {
    return {
      currentPage: 1,
      limit: 10,
      sort: "-time",
      totalLength: 0,
    };
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "[...]";
      }
      return text;
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

    pages(length, limit) {
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

    paginate(int) {
      this.currentPage = int;
      this.getBlog();
    },
  },

  computed: {
    items() {
      const items = this.$store.state.blogs;
      this.totalLength = items.length;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.type.includes("Blog")) {
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
