export const state = () => ({
  initials: false,
  company: "",
  selectedCompanies: [],
  isCompanyChecked: false,

  showAdminNav: false,
  surveyUser: "",

  activityState: false,
  pageState: false,
  settingsState: false,

  notifications: [],
  notificationLength: 0,
  notificationStatus: false,

  referrals: [],
  referralLength: 0,
  referralStatus: false,

  comments: [],
  commentLength: 0,
  isCommentsChecked: false,
  selectedComments: [],

  abouts: [],
  aboutLength: 0,
  aboutStatus: false,
  selectedAbout: [],
  isAboutChecked: false,

  faqs: [],
  faqLength: 0,
  faqStatus: false,
  selectedFAQ: [],
  isFAQChecked: false,

  blogs: [],
  blogLength: 0,
  blogStatus: false,
  selectedBlogs: [],
  isBlogChecked: false,

  notificationTemps: [],
  selectedNotificationTemps: [],
  notificationTempLength: 0,
  notificationTempStatus: false,
  isNotificationTempChecked: false,

  users: [],
  userLength: 0,
  userStatus: false,
  isUsersChecked: false,
  selectedUsers: [],

  staffs: [],
  staffLength: 0,
  staffStatus: false,
  isStaffsChecked: false,
  selectedStaffs: [],

  positions: [],
  positionLength: 0,
  positionStatus: false,
  isStaffSettingsChecked: false,
  selectedPositions: [],

  promos: [],
  promoLength: 0,
  promoStatus: false,
  isAllPromoChecked: false,
  selectedPromos: [],

  products: [],
  productLength: 0,
  isAllProductSelected: false,
  productStatus: false,
  selectedProducts: [],

  cartProducts: [],
  purchaseProperties: {
    totalQuantity: 0,
    totalAmount: 0,
  },

  terms: [],
  termLength: 0,
  isAllTermSelected: false,
  termStatus: false,
  selectedTerms: [],

  expenses: [],
  expenseLength: 0,
  expenseStatus: false,
  smallExpense: 0,
  isExpensesChecked: false,
  selectedExpenses: [],

  transactions: [],
  transactionLength: 0,
  transactionStatus: false,
  purchase: 0,
  expense: 0,
  order: 0,
  profits: 0,

  stocks: [],
  stockLength: 0,
  stockStatus: false,
  isBannerChecked: false,
  selectedBanners: [],

  banners: [],
  bannerLength: 0,
  bannerStatus: false,

  survey: [],
  surveyLength: 0,

  emails: [],
  emailLength: 0,
  emailStatus: false,
  selectedEmails: [],
  isEmailChecked: false,

  orders: [],
  orderLength: 0,
  orderStatus: false,

  fileURL: "",

  categories: [],

  show: false,
  error: false,
  success: false,
  warning: false,
  msg: "",
  data: "",
});

export const getters = {};

function checkArray(data) {
  const array = [];
  for (let i = 0; i < data.length; i++) {
    data[i].checked = false;
    array.push(data[i]);
  }
  return array;
}

function initializeProducts(data) {
  const products = [];
  for (let i = 0; i < data.length; i++) {
    data[i].quantity = 0;
    products.push(data[i]);
  }
  return products;
}

