export const state = () => ({
  catProduct: "",
  catProductsLength: [],
  productArray: [],
  products: [],
  purchaseProducts: [],
  purchaseProductsLength: 0,
  productSettings: [],
  productLength: 0,
  initials: false,
  productStatus: false,

  homeProducts: [],

  promoStatus: false,
  promos: [],

  promoInCart: false,
  productInCart: false,

  showConfirmBox: false,
  confirmBoxMsg: "",
  confirmBoxId: "",

  buyingUser: "",

  isShowingCart: false,
  showCart: false,
  isShowingPurchaseCart: false,
  showPurchase: false,
  selectedProduct: "",
  selectedProductSettings: [],
  selectedObject: "",

  cartProducts: [],
  cartProperties: {
    totalQuantity: 0,
    totalAmount: 0,
    categories: [],
  },

  cartPurchases: [],
  purchaseProperties: {
    totalQuantity: 0,
    totalAmount: 0,
    categories: [],
  },

  cartType: "Purchase",
  userState: "",
});

export const getters = {
  getObjectById: (state) => (id) => {
    return state.productArray.find((obj) => obj._id === id) || null;
  },
};

function resetCart(products, userState) {
  const items = [];
  const homeItems = [];
  for (let x = 0; x < products.length; x++) {
    products[x].check = false;
    products[x].cartNumber = 0;
    products[x].quantity = 0;
    items.push(products[x]);
  }

  if (products.length >= 10) {
    for (let x = 0; x < 10; x++) {
      products[x].check = false;
      products[x].cartNumber = 0;
      products[x].quantity = 0;
      homeItems.push(products[x]);
    }
  }
  userState.products = homeItems;
  userState.productArray = items;
}

function checkCartProducts(items, state) {
  let el = items;
  for (let x = 0; x < el.length; x++) {
    for (let i = 0; i < state.cartProducts.length; i++) {
      const elem = state.cartProducts[i];
      if (el[x].productName == elem.productName) {
        el[x].quantity = elem.quantity * 1;
        el[x].cartNumber = elem.cartNumber * 1;
      }
    }
  }

  return el;
}

