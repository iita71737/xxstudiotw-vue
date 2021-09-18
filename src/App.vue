<template>
  <div id="xxstudiotw">
    <Navbar />
    <main role="main" class="m-5 bg-white">
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
