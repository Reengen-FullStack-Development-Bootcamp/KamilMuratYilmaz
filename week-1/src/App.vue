<template>
  <div id="app">
    <!-- Creating navbar with It's assets -->
      <div class="topnav">
      <a class="passive" href="#home"><strong>Company Name | Home</strong>
      <img src= "./assets/logo.png" alt="logo" style="display: inline-block; max-width:8%"></a>
      <a class="active" href="#news"><i class="fa fa-fw fa-search"></i>News</a>
      <a class="active" href="#contact"><i class="fa fa-fw fa-envelope"></i>Contact</a>
      <a class="active" href="#about"><i class="fa fa-fw fa-user"></i>About</a>

      <!-- This is the right side of the navbar for dropdown assets -->
      <div class="dropdown">
          <button class="cartbtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-cart4" viewBox="0 0 20 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
          </svg> Cart
          </button>

          <!-- Checking Cart and Displaying Products at Shoping Cart -->
          <div v-for="(item, i) in productsInCart" :key="i"> 
              <div class="dropdown-content" v-if="item.price>0 && item.quantity>0">
                <div class="align">
                    <img class="img-product" :src= "item.image"> 
                    Size: {{item.size}}
                  <button class="quantityButton" @click="item.quantity--"> - </button>
                      <strong>{{ item.quantity }}</strong>
                  <button class="quantityButton" @click="item.quantity++"> + </button>
                   <strong>${{ item.price*item.quantity }}</strong>
                  <button class="quantityButton" @click="item.quantity=0"> X </button>
                </div>
              </div>
          </div>
       </div>
       <!-- Added to Cart Alert -->
       <b-alert v-show ="alert" variant="success" show dismissible fade=true>Added to Cart</b-alert>
  </div>
  
          <div v-show="totalPrice>0" class="total-price">Total: ${{totalPrice}}</div>

    <!-- Getting ProductCards.vue items with v-for -->
    <b-row class="d-flex flex-row justify-content-around">
    <ProductCards v-for="(products,index) in productInfoList" :key="index" :productInfo="products" @cart="addToCart"/>
    </b-row>

  </div>
</template>

<script>
import ProductCards from '@/components/ProductCards.vue'
import {productData} from "./data/data.js"

export default {
  name: 'App',
  components: {
    ProductCards,
  },
  
  data() {
    return {
      productInfoList: productData, // Gets the data from data.js file
      productsInCart:[], // This array collects the data from child component with the addToCart function.
      alert:false, // Alert boolean for the feedback to user.
    }
  },

computed:{
  totalPrice(){
      if(this.productsInCart.length>0){
        return this.productsInCart.map(item=>item.price*item.quantity).reduce((a,b)=>a+b)
      }else{
        return 0
      }
    },
},

methods:{
    // addToCart function is getting the child items with cart emit, for further knowledge check addToCart funct. at ProductCards.vue
    addToCart(e){
      let isAdded=null;
      isAdded = this.productsInCart.find(product=> 
      product.id==e.id && product.color==e.color && product.size==e.size)
      if(!isAdded){
        this.productsInCart.push(e)
      }else{
        isAdded.quantity+=e.quantity
      }
      this.alert=true
      setTimeout(() => { // Feedback section
        this.alert=false
      }, 1000);
    },
  },
  
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

  .topnav {
  overflow: hidden;
  background-color: #f2f2f2;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  transition: 500ms;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.passive {
  background-color: whitesmoke;
  padding: 14px 16px;
  color: black;
}

.topnav a.active {
  background-color: whitesmoke;
  padding: 18px 16px;
  color: black;
}

.topnav a.active:hover {
  background-color: rgb(39, 39, 39);
  color: rgb(216, 216, 216);
  animation: mymove 0.7s ;
}

.dropdown {
  overflow: hidden;
  position: relative;
}

.cartbtn {
  float: right;
  font-size: 17px;
  border: none;
  color: black;
  padding: 15px 25px;
  background-color: inherit;
  font-family: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
}

.dropdown:hover .cartbtn {
  float: right;
  background-color: rgb(39, 39, 39);
  color: rgb(216, 216, 216);
  animation: mymove 0.7s ;
}

.dropdown-content {
  display: none;
  z-index: 1;
}

.dropdown-content .align {
  float: right;
  display: block;
}


.dropdown:hover .dropdown-content {
  float: right;
  display: block ;
}

.quantityButton{
  border: none;
  background-color: rgb(39, 39, 39);
  color:rgb(216, 216, 216);
  text-align: center;
  padding: 2px 8px;
  margin: 10px 5px;
  font-size: 15px;
  border-radius: 6px;
}
.dropdown:hover .quantityButton{
  background-color: rgb(39, 39, 39) ;
  color: rgb(216, 216, 216);
}

.img-product {
  width: 10%;
  padding: 0px 10px;
  object-fit: cover;
  vertical-align: -webkit-baseline-middle;
}
@keyframes mymove {
  40% {background-color: rgb(216, 216, 216); color: black; border-radius: 70px;}
}

.total-price{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  padding:0;
  color:rgb(216, 216, 216) ;
  background-color: rgb(39, 39, 39);
  animation: troll 0.7s ;
}

@keyframes troll {
  40% {background-color: rgb(216, 216, 216);}
}


</style>
