<template>
  <router-link :to="`/collection/${item.id}`">
    <div class="card-deck">
      <div class="card text-white col">
        <img class="card-img" :src="item.image[1]" />
        <div class="card-img-overlay">
          <h2 class="card-title">{{ item.name }}</h2>
          <p class="card-text">
            xxstudiotw
          </p>
          <button
            v-if="!item.isInCart"
            type="button"
            class="btn btn-light
            btn-border favorite mr-2"
            @click.stop.prevent="addCart(item.id, $event)"
          >
            加入購物車
          </button>
          <button
            v-if="item.isInCart"
            type="button"
            class="btn btn-light
            btn-border favorite mr-2"
            @click.stop.prevent="removeCart(item.id)"
          >
            從購物車移除
          </button>
        </div>
        <img
          v-show="elTop"
          ref="addImg"
          class="addCartAnimation"
          :style="{ top: `${elTop}px`, left: `${elLeft}px` }"
          :src="item.image[1]"
        />
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Colllection",
  props: {
    initialCollection: {
      type: Object,
      required: true
    }
  },
  inject: ["emitter"],
  data() {
    return {
      item: this.initialCollection,
      elTop: 0,
      elLeft: 0
    };
  },
  computed: {
    ...mapState(["shoppingCart"])
  },
  methods: {
    addCart(id, event) {
      this.item = { ...this.item, isInCart: true, amount: 1 };
      this.$store.commit("addToCart", this.item);
      if (event) {
        const addImg = event.target.parentNode.nextElementSibling;
        // console.log("event.target:", event.target);
        // console.log("addImg:", addImg);
        addImg.classList.add("show");

        this.elTop = event.target.getBoundingClientRect().top;
        this.elLeft = event.target.getBoundingClientRect().left;
        // console.log("x,y:", this.elTop, this.elleft);

        setTimeout(() => {
          addImg.classList.add("move");
        }, 10);
        setTimeout(() => {
          addImg.classList.remove("move", "show");
        }, 1000);
      }
      this.emitter.emit("push-message", {
        type: "success",
        message: "已加入購物車"
      });
    },
    removeCart(itemId) {
      this.item = {
        ...this.item,
        isInCart: false
      };
      this.$store.commit("removeFormCart", itemId);
    }
  }
};
</script>

<style lang="scss" scoped>
.addCartAnimation {
  position: fixed;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
}
.addCartAnimation.show {
  opacity: 1;
}
.addCartAnimation.move {
  left: calc(100% - 100px) !important;
  top: calc(100% - 850px) !important;
  animation: addscale 1.5s linear 1.5s forwards;
  transition: all 1s cubic-bezier(0.31, 1.09, 0.77, 0.14);

  /* @include media-breakpoint-up(sm) {
    left: calc(100% - 64px) !important;
    top: calc(100% - 152px) !important;
  } */
}
@keyframes addscale {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

.material-icons {
  vertical-align: text-bottom;
}
</style>
