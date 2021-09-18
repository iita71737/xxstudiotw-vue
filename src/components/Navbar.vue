<template>
  <nav class="navbar navbar-expand-lg fixed-top bg-nav">
    <router-link
      class=" text-dark
 navbar-brand p-2 ml-auto"
      to="/"
    >
      <span class="shop-name">
        xxstudiotw
      </span>
    </router-link>

    <form class="search-container d-flex align-items-center">
      <input
        type="text"
        id="search-bar"
        placeholder="What can I help you with today?"
      />
      <a href="#"
        ><img
          class="search-icon"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
      /></a>
    </form>

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

    <div id="navbarSupportedContent" class="navbar-collapse collapse ">
      <div
        class="d-flex 
 ml-auto align-items-center"
      >
        <!-- is user is admin -->
        <router-link v-if="currentUser.isAdmin" to="#" class="text-dark p-2">
          管理員後台
        </router-link>

        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <router-link to="#" class="text-dark mr-3 p-2">
            使用者 您好
          </router-link>
          <button type="button" class="btn btn-sm btn-success my-2 my-sm-0">
            登出
          </button>
          <router-link to="{ name: 'cart' }" class="text-dark mr-3 p-2">
            <i class="fas fa-shopping-cart"
              ><span class="m-1">購物車 </span>
            </i>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
// ./src/components/Navbar.vue
// seed data
const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true
  },
  isAuthenticated: true
};

export default {
  // Vue 會在沒有資料時使用此預設值
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        email: "",
        image: "",
        isAdmin: false
      },
      isAuthenticated: false
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.currentUser = { ...this.currentUser, ...dummyUser.currentUser };
      this.isAuthenticated = dummyUser.isAuthenticated;
    }
  }
};
</script>

<style scoped>
#navbarSupportedContent {
  font-family: "Noto Sans TC", sans-serif;
}
</style>
