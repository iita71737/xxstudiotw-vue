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
          </button>
          <button
            v-else
            type="button"
            class="btn btn-light
            btn-border favorite mr-2"
            @click.stop.prevent="removeCart"
          >
            從購物車移除
          </button>
        </div>
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
  data() {
    return {
      item: this.initialCollection
    };
  },
  computed: {
    ...mapState(["shoppingCart"])
  },
  methods: {
    addCart(itemId) {
      this.item = {
        ...this.item,
        isInCart: true
      };
      if (this.shoppingCart.length !== 0) {
        this.shoppingCart.map(item => {
          if (item.id !== itemId) {
            this.$store.commit("setShoppingCart", this.item);
          }
          return;
        });
      } else {
        this.$store.commit("setShoppingCart", this.item);
      }
    },
    removeCart() {
      this.item = {
        ...this.item,
        isInCart: false
      };
      this.$store.commit("setShoppingCart", this.item);
    }
  }
};
</script>
