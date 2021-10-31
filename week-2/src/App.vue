<template>
  <div id="app">
    <b-navbar class="navbar-main">
      <!-- Navbar Items | Start -->
      <b-navbar-nav    >
        <!-- Brand | Home -->
        <b-navbar-brand href="/" style="color:#faf6e9">
        <img src= "@/assets/logo.png" alt="logo" style="display: inline-block; max-width:10%">
        Home/Company Name
        </b-navbar-brand>
        <!-- Help -->
        <b-nav-item> <h4 style="color:#faf6e9">Help</h4></b-nav-item>
        </b-navbar-nav>
        <!-- Hotel Listing -->
        <b-navbar-nav class="ml-auto">
        <router-link  to="/hotelCard" class="router-link"> Best Hotels </router-link>
        </b-navbar-nav>
        <!-- Navbar Items | End -->
    </b-navbar>
    <!-- Navbar | End -->

     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },

  watch:{
    $route(to,from){
      console.log(to, from)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0;
  background-color: #fffdf6;
}

.navbar{
  background-color: #494949;
  color: #faf6e9;
}

.router-link{
  font-family: "Courier New", Courier, monospace;
  background-color: #494949;
  color: #ece8d9;
  font-size: 40px;
}
</style>
