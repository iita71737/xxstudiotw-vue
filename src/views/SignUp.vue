<template>
  <div class="container py-5">
    <form class="w-100 form-container" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
          v-model="name"
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
          v-model="email"
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
          v-model="password"
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
          v-model="passwordcheck"
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">
            Sign In
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import axios from "../../commons/axios";
import { Toast } from "../../commons/helpers";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordcheck: ""
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // TODO: 向後端驗證使用者登入資訊是否合法
        if (this.password === this.passwordcheck) {
          const res = await axios.post("/auth/register", {
            nickname: this.name,
            email: this.email,
            password: this.password,
            type: 0
          });
          console.log(res);
          const jwToken = res.data;
          global.auth.setToken(jwToken);
          Toast.fire({ icon: "success", title: "Sign Up Success" });
          this.$router.push("/");
          this.$router.go();
        }
      } catch (error) {
        // 將密碼欄位清空
        this.password = "";
        this.passwordcheck = "";
        // 顯示錯誤提示
        Toast.fire({
          icon: "warning",
          title: "Sign Up Failed"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  font-size: 2em;
  font-family: "Cormorant Garamond", serif;
}
</style>
