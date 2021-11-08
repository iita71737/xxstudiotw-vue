<template>
  <nav class="navbar navbar-expand-lg fixed-top bg-nav">
    <router-link
      class=" text-dark
 navbar-brand p-2"
      to="/"
    >
      <span class="shop-name">
        xxstudiotw
      </span>
    </router-link>

    <div class="search-container d-flex align-items-center">
      <input
        type="text"
        id="search-bar"
        placeholder="What u want to search?"
        v-model="searchinput"
        @keyup.enter="handleSearch"
      />
      <a href="#"
        ><img
          @click="handleSearch()"
          class="search-icon"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
      /></a>
    </div>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div
        class="d-flex align-items-center justify-content-around
"
      >
        <div class="p-2">
          <!-- is user is admin -->
          <router-link v-if="currentUser.isAdmin" to="#" class="text-dark p-2">
            管理員後台
          </router-link>

          <!-- is user is login -->
          <template v-if="currentUser.nickname">
            {{ currentUser.nickname }} ，您好
            <button
              type="button"
              class="btn btn-sm btn-success m-2 my-sm-0"
              @click="logout()"
            >
              登出
            </button>

            <router-link :to="{ name: 'checkout' }" class="text-dark m-2 p-2">
              <i class="fas fa-shopping-cart"
                ><span class="m-1">購物車 </span>
              </i>
            </router-link>
          </template>
          <template v-if="!currentUser.nickname">
            訪客，您好
            <router-link to="/signin" class="text-white mr-3">
              <button type="button" class="btn btn-sm btn-success m-2 my-sm-0">
                登入
              </button>
            </router-link>

            <router-link :to="{ name: 'checkout' }" class="text-dark m-2 p-2">
              <i class="fas fa-shopping-cart"
                ><span class="m-1">購物車 </span>
              </i>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import eventBus from "../../commons/eventBus";

export default {
  name: "Navbar",
  data() {
    return {
      currentUser: "",
      isAuthenticated: false,
      searchinput: ""
    };
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
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      if (global.auth.getToken) {
        this.currentUser = global.auth.getUser() || {};
        if (this.currentUser !== null) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      }
    },
    logout() {
      global.auth.logout();
      this.isAuthenticated = false;
      this.$router.push("/signin");
      this.$router.go();
    },
    handleSearch() {
      eventBus.$emit("emit-data", this.searchinput);
    }
  }
};
</script>

<style scoped>
#navbarSupportedContent {
  font-family: "Noto Sans TC", sans-serif;
}
</style>
