<template>
  <div class="container">
    <h1>
      404 Page Not Found
    </h1>
    <div class="home">
      <div class="cart">
        cart
      </div>

      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball" v-show="ball.show">
          <div class="innerBall">
            <i class="iconfont icon-xingxing"></i>
          </div>
        </div>
      </transition>

      <div class="menu" @click.stop="addToCart($event)">
        menu
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      ball: {
        el: null,
        show: false
      }
    }
  },
  methods: {
    beforeEnter (el) {
      const ele = this.ball.el // 要添加购物车的商品
      const ract = ele.getBoundingClientRect() // 商品的位置
      const elRight = this._getStyle(el, 'right') // 购物车 right
      const elTop = this._getStyle(el, 'top') // 购物车 top
      console.log('fixed right:', elRight, 'fixed top:', elTop)
      const x = window.innerWidth - ract.left - parseFloat(elRight) // 计算小球移动的X轴的距离
      const y = ract.top - parseFloat(elTop) // 计算小球移动的y轴的距离
      console.log('x:', x, 'y:', y)

      console.log(el)
      el.style.display = ''
      el.style.transform = `translateY(${y}px)` // 重置小球的x轴位置

      const innerBall = el.querySelector('.innerBall')
      innerBall.style.transform = `translateX(-${x}px)` // 重置小球的y轴位置
    },
    enter (el, done) {
      this._offset = document.body.offsetHeight // 激发重绘

      el.style.transform = 'translate(0, 0)' // 小球沿着y轴移动到购物车

      const innerBall = el.querySelector('.innerBall')
      innerBall.style.transform = 'translate(0, 0)' // 小球沿着x轴移动到购物车

      el.addEventListener('transitionend', done)
    },
    afterEnter (el) {
      this.ball.show = false
      el.style.display = 'none'
    },
    addToCart (event) {
      this.ball.el = event.target
      this.ball.show = true
    },
    _getStyle (el, attr) {
      return el.currentStyle
        ? el.currentStyle[attr]
        : getComputedStyle(el, false)[attr]
    }
  }
}
</script>

<style lang="scss" scoped>
.ball,
.cart {
  border: solid 3px rgb(201, 29, 135);
  position: fixed;
  right: 100px;
  top: 100px;
}
.cart {
  border: 1px solid rgb(0, 0, 0);
  padding: 5px 12px;
}
.ball {
  width: 10px;
  height: 10px;
  transition: all 1.5s cubic-bezier(0.31, 1.09, 0.77, 0.14);
}
.innerBall {
  color: rebeccapurple;
  border-radius: 50%;
  border: solid 5px rebeccapurple;
  width: 50px;
  height: 50px;
  transition: all 1.5s linear;
}
.menu {
  position: absolute;
  top: 500px;
  left: 50px;
  border: 1px solid rgb(0, 0, 0);
  padding: 5px 12px;
  cursor: pointer;
}
</style>
