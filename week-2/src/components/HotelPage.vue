<template>
  <div id="hotel-page">
      <b-card
          :title= "hotelInfo.name"
          :img-src= "require(`@/assets/${hotelInfo.image}`)"
          img-alt="Image"
          class="img-size"
        >
          <b-form-rating no-border v-model="hotelInfo.assestment" 
                  readonly color="black" class="stars"></b-form-rating>
            <b-col class="address">
            <strong>Address: {{hotelInfo.address}}</strong>
            </b-col>
            <!-- How many customers? -->
            <b-form-spinbutton id="sb-inline" v-model="customerCount" inline class="spin-button"></b-form-spinbutton>
              <!-- Reservoir Between which dates? | Start -->
                <div  class="datepicker">
                  <div class="w-50">
                    <b-form-datepicker id="checkin-datepicker" v-model="dateIn" :min="minDate" class="datepicker-item m-2" selected-variant="danger"
                    placeholder="Checkin Date" locale="en"></b-form-datepicker>
                    <p> <b> Check in: '{{ dateIn }}'</b></p>
                    </div>
                    <div class="w-50">
                    <div v-if="dateOut>=dateIn">
                      <b-form-datepicker id="checkout-datepicker" v-model="dateOut" :min="dateIn" class="datepicker-item m-2" selected-variant="danger"
                      :state="true" :disabled="dateIn==null" placeholder="Checkout Date" locale="en"></b-form-datepicker>
                      <p> <b> Check out: '{{ dateOut }}'</b></p>
                    </div>
                    <div v-else>
                      <b-form-datepicker id="checkout-datepicker" v-model="dateOut" :min="dateIn" class="datepicker-item m-2" selected-variant="danger"
                      :state="false" placeholder="Checkout Date" locale="en"></b-form-datepicker>
                      <p> <b> Check out date must be at later date</b></p>
                    </div>
                    </div>
                </div>
              <!-- Reservoir Between which dates? | End -->
                
            <div>
              <div>
                   <strong v-if="dateIn" class="total-day"> Reserve for {{priceDueDate(dateIn, dateOut)}} Days </strong>
              </div>
            <strong class="total-price"> Total Price ${{hotelInfo.price * customerCount * priceDueDate(dateIn, dateOut)}} </strong>
            <b-button class="button" @click="goReservationPage();"
            :disabled="checkDate" >Reservation</b-button>
            </div>
        </b-card>
  </div>
</template>

<script>
import hotelData from "@/hotelData.json"
export default {
name: "HotelPage",
props:{
  id: {
    type: String,
    required: true,
    },

},

  data() {

      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)

        return {
            hotelInfo: hotelData.hotels[this.id-1],
            customerCount: 1,
            dateIn: null,
            dateOut: null,
            totalPrice: null,
            minDate:minDate,
            dayStayed:1,
        }
    },

methods: {
   goReservationPage(){
      this.totalPrice = (this.hotelInfo.price * this.customerCount * this.dayStayed);
      this.$router.push({name: 'Reservation', 
      params:{customerCount:this.customerCount, totalPrice:this.totalPrice, dayStayed: this.dayStayed}})
    },

    priceDueDate(dateIn, dateOut) {
      this.dayStayed = 1;
      if (dateIn && dateOut){
       dateIn = dateIn.split("-")
       dateOut = dateOut.split("-")
        if (dateOut[2] - dateIn [2] == 0)
          this.dayStayed = 1;
        else if (dateOut[2] - dateIn [2] > 1)
          this.dayStayed = dateOut[2] - dateIn [2];
      }
      return this.dayStayed;
    },
},

computed: {
  getCustomerCount(){
    return console.log("Customer:",this.customerCount);
  },

  checkDate() {
    if ((this.dateOut>=this.dateIn) && this.dateOut != null)
      return false
    else
      return true
  },
},

}

</script>

<style>
.datepicker{
  display: flex;
  width: 100%;
}

.datepicker-item{
  background-color: #fffdf6;
  border: none;
  color: #494949;
}

.spin-button{
  background-color: #fffdf6;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: #494949;
  border-radius: 20px;
}

.bottom-side{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.img-size{
  display: inline-block;
  margin: 10px;
  padding: 0;
  max-width: 60%;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.button{
  background-color: #494949;
  color: whitesmoke;
  border: none;
  border-radius: 20px;
  margin-left: 30%;
  width: 20%;
}

.stars{
  background-color: #faf6e9;
  color: #494949;
  margin: 30px;
}

.total-price {
  font-size:larger;
  color: black;
}

</style>