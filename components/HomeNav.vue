<template>
  <div class="top-nav active">
    <div class="custom-container">
      <div class="top-nav-flex">
        <NuxtLink to="/" class="brand w-inline-block"
          ><img
            src="/LogoDark.png"
            loading="lazy"
            sizes="200px"
            srcset="/LogoDark.png 500w, /LogoDark.png 800w, /LogoDark.png 1022w"
            alt=""
        /></NuxtLink>
        <div class="menu active" @click="setNav">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6658a6d585dea04358ccaeb2_bars.svg"
            loading="lazy"
            alt=""
            class="menu-icon"
          />
        </div>
        <div class="nav-flex" :class="{ active: isNavActive }">
          <NuxtLink
            to="/"
            class="nav-links"
            :class="{ active: route == 'index' }"
            >Home</NuxtLink
          ><NuxtLink
            to="/about"
            class="nav-links"
            :class="{ active: route == 'about' }"
            >About</NuxtLink
          >

          <NuxtLink
            :class="{ active: route == 'products' }"
            to="/products"
            class="nav-links"
            >Shop</NuxtLink
          ><NuxtLink
            to="/contact"
            :class="{ active: route == 'contact' }"
            class="nav-links"
            >Contact</NuxtLink
          ><NuxtLink
            to="/faq"
            :class="{ active: route == 'faq' }"
            class="nav-links"
            >FAQ</NuxtLink
          ><NuxtLink
            to="/blog"
            :class="{ active: route == 'blog' }"
            class="nav-links"
            >Blog</NuxtLink
          >

          <div v-show="isAuthenticated" class="nav-links auto">
            <span @click="logout" class="nav-links black staff">Logout</span>
            <span @click="redirect" class="nav-links red staff">Dashboard</span>
          </div>

          <span v-show="!isAuthenticated" class="nav-links auto">
            <NuxtLink to="/login" class="nav-links black staff">Login</NuxtLink>
            <NuxtLink to="/signup" class="nav-links staff">Signup</NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ideNav: false,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },

    redirect() {
      if (this.user.status == "Staff") {
        this.$router.push("/admin");
      } else {
        this.$router.push("/customer");
      }
    },

    setNav() {
      this.$store.commit("toggleNav");
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    isNavActive() {
      return this.$store.state.isNavActive;
    },

    route() {
      return this.$store.state.route;
    },

    company() {
      return this.$store.state.company;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
