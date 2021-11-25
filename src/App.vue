<template>
  <div id="xxstudiotw">
    <Navbar :page="page" />
    <main role="main" class="container bg-white p-2">
      <router-view :key="$route.path" ></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import emitter from '@/methods/eventBus';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      page: '',
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  updated() {
    this.page = this.$route.name;
  },
  mounted() {
    this.page = this.$route.name;
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
}
</style>
