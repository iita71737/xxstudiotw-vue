<template>
  <Swiper
    :loop="false"
    :spaceBetween="10"
    :navigation="false"
    :thumbs="{ swiper: thumbsSwiper }"
    class="mySwiper2"
  >
    <SwiperSlide
      ><img :src="product.image[0]" :alt="product.name"
    /></SwiperSlide>
    <SwiperSlide v-for="(img, index) in product.image" :key="index">
      <img :src="product.image[index]" :alt="product.name" />
    </SwiperSlide>
  </Swiper>
  <Swiper
    @swiper="setThumbsSwiper"
    :loop="false"
    :spaceBetween="10"
    :slidesPerView="6"
    :freeMode="true"
    :watchSlidesVisibility="true"
    :watchSlidesProgress="true"
    class="mySwiper"
  >
    <SwiperSlide
      ><img :src="product.image[0]" :alt="product.name"
    /></SwiperSlide>
    <SwiperSlide v-for="(img, index) in product.image" :key="index">
      <img :src="product.image[index]" :alt="product.name" />
    </SwiperSlide>
  </Swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import "../assets/scss/component/_swiper.scss";

SwiperCore.use([Navigation, Thumbs]);

export default {
  props: {
    product: Object
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      thumbsSwiper: null
    };
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    }
  }
};
</script>

<style lang="scss" scoped>
.mySwiper2 {
  height: 360px;
  width: 100%;
}
</style>