export const mutations = {
  TOGGLE_RESPONSE(state) {
    state.show = !state.show;
  },

  SHOW_RESPONSE(state, payload) {
    const { msg, error, success, warning, show, data } = payload;
    state.show = show;
    state.warning = warning;
    state.success = success;
    state.error = error;
    state.msg = msg;
    state.data = data;
  },

  TOGGLE_NOTIFICATION_TEMP(state, int) {
    state.notificationTemps[int].checked =
      !state.notificationTemps[int].checked;

    const item = state.notificationTemps[int];
    const exists = state.selectedNotificationTemps.some(
      (obj) => obj.id === item.id
    );
    if (!exists) {
      state.selectedNotificationTemps.push(item);
      if (
        state.selectedNotificationTemps.length == state.notifications.length
      ) {
        state.isNotificationTempChecked = true;
      }
    } else {
      state.selectedNotificationTemps = state.selectedNotificationTemps.filter(
        (obj) => obj.id !== item.id
      );
      if (state.selectedNotificationTemps.length == 0) {
        state.isNotificationTempChecked = false;
        state.selectedNotificationTemps = [];
      }
    }
  },

  SET_FILE_URL(state, URL) {
    state.fileURL = URL;
  },

  TOGGLE_NAV(state) {
    state.showAdminNav = !state.showAdminNav;
  },

  HIDE_NAV(state) {
    state.showAdminNav = false;
    state.activityState = false;
    state.settingsState = false;
    state.pageState = false;
  },

  HIDE_DROPDOWNS(state) {
    state.pageState = false;
    state.settingsState = false;
    state.activityState = false;
  },

  TOGGLE_PAGES(state) {
    state.pageState = !state.pageState;
  },

  TOGGLE_BLOG(state, int) {
    state.blogs[int].checked = !state.blogs[int].checked;

    const blog = state.blogs[int];
    const exists = state.selectedBlogs.some((obj) => obj.id === blog.id);
    if (!exists) {
      state.selectedBlogs.push(blog);
      if (state.selectedBlogs.length == state.blogs.length) {
        state.isBlogChecked = true;
      }
    } else {
      state.selectedBlogs = state.selectedBlogs.filter(
        (obj) => obj.id !== blog.id
      );
      if (state.selectedBlogs.length == 0) {
        state.isBlogChecked = false;
        state.selectedBlogs = [];
      }
    }
  },

  TOGGLE_BANNER(state, int) {
    state.banners[int].checked = !state.banners[int].checked;

    const item = state.banners[int];
    const exists = state.selectedBanners.some((obj) => obj.id === item.id);
    if (!exists) {
      state.selectedBanners.push(item);
      if (state.selectedBanners.length == state.banners.length) {
        state.isBannerChecked = true;
      }
    } else {
      state.selectedBanners = state.selectedBanners.filter(
        (obj) => obj.id !== item.id
      );
      if (state.selectedBanners.length == 0) {
        state.isBannerChecked = false;
        state.selectedBanners = [];
      }
    }
  },

  TOGGLE_SETTINGS(state) {
    state.settingsState = !state.settingsState;
  },

  TOGGLE_COMPANY(state, int) {
    state.company[int].checked = !state.company[int].checked;

    const company = state.company[int];
    const exists = state.selectedCompanies.some((obj) => obj.id === company.id);
    if (!exists) {
      state.selectedCompanies.push(company);
      if (state.selectedCompanies.length == state.company.length) {
        state.isCompanyChecked = true;
      }
    } else {
      state.selectedCompanies = state.selectedCompanies.filter(
        (obj) => obj.id !== company.id
      );
      if (state.selectedCompanies.length == 0) {
        state.isCompanyChecked = false;
        state.selectedCompanies = [];
      }
    }
  },

  TOGGLE_ACTIVITIES(state) {
    state.activityState = !state.activityState;
  },

  SET_COMPANY(state, result) {
    state.company = checkArray(result.data);
  },

  CHECK_ALL_NOTIFICATIONS(state) {
    const newArray = [];
    state.isNotificationTempChecked = !state.isNotificationTempChecked;
    if (state.isNotificationTempChecked) {
      state.notificationTemps.forEach((el) => {
        el.checked = true;
        newArray.push(el);
      });
      state.selectedNotificationTemps = state.notificationTemps;
    } else {
      state.notifications.forEach((el) => {
        el.checked = false;
        newArray.push(el);
      });
      state.selectedNotificationTemps = [];
    }

    state.notificationTemps = newArray;
  },

  TOGGLE_USER(state, int) {
    state.users[int].checked = !state.users[int].checked;

    const user = state.users[int];
    const exists = state.selectedUsers.some((obj) => obj._id === user._id);
    if (!exists) {
      state.selectedUsers.push(user);
      if (state.selectedUsers.length == state.users.length) {
        state.isUsersChecked = true;
      }
    } else {
      state.selectedUsers = state.selectedUsers.filter(
        (obj) => obj.id !== user.id
      );
      if (state.selectedUsers.length == 0) {
        state.isUsersChecked = false;
        state.selectedUsers = [];
      }
    }
  },

  TOGGLE_COMMENT(state, int) {
    state.comments[int].checked = !state.comments[int].checked;

    const comment = state.comments[int];
    const exists = state.selectedComments.some(
      (obj) => obj._id === comment._id
    );
    if (!exists) {
      state.selectedComments.push(comment);
      if (state.selectedComments.length == state.comments.length) {
        state.isCommentsChecked = true;
      }
    } else {
      state.selectedComments = state.selectedComments.filter(
        (obj) => obj.id !== comment.id
      );
      if (state.selectedComments.length == 0) {
        state.isCommentsChecked = false;
        state.selectedComments = [];
      }
    }
  },

  TOGGLE_STAFF(state, int) {
    state.staffs[int].checked = !state.staffs[int].checked;

    const user = state.staffs[int];
    const exists = state.selectedStaffs.some((obj) => obj.id === user.id);
    if (!exists) {
      state.selectedStaffs.push(user);
      if (state.selectedStaffs.length == state.staffs.length) {
        state.isStaffsChecked = true;
      }
    } else {
      state.selectedStaffs = state.selectedStaffs.filter(
        (obj) => obj.id !== user.id
      );
      if (state.selectedStaffs.length == 0) {
        state.isStaffsChecked = false;
        state.selectedStaffs = [];
      }
    }
  },

  TOGGLE_TERM(state, int) {
    state.terms[int].checked = !state.terms[int].checked;

    const user = state.terms[int];
    const exists = state.selectedTerms.some((obj) => obj.id === user.id);
    if (!exists) {
      state.selectedTerms.push(user);
      if (state.selectedTerms.length == state.terms.length) {
        state.isAllTermSelected = true;
      }
    } else {
      state.selectedTerms = state.selectedTerms.filter(
        (obj) => obj.id !== user.id
      );
      if (state.selectedTerms.length == 0) {
        state.isAllTermSelected = false;
        state.selectedTerms = [];
      }
    }
  },

  TOGGLE_FAQ(state, int) {
    state.faqs[int].checked = !state.faqs[int].checked;

    const faqItem = state.faqs[int];
    const exists = state.selectedFAQ.some((obj) => obj.id === faqItem.id);
    if (!exists) {
      state.selectedFAQ.push(faqItem);
      if (state.selectedFAQ.length == state.faqs.length) {
        state.isFAQChecked = true;
      }
    } else {
      state.selectedFAQ = state.selectedFAQ.filter(
        (obj) => obj.id !== faqItem.id
      );
      if (state.selectedFAQ.length == 0) {
        state.isFAQChecked = false;
        state.selectedFAQ = [];
      }
    }
  },

  TOGGLE_PROMO(state, int) {
    state.promos[int].checked = !state.promos[int].checked;

    const item = state.promos[int];
    const exists = state.selectedPromos.some((obj) => obj.id === item.id);
    if (!exists) {
      state.selectedPromos.push(item);
      if (state.selectedPromos.length == state.promos.length) {
        state.isAllPromoChecked = true;
      }
    } else {
      state.selectedPromos = state.selectedPromos.filter(
        (obj) => obj.id !== item.id
      );
      if (state.selectedPromos.length == 0) {
        state.isAllPromoChecked = false;
        state.selectedPromos = [];
      }
    }
  },

  TOGGLE_EMAIL(state, int) {
    state.emails[int].checked = !state.emails[int].checked;

    const email = state.emails[int];
    const exists = state.selectedEmails.some((obj) => obj.id === email.id);
    if (!exists) {
      state.selectedEmails.push(email);
      if (state.selectedEmails.length == state.emails.length) {
        state.isEmailChecked = true;
      }
    } else {
      state.selectedEmails = state.selectedEmails.filter(
        (obj) => obj.id !== email.id
      );
      if (state.selectedEmails.length == 0) {
        state.isEmailChecked = false;
        state.selectedEmails = [];
      }
    }
  },

  TOGGLE_EXPENSES(state, int) {
    state.expenses[int].checked = !state.expenses[int].checked;

    const item = state.expenses[int];
    const exists = state.selectedExpenses.some((obj) => obj.id === item.id);
    if (!exists) {
      state.selectedExpenses.push(item);
      if (state.selectedExpenses.length == state.expenses.length) {
        state.isExpensesChecked = true;
      }
    } else {
      state.selectedExpenses = state.selectedExpenses.filter(
        (obj) => obj.id !== item.id
      );
      if (state.selectedExpenses.length == 0) {
        state.isExpensesChecked = false;
        state.selectedExpenses = [];
      }
    }
  },

  TOGGLE_ABOUT(state, int) {
    state.abouts[int].checked = !state.abouts[int].checked;

    const about = state.abouts[int];
    const exists = state.selectedAbout.some((obj) => obj.id === about.id);
    if (!exists) {
      state.selectedAbout.push(about);
      if (state.selectedAbout.length == state.abouts.length) {
        state.isAboutChecked = true;
      }
    } else {
      state.selectedAbout = state.selectedAbout.filter(
        (obj) => obj.id !== about.id
      );
      if (state.selectedAbout.length == 0) {
        state.isAboutChecked = false;
        state.selectedAbout = [];
      }
    }
  },

  TOGGLE_PRODUCT(state, int) {
    state.products[int].checked = !state.products[int].checked;

    const product = state.products[int];
    const exists = state.selectedProducts.some((obj) => obj.id === product.id);
    if (!exists) {
      state.selectedProducts.push(product);
    } else {
      state.selectedProducts = state.selectedProducts.filter(
        (obj) => obj.id !== product.id
      );
    }
  },

  SET_PROMOS(state, result) {
    state.promos = result.data;
    state.promoLength = result.totalLength;
    state.isAllPromoChecked = false;
    state.selectedPromos = [];
  },

  SET_PRODUCTS(state, data) {
    state.productLength = data.totalLength;
    state.products = initializeProducts(checkArray(data.data));
    state.productStatus = true;
    state.selectedProducts = [];
  },

  // SET_NOTIFICATIONS(state, result) {
  //   state.notices = result.data;
  //   state.noticeLength = result.totalLength;
  // },

  SET_NOTIFICATIONS(state, data) {
    state.notificationLength = data.totalLength;
    state.notifications = checkArray(data.data);
    state.notificationStatus = true;
  },

  SET_COMMENTS(state, data) {
    state.commentLength = data.totalLength;
    state.comments = checkArray(data.data);
    state.isCommentsChecked = true;
    state.selectedComments = [];
  },

  SET_EMAILS(state, data) {
    state.emailLength = data.totalLength;
    state.emails = checkArray(data.data);
    state.emailStatus = true;
    state.selectedEmails = [];
  },

  SET_ABOUT(state, data) {
    state.aboutLength = data.totalLength;
    state.abouts = checkArray(data.data);
    state.aboutStatus = true;
    state.selectedAbout = [];
  },

  SET_NOTIFICATION_TEMPS(state, data) {
    state.notificationTempLength = data.totalLength;
    state.notificationTemps = checkArray(data.data);
    state.notificationTempStatus = true;
  },

  SET_TRANSACTIONS(state, result) {
    state.transactions = result.data;
    state.transactionLength = result.totalLength;
    state.transactionStatus = true;
    state.purchase = result.Purchase != null ? result.Purchase : 0;
    state.order = result.Order != null ? result.Order : 0;
    state.expense = result.Expense != null ? result.Expense : 0;
    state.profits = result.Profits != null ? result.Profits : 0;
  },

  SET_EXPENSES(state, result) {
    state.expenses = checkArray(result.data);
    state.expenseLength = result.totalLength;
    state.expenseStatus = true;
    state.smallExpense = result.Expense != null ? result.Expense : 0;
  },

  SET_TERMS(state, result) {
    state.terms = checkArray(result.data);
    state.termLength = result.totalLength;
    state.termStatus = true;
    state.selectedTerms = [];
  },

  SET_ORDERS(state, result) {
    state.orders = result.data;
    state.orderLength = result.totalLength;
    state.orderStatus = true;
  },

  SET_REFERRALS(state, result) {
    state.referrals = result.data;
    state.referralLength = result.totalLength;
    state.referralStatus = true;
  },

  SET_USERS(state, data) {
    state.users = checkArray(data.data);
    state.userLength = data.totalLength;
    state.userStatus = true;
  },

  SET_STAFFS(state, data) {
    state.staffs = checkArray(data.data);
    state.staffLength = data.totalLength;
    state.staffStatus = true;
  },

  SET_STOCK(state, data) {
    state.stocks = checkArray(data.data);
    state.stockLength = data.totalLength;
    state.stockStatus = true;
  },

  SET_BANNERS(state, data) {
    state.banners = checkArray(data.data);
    state.bannerLength = data.totalLength;
    state.bannerStatus = true;
    state.selectedBanners = [];
    state.isBannerChecked = false;
  },

  SET_FAQ(state, data) {
    state.faqs = checkArray(data.data);
    state.faqLength = data.totalLength;
    state.faqStatus = true;
  },

  SET_BLOG(state, data) {
    state.blogs = checkArray(data.data);
    state.blogLength = data.totalLength;
    state.blogStatus = true;
    state.selectedBlogs = [];
  },

  SET_POSITIONS(state, data) {
    state.positions = checkArray(data.data);
    state.positionLength = data.totalLength;
    state.positionStatus = true;
  },

  SET_SALES(state, sales) {
    state.sales = sales.results;
    state.saleLength = sales.length;
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  SET_SURVEY(state, data) {
    state.survey = data.data;
    state.surveyLength = data.totalLength;
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

  async MAKE_DELETE({ commit }, url) {
    try {
      const response = await this.$axios.delete(`${url}`);
      return response;
    } catch (error) {
      return error;
    }
  },

  async GET_PRODUCTS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_PRODUCTS", result.data);
  },

  async GET_PROMOS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_PROMOS", result.data);
  },

  async GET_BANNERS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_BANNERS", result.data);
  },

  async GET_ABOUT({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_ABOUT", result.data);
  },

  async GET_ORDERS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_ORDERS", result.data);
  },

  async GET_NOTIFICATIONS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_NOTIFICATIONS", result.data);
  },

  async GET_COMMENTS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_COMMENTS", result.data);
  },

  async GET_NOTIFICATION_TEMPS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_NOTIFICATION_TEMPS", result.data);
  },

  //FF4141

  async GET_TRANSACTIONS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_TRANSACTIONS", result.data);
  },

  async GET_EXPENSES({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_EXPENSES", result.data);
  },

  async GET_COMPANY({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_COMPANY", result.data);
  },

  async GET_USERS({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_USERS", result.data);
  },

  async GET_TERMS({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_TERMS", result.data);
  },

  async GET_POSITIONS({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_POSITIONS", result.data);
  },

  async GET_REFERRALS({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_REFERRALS", result.data);
  },

  async GET_STAFFS({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_STAFFS", result.data);
  },

  async GET_STOCK({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_STOCK", result.data);
  },

  async GET_SURVEY({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_SURVEY", result.data);
  },

  async GET_FAQ({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_FAQ", result.data);
  },

  async GET_BLOG({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_BLOG", result.data);
  },

  async GET_EMAILS({ commit, dispatch }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_EMAILS", result.data);
  },

  INITIALIZE_APP({ commit, dispatch }) {
    dispatch("GET_NOTIFICATION_TEMPS", "/notifications/temp/?limit=10&page=1");
    dispatch("GET_EMAILS", "/emails/?limit=10&page=1");
    dispatch("GET_STAFFS", "/staffs/?limit=10&page=1");
    dispatch("GET_TERMS", "/terms/?limit=10&page=1");
    dispatch("GET_STOCK", "/stock/?limit=20&page=1&sort=name");
    dispatch("GET_FAQ", "/faq/?limit=10&page=1&sort=-time");
    dispatch("GET_BLOG", "/blog/?limit=10&page=1&sort=-time");
    dispatch("GET_POSITIONS", "/staffs/positions/?limit=10&page=1");
    dispatch("GET_ABOUT", "/about/?limit=10&page=1");
    dispatch("GET_BANNERS", "/banners/?limit=10&page=1");
    dispatch("GET_COMMENTS", "/comments/?limit=10&page=1");
    dispatch(
      "GET_NOTIFICATIONS",
      "/notifications/?limit=10&page=1&sort=time&username=Admin"
    );
    dispatch("GET_COMPANY", "/company");
  },
};
