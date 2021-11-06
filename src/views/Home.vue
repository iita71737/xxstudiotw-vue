<template>
  <div>
    <div class="d-flex justify-content-center">
      <img src="./../assets/img/brand.webp" alt="" />
    </div>
    <NavTabs />
    <Slider />
    <quotes />
    <div class="row">
      <CollectionCard
        v-for="item in collections"
        :key="item.id"
        :initial-collection="item"
      />
    </div>
  </div>
</template>

<script>
import Quotes from "../components/Quotes.vue";
import NavTabs from "./../components/NavTabs.vue";
import Slider from "./../components/Slider.vue";
import CollectionCard from "../components/CollectionCard.vue";
import axios from "../../commons/axios";

export default {
  name: "Home",
  components: {
    NavTabs,
    Slider,
    Quotes,
    CollectionCard
  },
  data() {
    return {
      collections: ""
    };
  },
  watch: {
    collections: {
      handler: function() {},
      deep: true
    }
  },
  created() {
    this.fetchCollections();
  },
  methods: {
    fetchCollections() {
      axios.get("/accessories").then(response => {
        //console.log(response.data);
        this.collections = response.data;
      });

      //console.log(this.collections);
    }
  }
};
</script>
