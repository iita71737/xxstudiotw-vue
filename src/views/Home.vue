<template>
  <div>
    <div class="d-flex justify-content-center">
      <img src="./../assets/img/brand.webp" alt="" />
    </div>
    <NavTabs />
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";

export default {
  name: "Home",
  components: {
    NavTabs
  }
};
</script>
