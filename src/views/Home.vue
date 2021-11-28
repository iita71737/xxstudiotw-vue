<template>
  <div>
    <Noty />
    <div class="d-flex justify-content-center">
      <img src="./../assets/img/brand.webp" alt="" />
    </div>
    <NavTabs />
    <Slider />
    <quotes />
    <div class="row">
      <CollectionCard
        class="col m-2"
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
import emitter from "@/methods/eventBus";

import Noty from "../components/Noty.vue";

export default {
  name: "Home",
  components: {
    NavTabs,
    Slider,
    Quotes,
    CollectionCard,
    Noty
  },

  data() {
    return {
      collections: "",
      copy_products: ""
    };
  },
  watch: {
    collections: {
      handler(val, oldVal) {
        //console.log("val, oldVal", val, oldVal);
      },
      deep: true
    }
  },
  created() {
    this.fetchCollections();
    emitter.on("emit-data", text => {
      console.log(text);
      let _products = [...this.copy_products];
      _products = _products.filter(p => {
        const matchArray = p.name.match(new RegExp(text, "gi"));
        return !!matchArray;
      });
      this.collections = _products;
    });
  },
  methods: {
    async fetchCollections() {
      try {
        await axios
          .get("/accessories")
          .then(response => {
            //console.log(response.data);
            this.collections = response.data;
            this.copy_products = response.data;
          })
          .catch(() => {
            this.emitter.emit("push-message", {
              type: "error",
              message: "發生錯誤，請重新整理頁面"
            });
          });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
};
</script>
