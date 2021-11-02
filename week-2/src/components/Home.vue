<template>
  <div id="home">
    <div>
  <h1 style="text-align:center; margin-top: 400px;">WELCOME TO BEST HOTELS</h1>
  <h2 style="text-align:center; margin-top: 40px;">Click Best Hotels For Listing</h2>
</div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },

}

</script>

<style>
#home {
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
@media only screen
and (max-width: 375px) 
and (max-height: 812px) {
  
.router-link{
  font-size: 20px;
}

.h1, h1{
  margin-top: 200px !important;
}

.h2, h2{
margin-top: 40px !important;
}

}
</style>
