<template>
  <router-link :to="{ name: 'collection', params: { id: item.id } }">
    <div class="card-deck">
      <div class="card text-white col">
        <img class="card-img" :src="item.image.img1" />
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
            @click.stop.prevent="addCart"
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
  methods: {
    addCart() {
      this.item = {
        ...this.item,
        isInCart: true
      };
    },
    removeCart() {
      this.item = {
        ...this.item,
        isInCart: false
      };
    }
  }
};
</script>
