<template>
  <nav
    class="navbar navbar-expand-lg navbar-light fixed-top bg-nav d-flex justify-content-between"
  >
    <div class="container-fluid">
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="search-container d-flex align-items-center">
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

        <div class="mr-2 d-flex align-items-center justify-content-between">
          <div>
            <!-- is user is admin -->
            <router-link v-if="isAuthenticated" to="/" class="text-dark p-2">
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
                登出
              </button>
            </template>
            <template v-else>
              訪客，您好
              <router-link :to="`/signIn`" class="text-white mr-3">
                <button
                  type="button"
                  class="btn btn-sm btn-success m-1 my-sm-0"
                >
                  登入
                </button>
              </router-link>
            </template>
          </div>

          <div>
            <div class="p-1 d-flex align-items-center justify-content-end">
              <div class="mr-2">
                <router-link :to="`/checkout`" class="text-dark m-2 p-2">
                  <i class="fas fa-shopping-cart"
                    ><span class="m-1">購物車 </span>
                  </i>
                </router-link>
              </div>
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
</style>
