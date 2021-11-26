<template>
  <nav
    class="navbar navbar-expand-lg fixed-top bg-nav p-1 d-flex justify-content-between"
  >
    <div class="navitem">
      <router-link
        class=" text-dark
 navbar-brand p-2"
        to="/"
      >
        <span class="shop-name">
          xxstudiotw
        </span>
      </router-link>
    </div>
    <div class="navitem">
      <div class="search-container d-flex align-items-center">
        <input
          type="text"
          id="search-bar"
          class="search-bar"
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
    </div>
    <div class="navitem">
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
    </div>
    <div class="navitem">
      <div id="navbarSupportedContent" class="navbar-collapse collapse">
        <div class="p-1 d-flex align-items-center justify-content-end">
          <div class="mr-2">
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
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "../../commons/helpers";

export default {
  name: "Navbar",
  data() {
    return {
      searchinput: ""
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
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {},
    logout() {
      this.$store.commit("setLogout", {});
      Toast.fire({ icon: "success", title: "Logout Success" });
      this.$router.push("/signin");
      global.auth.logout();
    },
    handleSearch() {
      // eventBus.$emit('emit-data', this.searchinput)
    }
  }
};
</script>

<style scoped>
#navbarSupportedContent {
  font-family: "Noto Sans TC", sans-serif;
}
</style>
