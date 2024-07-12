<template>
  <div>
    <div class="hero">
      <img
        v-if="item"
        :src="`${FILE_URL}/${item.banner}`"
        loading="lazy"
        sizes="100vw"
        :srcset="`
          ${FILE_URL}/${item.banner}  500w,
          ${FILE_URL}/${item.banner}  800w,
          ${FILE_URL}/${item.banner} 1080w,
          ${FILE_URL}/${item.banner} 1600w,
          ${FILE_URL}/${item.banner} 1920w`"
        alt=""
        class="responsive-pix"
      />
      <div class="ero-cover"></div>
      <div class="custom-container">
        <div class="custom-flex ero">
          <div class="ero-title" v-if="item">{{ item.title }}</div>
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
              <div class="eac-main-blo">
                <div class="blo-date">Sep 20th, 2024</div>
                <div class="ome-blo-details">
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                    loading="lazy"
                    alt=""
                    class="ome-blo-icon"
                  />
                  <div class="blo-det-text">3 days ago</div>
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                    loading="lazy"
                    alt=""
                    class="ome-blo-icon"
                  />
                  <div class="blo-det-text">Admin</div>
                </div>
                <div class="blo-im">
                  <img
                    :src="`${FILE_URL}/${item.banner}`"
                    loading="lazy"
                    sizes="(max-width: 479px) 90vw, (max-width: 767px) 89vw, (max-width: 1279px) 53vw, 654.4000244140625px"
                    :srcset="`
                      ${FILE_URL}/${item.banner} 500w,
                      ${FILE_URL}/${item.banner}       710w`"
                    alt=""
                    class="responsive-pix"
                  />
                </div>
                <div class="blo-brief full" v-html="item.content"></div>
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
      item: "",
    };
  },

  async mounted() {
    const id = this.$route.query.id;
    if (id) {
      const obj = this.items.find((el) => el.id == id);
      this.item = obj;
    } else {
      const result = await this.$store.dispatch("MAKE_GET", `/blog/?id=${id}`);
      if (result.data) {
        this.item = result.data;
      }
    }
  },

  computed: {
    items() {
      return this.$store.state.blogs;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>
