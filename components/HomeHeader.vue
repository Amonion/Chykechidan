<template>
  <div class="top-hearder">
    <div class="custom-container">
      <div class="top-header-flex">
        <div class="top-hearder-left">
          <img
            src="/images/support.svg"
            loading="lazy"
            alt=""
            class="top-chat"
          />
          <div>FOR INQUIRIES CALL:</div>
          <span v-if="company" class="top-book">{{
            company.companyPhone
          }}</span>
        </div>
        <div class="top-hearder-right">
          <NuxtLink to="/products" class="top-link-blocks ide w-inline-block"
            ><img
              src="/images/package.svg"
              loading="lazy"
              alt=""
              class="top-link-icon"
            />
            <div>PRODUCTS</div></NuxtLink
          >

          <div class="socials">
            <a href="#" class="top-socials w-inline-block"
              ><img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6626854bb0fed7c96ee86af9_youtube%201.svg"
                loading="lazy"
                alt="" /></a
            ><a href="#" class="top-socials w-inline-block"
              ><img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c11455071692d4dc6e_black-instagram-icon%201.svg"
                loading="lazy"
                alt="" /></a
            ><a href="#" class="top-socials w-inline-block"
              ><img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c1c479070080d0388d_x-social-media-logo-icon%201.svg"
                loading="lazy"
                alt="" /></a
            ><a href="#" class="top-socials w-inline-block"
              ><img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c168d98f8cc52fcd76_facebook-app-round-icon%201.svg"
                loading="lazy"
                alt=""
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    company() {
      return this.$store.state.company;
    },

    blogs() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.category == "Blog") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    plan() {
      const items = this.$store.state.plans;

      return items[0];
    },

    topBlogs() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.category == "TopBlog") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    services() {
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

    currencies() {
      return this.$store.state.currencies;
    },
  },
};
</script>

<style></style>
()
