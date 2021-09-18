<template>
  <div id="xxstudiotw">
    <Navbar />
    <main role="main" class="container bg-white">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 70px;
}
</style>