function selectRandomItems(array, count) {
  let shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function reduceItems(state, item, index) {
  // let index = null;

  // if (item.type == "Product") {
  //   for (let i = 0; i < state.products.length; i++) {
  //     if (state.products[i].id == item.id) {
  //       index = i;
  //     }
  //   }
  // } else {
  //   for (let i = 0; i < state.promos.length; i++) {
  //     if (state.promos[i].id == item.id) {
  //       index = i;
  //     }
  //   }
  // }

  for (let i = 0; i < state.cartProducts.length; i++) {
    if (state.cartProducts[i].id == item.id) {
      if (state.cartProducts[i].quantity > 0) {
        state.cartProducts[i].quantity--;
        const items = item.type == "Product" ? state.products : state.promos;
        for (let x = 0; x < items.length; x++) {
          const element = items[x];
          if (element) {
            if (element.id == item.id) {
              element.quantity = item.quantity;
            }
          }
        }
        state.purchaseProperties.totalQuantity--;
        state.purchaseProperties.totalAmount -= item.sellingPrice;
        if (state.cartProducts[i].quantity == 0) {
          state.cartProducts.splice(i, 1);
        }
        if (state.purchaseProperties.totalQuantity == 0) {
          state.isShowingCart = false;
        }
      } else {
        state.cartProducts[i].quantity = 0;
        if (item.type == "Product") {
          state.products[index] = state.cartProducts[i];
        } else {
          state.promos[index] = state.cartProducts[i];
        }
        state.cartProducts.splice(i, 1);
      }
    }
  }
}

export const mutations = {
  async SET_PURCHASE_PRODUCTS(state, result) {
    state.purchaseProductsLength = result.totalLength;
    const items = [];
    let el = result.data;
    for (let x = 0; x < el.length; x++) {
      el[x].check = false;
      el[x].type = "Product";
      el[x].cartNumber = 0;
      el[x].quantity = 0;
      items.push(el[x]);
    }

    state.purchaseProductsStatus = true;
    state.purchaseProducts = items;
  },

  async SET_PRODUCTS(state, products) {
    state.productLength = products.totalLength;
    const items = [];
    const homeItems = [];
    let el = products.data;
    for (let x = 0; x < el.length; x++) {
      el[x].check = false;
      el[x].type = "Product";
      el[x].cartNumber = 0;
      el[x].quantity = 0;
      items.push(el[x]);
    }

    state.productStatus = true;
    state.products = items;
    state.homeProducts = selectRandomItems(items);

    // if (products.results.length >= 10) {
    //   for (let x = 0; x < 10; x++) {
    //     products.results[x].check = false;
    //     products.results[x].cartNumber = 0;
    //     products.results[x].quantity = 0;
    //     homeItems.push(products.results[x]);
    //   }
    // }
    // state.products = homeItems;

    // state.productArray = checkCartProducts(items, state);
  },

  SET_BUYING_USER(state, user) {
    state.buyingUser = user;
  },

  SET_CATEGORY_PRODUCTS(state, products) {
    state.catProductsLength = products.length;

    state.productArray = state.productArray.filter(
      (item) => item.isCat !== true
    );

    for (let x = 0; x < products.results.length; x++) {
      products.results[x].isCat = true;
      products.results[x].check = false;
      products.results[x].cartNumber = 0;
      products.results[x].quantity = 0;
      state.productArray.push(products.results[x]);
    }
  },

  SET_PROMO_PRODUCTS(state, products) {
    const items = [];
    let el = products.data;
    for (let x = 0; x < el.length; x++) {
      el[x].check = false;
      el[x].cartNumber = 0;
      el[x].type = "Promo";
      el[x].quantity = 0;
      items.push(el[x]);
    }

    state.promoStatus = true;
    state.promos = items;
  },

  SET_PRODUCT_SETTINGS(state, products) {
    state.dataLength = products.resultLength;
    const items = [];

    for (let x = 0; x < products.data.length; x++) {
      products.data[x].checked = false;
      products.data[x].cartNumber = 0;
      products.data[x].quantity = 0;
      items.push(products.data[x]);
    }
    state.productSettings = items;
  },

  SET_CAT_PRODUCT(state, category) {
    state.catProduct = category;
    state.showCatProduct = true;
  },

  HIDE_CAT_PRODUCT(state) {
    state.catProduct = "";
    state.showCatProduct = false;
  },

  SET_OBJECT(state, object) {
    state.selectedObject = object;
  },

  ADD_TO_CART(state, data) {
    state.isShowingPurchaseCart = false;
    state.showCart = true;

    // CHECK IF THE GIVEN PRODUCT EXIST IN THE CART
    const existingItem = state.cartProducts.find(
      (item) => item.id == data.id && item.type == "Product"
    );
    const product = state.products.find((item) => item.id == data.id);
    const promo = state.promos.find((item) => item.id == data.id);
    let existPromo = null;
    if (promo) {
      existPromo = state.cartProducts.find(
        (item) => item.id == promo.id && item.type == "Promo"
      );
    }

    let index = null;

    // GET THE INDEX OF THE SELECTED PRODUCT IN THE PRODUCTS ARRAY
    for (let i = 0; i < state.products.length; i++) {
      if (state.products[i].id == data.id) {
        index = i;
      }
    }

    if (existingItem) {
      existingItem.quantity++;
      existingItem.cartNumber++;
      if (promo) {
        promo.quantity++;
      }
    } else if (!existingItem && !existPromo) {
      data.quantity = 1;
      state.cartProducts.push(data);
      state.products[index] = data;
      if (promo) {
        promo.quantity = 1;
      }
    } else if (!existingItem && existPromo) {
      product.quantity++;
      existPromo.quantity++;
    }

    state.cartProperties.totalQuantity++;
    state.cartProperties.totalAmount += data.sellingPrice * 1;
  },

  REMOVE_FROM_CART(state, data) {
    // if (state.cartType == "Purchase") {
    //   state.cartProducts = [];
    //   state.cartProperties.totalAmount = 0;
    //   state.cartProperties.totalQuantity = 0;
    //   state.cartType = "Sales";
    //   // return;
    // }

    let index = null;
    for (let i = 0; i < state.products.length; i++) {
      if (state.products[i].id == data.id) {
        index = i;
      }
    }

    const existingItem = state.cartProducts.find(
      (item) => item.id == data.id && item.type == "Product"
    );
    const promo = state.promos.find((item) => item.id == data.id);
    const product = state.products.find((item) => item.id == data.id);
    let existPromo = "";
    if (promo) {
      existPromo = state.cartProducts.find(
        (item) => item.id == promo.id && item.type == "Promo"
      );
    }

    if (existingItem && !existPromo) {
      reduceItems(state, data, index);
      if (promo) {
        promo.quantity--;
      }
    } else if (!existingItem && existPromo) {
      reduceItems(state, promo, index);
      product.quantity--;
    }

    if (state.cartProducts.length > 0) {
      state.showCart = true;
    } else {
      state.showCart = false;
    }
  },

  ADD_TO_PURCHASE(state, data) {
    state.isShowingCart = false;
    state.showPurchase = true;

    const existingItem = state.cartPurchases.find(
      (item) => item.name === data.name
    );

    let index = null;

    for (let i = 0; i < state.purchaseProducts.length; i++) {
      if (state.purchaseProducts[i].name == data.name) {
        index = i;
      }
    }

    if (existingItem) {
      existingItem.quantity++;
      existingItem.cartNumber++;
    } else {
      data.quantity = 1;
      state.cartPurchases.push(data);
      state.purchaseProducts[index] = data;
    }

    state.purchaseProperties.totalQuantity++;
    state.purchaseProperties.totalAmount += data.buyingUnitPrice * 1;
  },

  REMOVE_FROM_PURCHASE(state, data) {
    // if (state.cartType == "Sales") {
    //   state.cartProducts = [];
    //   state.purchaseProperties.totalAmount = 0;
    //   state.purchaseProperties.totalQuantity = 0;
    //   state.cartType = "Purchase";
    //   return;
    // }
    let index = null;

    for (let i = 0; i < state.purchaseProducts.length; i++) {
      if (state.purchaseProducts[i].name == data.name) {
        index = i;
      }
    }

    for (let i = 0; i < state.cartPurchases.length; i++) {
      if (state.cartPurchases[i].name == data.name) {
        if (state.cartPurchases[i].quantity > 1) {
          state.cartPurchases[i].quantity--;
          state.purchaseProducts[index] = state.cartPurchases[i];
        } else {
          state.cartPurchases[i].quantity = 0;
          state.purchaseProducts[index] = state.cartPurchases[i];
          state.cartPurchases.splice(i, 1);
        }
        state.purchaseProperties.totalQuantity--;
        state.purchaseProperties.totalAmount -= data.buyingUnitPrice;
      }
    }

    if (state.cartPurchases.length > 0) {
      state.showPurchase = true;
    } else {
      state.showPurchase = false;
    }
  },

  ADD_PROMO(state, data) {
    // CHECK IF THE GIVEN PRODUCT EXIST IN THE CART
    const existingItem = state.cartProducts.find(
      (item) => item.id === data.id && item.type == "Promo"
    );
    const promo = state.promos.find((item) => item.id === data.id);
    const product = state.products.find(
      (item) => item.id === data.id && item.type == "Product"
    );
    let existProduct = null;
    if (product) {
      existProduct = state.cartProducts.find(
        (item) => item.id === product.id && item.type == "Product"
      );
    }

    let index = null;

    // GET THE INDEX OF THE SELECTED PRODUCT IN THE PRODUCTS ARRAY
    for (let i = 0; i < state.products.length; i++) {
      if (state.products[i].id == data.id) {
        index = i;
      }
    }

    if (existingItem) {
      existingItem.quantity++;
      existingItem.cartNumber++;
      product.quantity++;
    } else if (!existingItem && !existProduct) {
      data.quantity = 1;
      state.cartProducts.push(data);
      state.promos[index] = data;
      product.quantity = 1;
    } else if (!existingItem && existProduct) {
      promo.quantity++;
      product.quantity++;
    }

    state.purchaseProperties.totalQuantity++;
    state.purchaseProperties.totalAmount += data.sellingPrice * 1;
  },

  REMOVE_PROMO(state, data) {
    let index = null;
    for (let i = 0; i < state.promos.length; i++) {
      if (state.promos[i].id == data.id) {
        index = i;
      }
    }

    const existingItem = state.cartProducts.find(
      (item) => item.id === data.id && item.type == "Promo"
    );
    const product = state.products.find((item) => item.id === data.id);
    const promo = state.promos.find((item) => item.id === data.id);
    const existProduct = state.cartProducts.find(
      (item) => item.id === product.id && item.type == "Product"
    );

    if (existingItem && !existProduct) {
      reduceItems(state, data, index);
      product.quantity--;
    } else if (!existingItem && existProduct) {
      reduceItems(state, product, index);
      promo.quantity--;
    }
  },

  CLEAR_CART(state, commit) {
    state.cartProducts = [];
    state.cartProperties.totalQuantity = 0;
    state.cartProperties.totalAmount = 0;

    const products = state.products;
    const items = [];
    for (let x = 0; x < products.length; x++) {
      products[x].check = false;
      products[x].cartNumber = 0;
      products[x].quantity = 0;
      items.push(products[x]);
    }

    state.products = items;
  },

  CLEAR_PURCHASE(state, commit) {
    state.cartPurchases = [];
    state.purchaseProperties.totalQuantity = 0;
    state.purchaseProperties.totalAmount = 0;

    const products = state.purchaseProducts;
    const items = [];
    for (let x = 0; x < products.length; x++) {
      products[x].check = false;
      products[x].cartNumber = 0;
      products[x].quantity = 0;
      items.push(products[x]);
    }

    state.purchaseProducts = items;
  },

  CHECK_ALL(state, checked) {
    const newArray = [];
    if (checked) {
      state.productSettings.forEach((el) => {
        el.checked = true;
        newArray.push(el);
      });
      state.selectedProductSettings = state.productSettings;
    } else {
      state.productSettings.forEach((el) => {
        el.checked = false;
        newArray.push(el);
      });
      state.selectedProductSettings = [];
    }

    state.productSettings = newArray;
  },

  RESET_CART(state) {
    resetCart(state.productArray, state);
  },

  TOGGLE_CART(state) {
    state.isShowingCart = !state.isShowingCart;
  },

  TOGGLE_PURCHASE(state) {
    state.isShowingPurchaseCart = !state.isShowingPurchaseCart;
  },

  HIDE_CART(state) {
    state.isShowingCart = false;
  },

  CONFIRM_CHECKOUT(state, payload) {
    const { msg, id } = payload;
    state.confirmBoxMsg = msg;
    state.showConfirmBox = true;
    state.confirmBoxId = id;
  },

  TOGGLE_PRODUCT(state, int) {
    state.productSettings[int].checked = !state.productSettings[int].checked;

    const product = state.productSettings[int];
    const exists = state.selectedProductSettings.some(
      (obj) => obj._id === product._id
    );
    if (!exists) {
      state.selectedProductSettings.push(product);
    } else {
      state.selectedProductSettings = state.selectedProductSettings.filter(
        (obj) => obj._id !== product._id
      );
    }
  },

  UPDATE_CART(state, userState) {
    const newCartArray = [];
    const products = [];
    let amount = 0;
    for (let i = 0; i < state.cartProducts.length; i++) {
      const product = setProductPrice(state.cartProducts[i], userState);
      newCartArray.push(product);
      amount += product.productSellingPrice * 1;
    }
    for (let i = 0; i < state.productArray.length; i++) {
      products.push(setProductPrice(state.productArray[i], userState));
    }
    state.cartProducts = newCartArray;
    state.productArray = products;
    state.purchaseProperties.totalAmount = amount;
  },

  SET_USER_STATE(state, userState) {
    if (userState != undefined) {
      state.userState = userState.state;
    }
  },

  TOGGLE_INITIALS(state) {
    state.initials = !state.initials;
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

  async GET_CATEGORY_PRODUCTS({ commit }, data) {
    try {
      const response = await this.$axios.get(
        `/products/?productCategories=${data}`
      );
      commit("SET_CATEGORY_PRODUCTS", response.data.data);
    } catch (error) {
      // Handle errors if necessary
    }
  },

  async GET_PROMO_PRODUCTS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_PROMO_PRODUCTS", result.data);
  },

  async GET_PRODUCTS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_PRODUCTS", result.data);
  },

  async GET_PURCHASE_PRODUCTS({ dispatch, commit }, url) {
    const result = await dispatch("MAKE_GET", url);
    commit("SET_PURCHASE_PRODUCTS", result.data);
  },

  INITIALIZE_APP({ commit, dispatch }) {
    dispatch("GET_PRODUCTS", "/products/?limit=40&page=1&sort=name");
    dispatch("GET_PURCHASE_PRODUCTS", "/products/?limit=40&page=1&sort=name");
    dispatch("GET_PROMO_PRODUCTS", "/products/?limit=20&page=1&isPromo=1");
  },
};
