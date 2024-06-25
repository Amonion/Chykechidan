<template>
  <div
    class="das-nav-wrapper"
    :class="{ active: showNav }"
    @click.self="toggleNav"
  >
    <div class="das-nav">
      <img
        src="/images/admin/menu.svg"
        loading="lazy"
        alt=""
        class="das-menu-close"
        @click="toggleNav"
      />
      <div class="das-menu-flex">
        <NuxtLink to="/" class="das-brand w-inline-block"
          ><img src="/Logo.png" loading="lazy" alt="" /></NuxtLink
        ><img
          src="/images/admin/menu.svg"
          loading="lazy"
          alt=""
          class="das-menu"
        />
      </div>
      <NuxtLink
        to="/customer/profile"
        class="das-nav-items w-inline-block"
        :class="{ active: route == 'customer-profile' }"
        ><img
          src="/images/admin/user.svg"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Profile</div></NuxtLink
      >

      <NuxtLink
        to="/customer/notifications"
        :class="{ active: route == 'customer-notifications' }"
        class="das-nav-items w-inline-block"
        ><img
          src="/images/admin/bell.svg"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Notifications</div></NuxtLink
      ><NuxtLink
        to="/customer/comments"
        :class="{ active: route == 'customer-comments' }"
        class="das-nav-items w-inline-block"
        ><img
          src="/images/admin/comment.svg"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Comments</div></NuxtLink
      ><NuxtLink
        to="/customer/transactions"
        :class="{ active: route == 'customer-transactions' }"
        class="das-nav-items w-inline-block"
        ><img
          src="/images/admin/invoice.png"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Transactions</div></NuxtLink
      >

      <div @click="logout" class="das-nav-items">
        <img
          src="/images/admin/logout.svg"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Logout</div>
      </div>
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

    user() {
      return this.$store.getters.getUserInfo;
    },
  },
};
</script>

<style></style>
