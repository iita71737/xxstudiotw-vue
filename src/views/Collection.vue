<template>
  <div class="m-3" v-if="item">
    <collection-detail :initial-collection="item" />
  </div>
</template>

<script>
import CollectionDetail from "../components/CollectionDetail.vue";
import axios from "../../commons/axios";

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
    async fetchItem(itemId) {
      try {
        console.log("fetch id: ", itemId);
        await axios.get("/accessories").then(response => {
          response.data.filter(item => {
            if (item.id === itemId) {
              this.item = { ...item };
            }
          });
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
};
</script>
