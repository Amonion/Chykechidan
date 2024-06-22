<template>
  <div class="das-eader">
    <img
      src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6658a6d585dea04358ccaeb2_bars.svg"
      loading="lazy"
      alt=""
      class="das-menu-icon"
      @click="toggleNav"
    />
    <div class="das-welcome">
      Welcome Back <span class="das-eader-name">{{ user.username }}</span>
    </div>
    <div class="das-eader-icons">
      <NuxtLink to="/admin/profile" class="das-icons-top w-inline-block"
        ><img
          src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665a67f7c1d02e9b4048dc16_user-alt1.svg"
          loading="lazy"
          alt="" /></NuxtLink
      ><NuxtLink to="/admin/notifications" class="das-icons-top w-inline-block"
        ><div class="note-dot"></div>
        <img
          src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665a7063f4a83c5f2b820dee_bell.svg"
          loading="lazy"
          alt="" /></NuxtLink
      ><span @click="logout" class="das-icons-top w-inline-block"
        ><img
          src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665a691d17cce5d22e426dc9_loout.svg"
          loading="lazy"
          alt=""
      /></span>
    </div>
    <div class="das-eader-pix">
      <img
        :src="`${FILE_URL}/${user.image}`"
        loading="lazy"
        alt=""
        class="responsive-pix"
        v-if="user.image"
      />
      <div v-else>{{ user.username.charAt(0).toUpperCase() }}</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleNav() {
      this.$store.commit("admin/TOGGLE_NAV");
    },

    hideNav() {
      this.$store.commit("admin/HIDE_NAV");
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },

    hideNav() {
      this.$store.commit("HIDE_NAV");
    },
  },

  computed: {
    showNav() {
      return this.$store.state.admin.showAdminNav;
    },

    route() {
      return this.$route.name;
    },

    activityState() {
      return this.$store.state.admin.activityState;
    },
    pageState() {
      return this.$store.state.admin.pageState;
    },
    settingsState() {
      return this.$store.state.admin.settingsState;
    },

    cartProperties() {
      return this.$store.state.productStore.purchaseProperties;
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },

    expandNav() {
      return this.$store.state.expandNav;
    },
    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
    user() {
      return this.$store.getters.getUserInfo;
    },
  },
};
</script>

<style></style>
