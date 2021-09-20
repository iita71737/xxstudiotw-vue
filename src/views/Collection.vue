<template>
  <div class="container py-5">
    <collection-detail :initial-collection="item" />
    <!-- 餐廳評論 RestaurantComments -->
    <!-- 新增評論 CreateComment -->
  </div>
</template>

<script>
import CollectionDetail from "../components/CollectionDetail.vue";
import jsonfile from "./../../public/dummyData.json";

const dummyData = jsonfile;

export default {
  name: "Collection",
  components: {
    CollectionDetail
  },
  data() {
    return {
      item: ""
    };
  },
  created() {
    const { id: itemId } = this.$route.params;
    this.fetchItem(itemId);
  },
  methods: {
    fetchItem(itemId) {
      console.log("fetch id: ", itemId);

      dummyData.accessories.filter(item => {
        if (item.id == itemId) {
          this.item = { ...item };
        }
      });
    }
  }
};
</script>
