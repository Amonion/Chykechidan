import dashboard from "./dashboard";

export const state = () => ({
  adminNavState: false,
  navState: false,
  isNavActive: false,
  dashboardNavState: false,
  fileURL: "",
  confirmMsg: "",
  confirmState: true,
  showDashboardNav: false,

  blogs: [],
  blogLength: 0,

  terms: [],

  faqs: [],

  banners: [],
  bannerLength: 0,

  products: [],
  productLength: 0,

  reviews: [],
  reviewLength: 0,

  transactions: [],
  transactionLength: 0,

  staffs: [],
  staffLength: 0,

  notifications: [],
  notificationLength: 0,

  comments: [],
  commentLength: 0,

  company: "",
  about: "",
  route: "",
});

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
  },

  getUserInfo(state) {
    return state.auth.user;
  },
};

function unCheckData(data) {
  if (data == undefined) {
    return data;
  }
  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    el.checked = false;
  }
  return data;
}

export const mutations = {
  setUser(state, data) {
    state.auth.user = data;
  },

  toggleNav(state) {
    state.isNavActive = !state.isNavActive;
  },

  hideNav(state) {
    state.isNavActive = false;
  },

  SET_FILE_URL(state, URL) {
    state.fileURL = URL;
  },

  UPDATE_ME(state, user) {
    state.auth.user = user;
  },

  SET_ROUTE(state, route) {
    state.route = route;
  },

  SET_COMPANY(state, result) {
    state.company = result.data[0];
  },

  setReviews(state, result) {
    state.reviews = result.data;
    state.reviewLength = result.totalLength;
  },

  setStaffs(state, result) {
    state.staffs = result.data;
  },

  setTerms(state, result) {
    state.terms = result.data;
  },

  SET_FAQ(state, result) {
    state.faqs = result.data;
  },

  SET_BLOG(state, result) {
    state.blogs = result.data;
    state.blogLength = result.totalLength;
  },

  SET_TRANSACTIONS(state, result) {
    state.transactions = result.data;
    state.transactionLength = result.totalLength;
  },

  SET_PRODUCTS(state, result) {
    state.products = result.data;
    state.productLength = result.totalLength;
  },

  SET_BANNERS(state, result) {
    state.banners = result.data;
    state.bannerLength = result.totalLength;
  },

  SET_COMMENTS(state, result) {
    state.comments = result.data;
    state.commentLength = result.totalLength;
  },

  SET_ABOUTS(state, result) {
    state.about = result.data;
  },

  SET_NOTIFICATIONS(state, result) {
    state.notifications = result.data;
    state.notificationLength = result.totalLength;
  },
};

export const actions = {
  async MAKE_POST({ commit }, payload) {
    const { url, form } = payload;
    try {
      const response = await this.$axios.post(`${url}`, form);
      return response;
    } catch (error) {
      return error;
    }
  },

  async MAKE_GET({ commit }, url) {
    try {
      const response = await this.$axios.get(`${url}`);
      return response;
    } catch (error) {
      return error;
    }
  },

  async GET_PRODUCTS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_PRODUCTS", result.data);
  },

  async GET_BLOG({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    console.log(result);
    commit("SET_BLOG", result.data);
  },

  async GET_TERMS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_TERMS", result.data);
  },

  async GET_PROMOS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_PROMOS", result.data);
  },

  async GET_TRANSACTIONS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_TRANSACTIONS", result.data);
  },

  async GET_NOTIFICATIONS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_NOTIFICATIONS", result.data);
  },

  async GET_PRODUCT_CATEGORIES({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_PRODUCT_CATEGORIES", result.data);
  },

  async GET_COMPANY({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_COMPANY", result.data);
  },

  async GET_COMMENTS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_COMMENTS", result.data);
  },

  async GET_BANNERS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_BANNERS", result.data);
  },

  async GET_ABOUTS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_ABOUTS", result.data);
  },

  INITIALIZE_APP({ commit, dispatch }, user) {
    if (user) {
      dispatch(
        "GET_COMMENTS",
        `/comments/?username=${user.username}&limit=10&page=1`
      );
      dispatch(
        "GET_NOTIFICATIONS",
        `/notifications/?limit=20&page=1&sort=-time&username=${user.username}`
      );
      dispatch(
        "GET_TRANSACTIONS",
        `/transactions/?limit=20&page=1&sort=-ordered_time&username=${user.username}`
      );
    }
    dispatch("GET_COMPANY", "/company");
    dispatch("GET_BANNERS", `/banners/?limit=10&page=1`);
    dispatch("GET_PRODUCTS", `/products/?limit=8&page=1`);
    dispatch("GET_ABOUTS", `/about/?limit=10&page=1`);
    dispatch("GET_BLOG", "/blog/?limit=20&page=1");

    // dispatch(
    //   "GET_PRODUCT_CATEGORIES",
    //   "/products/?limit=20&page=1&isCategory=1"
    // );
    // dispatch("GET_TERMS", "/terms/?limit=20&page=1");
    // dispatch("GET_PROMOS", "/promotions/?limit=20&page=1&sort=-target");

    // dispatch("GET_PRODUCTS", "/products/?limit=40&page=1");
  },
};
