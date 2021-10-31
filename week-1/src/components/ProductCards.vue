<template>

  <div id ="card">    
    <b-container>
      <!-- Positioning Card Items | Start -->
      <b-row class="d-flex justify-content-around">
        <!-- Product Card Template | Start -->
        <b-card
        :title="productInfo.model"
        :img-src="productInfo.image"
        img-alt="Image"
        tag="shoe"
        class="img-size"
         >
              <!-- Bottom Side of the Card -->
        <div class ="bottom-side">
            <!-- Assestment Stars and Buttons | Start-->
          <div>
            <b-form-rating no-border v-model="productInfo.assestment" 
            readonly :color="productInfo.color" class="img-size"></b-form-rating>
              <!-- Button Group Starts Here -->
            <div class="btn-group">
            <button class="sizeButton" v-for="(shoeSize,index) in productInfo.priceDueSize" :key="index" 
              :style="{backgroundColor}"
              @click="getPriceFromSize(shoeSize); size = shoeSize.size">
              {{shoeSize.size}}</button>
            </div> 
             <!-- Button Group Ends Here -->
            </div>  
            <!-- Assestment Stars and Buttons | End-->

              <!-- Price Display and Quantity Buttons | Start-->
          <div>     
            <p v-if="calcPrice==0 || quantity==0" class="priceDisplay"
            :style="{color}"><strong>
            Select Size </strong></p>

            <p v-if="calcPrice>0 && quantity>0" class="priceDisplay"
            :style="{color}"><strong>
            Total: ${{calcPrice}} </strong></p>
             <div style="display:flex" id="button--row" v-if="calcPrice>0 && quantity>0">
               <!-- if product size is not selected don't display, if size selected quantity++ -->
              <button class="quantityButton" @click="subtract"
              :style="{backgroundColor}">
              -</button>
              <p style="margin-bottom:0; padding: 5px" :style="{color}"><strong>{{ quantity }}</strong></p>
              <button class="quantityButton" @click="add"
              :style="{backgroundColor}">
               + </button>
            </div>

            <button class="addButton" v-if="calcPrice>0 && quantity>0"
            :style="{backgroundColor}"
            @click="addToCart(); quantity = 1">
            Add to Cart</button> 
          </div>
              <!-- Price Display and Quantity Buttons | End-->
        </div>
                    <!-- Bottom Side Ends -->    
       </b-card>
       <!-- Product Card Template | End -->
      </b-row>
      <!-- Positioning Card Items | Start -->
    </b-container>          

  </div>
</template>

<script>

export default {

    name: 'ProductCards',
    props: ["productInfo"],

data() {
  return {
      price: 0,
      quantity:1,
      backgroundColor: this.productInfo.color,  // To Create Background Color Due to Product Color
      color: this.productInfo.color,
      size:null,
      }
  },

computed:{
 // Total Price Calculation
  calcPrice(){
    if(this.quantity>1){ // If Quantity == 0 then there's Nothing to Sell
      return this.price*this.quantity; // Price of 1 Item and * Quantity
    }return this.price
  },

},

methods:{
  // Price Choosed with the Size of the Product
  getPriceFromSize(item){
    if(this.quantity>0)
    this.price = item.price;
    else{
      this.price = 0;
      this.quantity = 1;
    }
    return this.price
  },
  // Product Info Collected With the addToCart Button and emitted to Parent Component App.vue
  addToCart(){
        let product = {
          id: this.productInfo.id,
          color: this.productInfo.color,
          size: this.size,
          price: this.price,
          image: this.productInfo.image,
          quantity: this.quantity
        }
    this.$emit("cart",product)
  },
  // Add function for Quantity Button
  add(){
    return this.quantity++;
  },
  // Substract function for Quantity Button
  subtract(){
    if(this.quantity <= 0){
      return this.quantity =0;
    } else{
      return this.quantity--;
    }
  }

  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.bottom-side{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.img-size{
  display: flex;
  margin: 10px;
  padding: 0;
  max-width: 35rem;
  border-radius: 8px;
  background-color: whitesmoke;
}
.card-title{
  height: 60px;
}

.addButton{
  border: none;
  color: whitesmoke;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 20px;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
}
.addButton:hover{
  background-color: black !important;
  color: whitesmoke;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.sizeButton{
  display: inline-block;
  border: none;
  color:whitesmoke;
  text-align: center;
  box-sizing: border-box;
  padding: 5px;
  margin: 0px 2px;
  font-size: 20px;
  border-radius: 7px;
}
.sizeButton:hover{
  background-color: whitesmoke !important;
  color: black;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.priceDisplay{
  display: flex;
  font-size: 20px;
  text-align: end;
}

.quantityButton{
  display: inline-block;
  border: none;
  color:whitesmoke;
  text-align: center;
  box-sizing: border-box;
  padding: 2px 9px;
  margin: 4px 8px;
  font-size: 15px;
  border-radius: 6px;
}
.quantityButton:hover{
  background-color: whitesmoke !important;
  color: black;
}
</style>