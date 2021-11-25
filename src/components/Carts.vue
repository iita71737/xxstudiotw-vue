<template>
  <div class="form-cart" id="cart-order">
    <h4 class="cart-title">購物籃</h4>
    <div class="cart" id="cart">
      <!--  cart items to be redered  -->
      <div class="cart-item" v-for="item in shoppingCart" :key="item.id">
        <img :src="item.image[1]" alt="itempic" />
        <div class="item-info">
          <div class="item-info-left">
            <span class="item-title">{{ item.name }}</span>
            <div class="item-quantity" id="item.id">
              <div class="minus" @click="changeMoney(item, -1)">
                <i class="fas fa-minus"></i>
              </div>
              <div class="item-amount">{{ item.amount }}</div>
              <div class="plus" @click="changeMoney(item, 1)">
                <i class="fas fa-plus"></i>
              </div>
            </div>
          </div>
          <div class="item-info-right">
            <span class="total-amount">${{ item.price * item.amount }}</span>
            <span class="single-price">單價{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-shipping-charge">
      <span>運費</span>
      <span id="shipping-fee">${{ this.shippingCost }}</span>
    </div>
    <div class="cart-total-charge">
      <span>小計</span>
      <strong
        >$ {{ totalMoney + this.shippingCost }} <span id="total-charge"></span
      ></strong>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Carts',
  props: {
    shippingCost: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      totalMoney: 0
    }
  },
  computed: {
    ...mapState(['shoppingCart'])
  },
  methods: {
    changeMoney (item, number) {
      if (number > 0) {
        item.amount++
      } else {
        item.amount--
        if (item.amount < 1) {
          // 限制数量最少为1
          item.amount = 1
        }
      }

      this.calcTotalPrice() // 每次改变商品数量就调用计算总金额函数
      this.$store.commit('updateprodsInfo', item)
    },
    calcTotalPrice () {
      this.totalMoney = 0
      for (const i in this.shoppingCart) {
        this.totalMoney += Number(
          this.shoppingCart[i].amount * this.shoppingCart[i].price
        )
      }
      this.$emit('after-change-amount', this.totalMoney)
    }
  },
  created () {
    this.calcTotalPrice()
  }
}
</script>
