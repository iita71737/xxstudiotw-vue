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
        @change-cart="afterCartChange"
      />
    </div>
  </div>
</template>

<script>
import Quotes from "../components/Quotes.vue";
import NavTabs from "./../components/NavTabs.vue";
import Slider from "./../components/Slider.vue";
import CollectionCard from "../components/CollectionCard.vue";
import jsonfile from "./../../public/dummyData.json";

const dummyData = jsonfile;

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
      handler: function() {
        console.log(this.collections); //測試用
      },
      deep: true
    }
  },
  created() {
    this.fetchCollections();
  },
  methods: {
    fetchCollections() {
      this.collections = dummyData.accessories;
      //console.log(this.collections);
    },
    afterCartChange(itemA) {
      this.collections = this.collections.map(item => {
        if (item.id == itemA.id) {
          return itemA;
        }
        return item;
      });
      console.log(this.collections);
    }
  }
};
</script>
