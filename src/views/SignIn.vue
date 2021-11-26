<template>
  <div class="container py-5">
    <form class="w-100 form-container" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
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
          autocomplete="current-password"
          required
          v-model="password"
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>

      <div class="text-center mb-3">
        <router-link to="/signup">
          Sign Up
        </router-link>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2021-2022
      </p>
    </form>
  </div>
</template>

<script>
import axios from '../../commons/axios'
import { Toast } from '../../commons/helpers'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 email 和 password'
          })
          return
        }
        this.isProcessing = true
        const response = await axios.post('/auth/login', {
          email: this.email,
          password: this.password
        })
        //console.log('response====>:',response)
        const jwToken = response.data
        global.auth.setToken(jwToken)
        const { status } = response
        
        this.$store.commit('setCurrentUser', global.auth.getUser() || {})
        // TODO: 取得 API 請求後的資料
      
        if (status !== 200) {
          throw new Error(response.message)
        }

        Toast.fire({ icon: 'success', title: 'Login Success' })
        this.$router.push({ path: '/' })
      } catch (error) {
        // 將密碼欄位清空
        this.password = ''
        // 顯示錯誤提示
        Toast.fire({
          icon: 'warning',
          title: '帳號或密碼錯誤'
        })
        this.isProcessing = false
        console.log('error', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10px;
}

.form-container {
  font-size: 2em;
  font-family: "Cormorant Garamond", serif;
}
</style>
