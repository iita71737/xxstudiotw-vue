<template>
  <div>
    <div class="d-flex justify-content-center">
      <img src="./../assets/img/brand.webp" alt="" />
    </div>
    <NavTabs />
    <Slider />
    <quotes />
    <Collections />
  </div>
</template>

<script>
import Quotes from "../components/Quotes.vue";
import NavTabs from "./../components/NavTabs.vue";
import Slider from "./../components/Slider.vue";
import Collections from "./../components/Collections.vue";

export default {
  name: "Home",
  components: {
    NavTabs,
    Slider,
    Quotes,
    Collections
  }
};
</script>
