<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-nav">
    <div class="container-fluid ">
      <router-link
        class=" text-dark
  navbar-brand p-2"
        to="/"
      >
        <span class="shop-name">
          xxstudiotw
        </span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse navbar-section"
        id="navbarSupportedContent"
      >
        <div
          class="search-container d-flex align-items-center justify-content-start"
        >
          <input
            type="search"
            id="search-bar"
            class="search-bar form-control
          me-2"
            placeholder="What u want to search?"
            v-model="searchText"
            @keyup="handleSearch"
          />
          <div class="search-icon">
            <img
              @click="handleSearch()"
              class="search-icon"
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
            />
          </div>
        </div>

        <div class="func-section">
          <div class="item me-5">
            <!-- is user is admin -->
            <router-link v-if="isAuthenticated" to="/" class="text-dark">
              <i class="fas fa-user-circle"></i>

              管理員後台
            </router-link>
            <!-- is user is login -->
            <template v-if="currentUser.email">
              <span> {{ currentUser.nickname }} ，您好</span>
              <button
                type="button"
                class="btn btn-sm btn-success m-1 my-sm-0"
                @click="logout()"
              >
                <i class="fas fa-user-circle"></i>
              </button>
            </template>
            <template v-else>
              <i class="fas fa-user-circle"></i>
              訪客，您好
              <router-link :to="`/signIn`" class="text-white mr-3">
                <i class="fas fa-sign-in-alt"></i>
              </router-link>
            </template>
          </div>

          <div class="item ms-5">
            <div class="p-2">
              <router-link :to="`/checkout`" class="text-dark">
                <i class="fas fa-shopping-cart"
                  ><span class="m-1">購物車 </span>
                </i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "../../commons/helpers";
import emitter from "@/methods/eventBus";

export default {
  name: "Navbar",
  data() {
    return {
      searchText: ""
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  watch: {
    currentUser: {
      handler: function() {},
      deep: true
    },
    searchinput: {
      handler: function() {
        this.handleSearch();
      }
    }
  },
  created() {},
  methods: {
    logout() {
      this.$store.commit("setLogout", {});
      Toast.fire({ icon: "success", title: "Logout Success" });
      this.$router.push("/signin");
      global.auth.logout();
    },
    handleSearch() {
      emitter.emit("emit-data", this.searchText);
    }
  }
};
</script>

<style scoped>
#navbarSupportedContent {
  font-family: "Noto Sans TC", sans-serif;
}

.search-icon {
  cursor: pointer;
  margin-left: 5px;
}

.func-section {
  display: flex;
  align-items: baseline;
}

@media screen and (max-width: 414px) {
  .navbar-section {
    display: flex;
    flex-direction: column;
  }
  .func-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
