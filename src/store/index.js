import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoppingCart: []
  },
  mutations: {
    setShoppingCart(state, data) {
      // 設置購物車狀態
      const addCart = { ...data, amount: 1 }
      state.shoppingCart.push(addCart);
    },
    setShippingFee(state, shippingfee) {
      state.shoppingCart = { ...state.shoppingCart, shippingfee }
    },
    setTotalCost(state, total) {
      state.shoppingCart = { ...state.shoppingCart, total }
    },
  },
  actions: {
  },
  modules: {
  }
})
