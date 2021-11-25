import { createStore } from 'vuex'

export default createStore({
  state: {
    shoppingCart: JSON.parse(localStorage.getItem('XXcart') || '[]'),
    currentUser: {
    },
    isAuthenticated: false
  },
  mutations: {
    addToCart(state, product) {
      // 判断是否已存在
      let flag = false
      state.shoppingCart.some(item => {
        if (item.id === product.id) {
          item.amount += parseInt(product.amount)
          flag = true
          return true
        }
      })
      // 不存在,则添加
      if (!flag) {
        state.shoppingCart.push(product)
      }
      // 更新本地的localStorage
      localStorage.setItem('XXcart', JSON.stringify(state.shoppingCart))
    },
    // 购物车界面删除商品
    removeFormCart(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.shoppingCart.some((item, i) => {
        if (item.id === id) {
          state.shoppingCart.splice(i, 1)
          return true
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('XXcart', JSON.stringify(state.shoppingCart))
    },
    // 购物车种更新商品的购买数量
    updateprodsInfo(state, product) {
      state.shoppingCart.some(item => {
        if (item.id === product.id) {
          item.amount = product.amount
        }
      })
      localStorage.setItem('XXcart', JSON.stringify(state.shoppingCart))
    },
    setShippingFee(state, shippingfee) {
      state.shoppingCart = { ...state.shoppingCart, shippingfee }
    },
    setTotalCost(state, total) {
      state.shoppingCart = { ...state.shoppingCart, total }
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
    },
    setLogout(state, currentUser) {
      state.currentUser = {}
    },
  },
  actions: {

  },
  modules: {
  }
})
