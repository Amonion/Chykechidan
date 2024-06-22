export const state = () => ({
  plans: [],
  planLength: 0,
  selectedPlan: "",

  wallets: [],
  walletLength: 0,
  selectedWallet: "",

  transactions: [],
  transactionLength: 0,

  notifications: [],
  notificationLength: 0,

  activeDeposits: [],
  activeDepositLength: 0,

  managers: [],
  managerLength: 0,

  referrals: [],
  referralLength: 0,

  earnings: [],
  earningLength: 0,

  currencies: [],
  currencyLength: 0,
  selectedCurrency: "",

  company: "",

  modalMsg: "",
  showModal: false,
  isModalError: false,
  isModalWarning: false,

  fileURL: "",
});

export const mutations = {
  TOGGLE_ADMIN_NAV(state) {
    state.adminNavState = !state.adminNavState;
  },

  TOGGLE_NAV(state) {
    state.dashboardNavState = !state.dashboardNavState;
  },

  HIDE_DASHBOARD_NAV(state) {
    state.dashboardNavState = false;
  },

  HIDE_NAV(state) {
    state.adminNavState = false;
  },

  SET_URL(state, URL) {
    state.fileURL = URL;
  },

  SHOW_CONFIRMATION(state, { msg, status }) {
    state.confirmMsg = msg;
    state.confirmState = status;
  },

  showModal(state, payload) {
    state.modalMsg = payload.msg;
    state.isModalWarning = payload.warning;
    state.isModalError = payload.error;
    state.showModal = true;
  },

  hideModal(state) {
    state.showModal = false;
  },

  numberWithCommas(state, number) {
    return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
  },

  setActiveDeposits(state, result) {
    state.activeDeposits = result.data;
    state.activeDepositLength = result.totalLength;
  },

  setReferrals(state, result) {
    state.referrals = result.data;
    state.referralLength = result.totalLength;
  },

  setNotifications(state, result) {
    state.notifications = result.data;
    state.notificationLength = result.totalLength;
  },

  setEarnings(state, result) {
    state.earnings = result.data;
    state.earningLength = result.totalLength;
  },

  setCurrencies(state, result) {
    function unCheckData(data) {
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        el.checked = false;
      }
      return data;
    }

    state.currencies = unCheckData(result.data);
    state.currencyLength = result.totalLength;
  },

  setManagers(state, result) {
    state.managers = result.data;
    state.managerLength = result.totalLength;
  },

  setCompany(state, result) {
    state.company = result.data[0];
  },

  setTransactions(state, result) {
    state.transactions = result.data;
    state.transactionLength = result.totalLength;
  },

  setWallets(state, result) {
    state.wallets = result.data;
    state.walletLength = result.totalLength;
  },

  setPlans(state, result) {
    state.plans = result.data.sort(
      (a, b) => a[state.plans.planMinimum] - b[state.plans.planMinimum]
    );

    state.planLength = result.totalLength;
  },

  selectPlan(state, item) {
    state.selectedPlan = item;
  },
};

export const actions = {
  async makeGET({ commit }, url) {
    try {
      const result = await this.$axios.get(url);
      return result;
    } catch (err) {
      console.log(err.response);
    }
  },

  async makePOST({ commit }, payload) {
    try {
      const result = await this.$axios.post(payload.url, payload.form);
      return result;
    } catch (err) {
      return err;
    }
  },

  async getEarnings({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setEarnings", result.data);
  },

  async getUser({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    dispatch("setUser", result.data.user, { root: true });
  },

  async getReferrals({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setReferrals", result.data);
  },

  async getCurrencies({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCurrencies", result.data);
  },

  async getManagers({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setManagers", result.data);
  },

  async getCompany({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCompany", result.data);
  },

  async getPlans({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setPlans", result.data);
  },

  async getNotifications({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setNotifications", result.data);
  },

  async getTransactions({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setTransactions", result.data);
  },

  async getWallets({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setWallets", result.data);
  },

  async getActiveDeposits({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setActiveDeposits", result.data);
  },

  async initializeUserDetails({ commit, dispatch }, user) {
    await dispatch("getPlans", `/plans/?limit=10&page=1`);
    await dispatch("getUser", `/users/get-user`);

    await dispatch(
      "getWallets",
      `/wallets/?limit=10&page=1&username=${user?.username}`
    );
    await dispatch(
      "getTransactions",
      `/transactions/?limit=10&page=1&sort=-time&username=${user?.username}`
    );
    await dispatch(
      "getActiveDeposits",
      `/transactions/active-deposits/?limit=10&page=1&sort=-time&username=${user?.username}`
    );

    await dispatch("getCompany", `/company`);
    await dispatch("getManagers", `/manager/?limit=10&page=1`);
    await dispatch("getCurrencies", `/currency/?limit=10&page=1`);
    await dispatch(
      "getNotifications",
      `/notifications/?limit=10&page=1&sort=-time&username=${user?.username}`
    );
    await dispatch(
      "getReferrals",
      `/referrals/?limit=10&page=1&sort=-time&username=${user?.username}&referralType=${user.referralType}`
    );
    await dispatch(
      "getEarnings",
      `/transactions/earnings/?limit=10&page=1&sort=-time&username=${user?.username}`
    );
  },

  // async nuxtServerInit() {
  //   console.log("getPlans");
  // },
};
