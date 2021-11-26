<template>
  <Loading :isLoading="isLoading" />
  <div class="m-3" v-if="!isLoading">
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
      item: {},
      isLoading: false
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  watch: {
    id: async function(val) {
      this.item = await this.fetchItem(val);
    }
  },
  async created() {
    const { id: itemId } = this.$route.params;
    this.item = await this.fetchItem(itemId);
  },
  methods: {
    async fetchItem(itemId) {
      try {
        this.isLoading = true;
        return await axios.get("/accessories").then(response => {
          response.data.filter(item => {
            if (item.id === parseInt(itemId)) {
              this.item = { ...item };
              //console.log("this.item====>:", this.item);
            }
          });
          this.isLoading = false;
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
};
</script>
