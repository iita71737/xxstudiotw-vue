<template>
  <div>
    <div class="d-flex justify-content-center">
      <img src="./../assets/img/brand.webp" alt="" />
    </div>
    <NavTabs />
    <Slider />
    <quotes />
    <div class="row cards">
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
import eventBus from "../../commons/eventBus";

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
      collections: "",
      copy_products: ""
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
    this.getFromBrother();
  },
  methods: {
    fetchCollections() {
      axios.get("/accessories").then(response => {
        console.log(response.data);
        this.collections = response.data;
        this.copy_products = response.data;
      });
    },
    getFromBrother() {
      eventBus.$on("emit-data", text => {
        console.log(text);
        let _products = [...this.copy_products];
        _products = _products.filter(p => {
          const matchArray = p.name.match(new RegExp(text, "gi"));
          return !!matchArray;
        });
        this.collections = _products;
      });
    }
  }
};
</script>
