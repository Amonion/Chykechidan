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
        to="/admin/profile"
        class="das-nav-items w-inline-block"
        :class="{ active: route == 'admin-profile' }"
        ><img
          src="/images/admin/user.svg"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Profile</div></NuxtLink
      >
      <NuxtLink
        to="/admin/users"
        class="das-nav-items w-inline-block"
        :class="{ active: route == 'admin-users' }"
        ><img
          src="/images/admin/users.svg"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Users</div></NuxtLink
      ><NuxtLink
        to="/admin/notifications"
        :class="{ active: route == 'admin-notifications' }"
        class="das-nav-items w-inline-block"
        ><img
          src="/images/admin/bell.svg"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Notifications</div></NuxtLink
      ><NuxtLink
        to="/admin/comments"
        :class="{ active: route == 'admin-comments' }"
        class="das-nav-items w-inline-block"
        ><img
          src="/images/admin/comment.svg"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>Comments</div></NuxtLink
      ><NuxtLink
        to="/admin/history"
        :class="{ active: route == 'admin-history' }"
        class="das-nav-items w-inline-block"
        ><img
          src="/images/admin/invoice.png"
          loading="lazy"
          alt=""
          class="das-nav-icon"
        />
        <div>History</div></NuxtLink
      >

      <div>
        <div class="das-nav-items" @click="toggleActivities">
          <img
            src="/images/admin/activities.svg"
            loading="lazy"
            alt=""
            class="das-nav-icon"
          />
          <div class="drop-text">Activities</div>
          <span class="material-symbols-outlined ml-auto text-white">
            expand_more
          </span>
        </div>
        <div class="das-drop-nav activities" :class="{ active: activityState }">
          <NuxtLink to="/admin/orders" class="das-nav-items inner">
            <div>Pending Order</div>
          </NuxtLink>
          <NuxtLink to="/admin/sell" class="das-nav-items inner">
            <div>Sell</div>
          </NuxtLink>
          <NuxtLink to="/admin/purchase" class="das-nav-items inner"
            ><div>Purchase</div></NuxtLink
          >
          <NuxtLink to="/admin/expenses" class="das-nav-items inner"
            ><div>Expenses</div></NuxtLink
          >
          <NuxtLink to="/admin/stock" class="das-nav-items inner"
            ><div>Stock</div></NuxtLink
          >
        </div>
      </div>

      <div>
        <div class="das-nav-items" @click="togglePages">
          <img
            src="/images/admin/pages.svg"
            loading="lazy"
            alt=""
            class="das-nav-icon"
          />
          <div class="drop-text">Pages</div>
          <span class="material-symbols-outlined ml-auto text-white">
            expand_more
          </span>
        </div>
        <div class="das-drop-nav paes" :class="{ active: pageState }">
          <NuxtLink to="/admin/page-about" class="das-nav-items inner"
            ><div>About</div></NuxtLink
          >
          <NuxtLink to="/admin/page-banner" class="das-nav-items inner"
            ><div>Banner</div></NuxtLink
          >
          <NuxtLink to="/admin/page-blog" class="das-nav-items inner"
            ><div>Blog</div></NuxtLink
          >
          <NuxtLink to="/admin/page-faq" class="das-nav-items inner"
            ><div>FAQ</div></NuxtLink
          >
          <NuxtLink to="/admin/page-terms" class="das-nav-items inner"
            ><div>Terms</div></NuxtLink
          >
        </div>
      </div>

      <div>
        <div class="das-nav-items" @click="toggleSettings">
          <img
            src="/images/admin/settings.svg"
            loading="lazy"
            alt=""
            class="das-nav-icon"
          />
          <div class="drop-text">Settings</div>
          <span class="material-symbols-outlined ml-auto text-white">
            expand_more
          </span>
        </div>
        <div class="das-drop-nav set" :class="{ active: settingsState }">
          <NuxtLink to="/admin/set-product" class="das-nav-items inner"
            ><div>Products</div></NuxtLink
          >
          <NuxtLink to="/admin/set-emails" class="das-nav-items inner"
            ><div>Email</div></NuxtLink
          >
          <NuxtLink to="/admin/set-notifications" class="das-nav-items inner">
            <div>Notifications</div>
          </NuxtLink>
          <NuxtLink to="/admin/set-staffs" class="das-nav-items inner"
            ><div>Staffs</div></NuxtLink
          >
          <NuxtLink to="/admin/set-application" class="das-nav-items inner"
            ><div>Application</div></NuxtLink
          >
        </div>
      </div>

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
    toggleActivities() {
      this.$store.commit("admin/TOGGLE_ACTIVITIES");
    },

    togglePages() {
      this.$store.commit("admin/TOGGLE_PAGES");
    },

    toggleSettings() {
      this.$store.commit("admin/TOGGLE_SETTINGS");
    },

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
