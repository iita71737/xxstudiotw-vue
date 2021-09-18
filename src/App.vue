<template>
  <div id="xxstudiotw">
    <Navbar />
    <main role="main" class="container bg-white">
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 70px;
}
</style>
