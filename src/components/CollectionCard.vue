<template>
  <router-link :to="{ name: 'collection', params: { id: item.id } }">
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
            @click.stop.prevent="addCart(item.id)"
          >
            加入購物車
            <svg-icon
              data_iconName="car"
              className="car_icon"
              style="width:1.5rem;height:1.5rem"
            ></svg-icon>
          </button>
          <button
            v-else
            type="button"
            class="btn btn-light
            btn-border favorite mr-2"
            @click.stop.prevent="removeCart(item.id)"
          >
            從購物車移除
          </button>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in showMoveDot" :key="index">
      <div class="move_dot" ref="ball" v-if="item"></div>
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
  data() {
    return {
      showMoveDot: [], //控制下落的小圆点显示隐藏
      item: this.initialCollection
    };
  },
  computed: {
    ...mapState(["shoppingCart"])
  },
  methods: {
    addCart() {
      this.item = { ...this.item, isInCart: true, amount: 1 };
      this.$store.commit("addToCart", this.item);
      this.showMoveDot = [...this.showMoveDot, true];
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
