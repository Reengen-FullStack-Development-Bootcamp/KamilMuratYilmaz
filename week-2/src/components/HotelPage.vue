<template>
  <div id="hotel-page">
    <!-- Card | Start -->
      <b-card
          :title= "hotelInfo.name"
          :img-src= "require(`@/assets/${hotelInfo.image}`)"
          img-alt="Image"
          class="img-size"
        >
        <!-- Hotel Assestment | Start -->
          <b-form-rating no-border v-model="hotelInfo.assestment" 
                  readonly color="black" class="stars"></b-form-rating>
            <b-col class="address">
            <strong>Address: {{hotelInfo.address}}</strong>
            </b-col>
             <!-- Hotel Assestment | End -->

            <!-- How many customers? => Spin Select-->
            <b-form-spinbutton id="sb-inline" v-model="customerCount" inline class="spin-button"></b-form-spinbutton>

              <!-- Reserve Between which dates? | Start -->
                <div  class="datepicker">
                  <div>
                    <b-form-datepicker id="checkin-datepicker" v-model="dateIn" :min="minDate" class="datepicker-item" selected-variant="danger"
                    placeholder="Check in Date" locale="en"></b-form-datepicker>
                    <p> <b> Check in: '{{ dateIn }}'</b></p>
                    </div>
                    <div>
                      <!-- check out > check in ? state:true : state:false -->
                    <div v-if="dateOut>=dateIn">
                      <!-- Disable if check in not selected -->
                      <b-form-datepicker id="checkout-datepicker" v-model="dateOut" :min="dateIn" class="datepicker-item" selected-variant="danger"
                      :state="true" :disabled="dateIn==null" placeholder="Check out Date" locale="en"></b-form-datepicker>
                      <p> <b> Check out: '{{ dateOut }}'</b></p>
                    </div>
                    <div v-else>
                      <b-form-datepicker id="checkout-datepicker" v-model="dateOut" :min="dateIn" class="datepicker-item" selected-variant="danger"
                      :state="false" placeholder="Check out Date" locale="en"></b-form-datepicker>
                      <p> <b> Check out date must be at later date</b></p>
                    </div>
                    </div>
                </div>
              <!-- Reserve Between which dates? | End -->
                
                <!--Information About Prefences | Start  -->
            <div>
                <div>
                <strong v-if="dateIn" class="total-day"> Reserve For {{customerCount}} Person to Stay {{getDays}} Days </strong>
                </div>
                <strong class="total-price"> Total Price ${{calcTotalPrice}} </strong>
                <!--Information About Prefences | End  -->

                <!-- Route to Reservation Button -->
                <b-button class="button" @click="goReservationPage();"
                :disabled="checkDate" >Reservation</b-button>
            </div>
        </b-card>
        <!-- Card | End -->
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
    // Date for datepicker element
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)

        return {
            hotelInfo: hotelData.hotels[this.id-1],
            customerCount: 1,
            dateIn: null,
            dateOut: null,
            minDate:minDate, // Customer cant pick  earlier dates, with minDate variable datepicker checks that.
            dayStayed:1,
            
        }
    },

methods: {
  // Route to Reservation.vue
   goReservationPage(){
      this.$router.push({name: 'Reservation', 
      params:{customerCount:this.customerCount, totalPrice:this.calcTotalPrice, dayStayed: this.dayStayed}})
    },
// How many days stayed? Returns for computed property.
    daysStayed(dateIn, dateOut) {
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

  // Console log how many people reserved.
  getCustomerCount(){
    return console.log("Customer:",this.customerCount);
  },
// If check out date selected; check out > check in ? enable reserve button : disable
  checkDate() {
    if ((this.dateOut>=this.dateIn) && this.dateOut != null)
      return false
    else
      return true
  },
// How many days will be stayed for? This function is used in HTML template
  getDays() {
    let value = this.daysStayed(this.dateIn, this.dateOut)
    return value
  },
  // Total Price calculation
  calcTotalPrice(){
     let totalPrice = (this.hotelInfo.price * this.customerCount * this.getDays)
    return totalPrice
  }
},


}

</script>

<style>
.datepicker{
  display: block;
}

.datepicker-item{
  background-color: #fffdf6;
  border: none;
  color: #494949;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  justify-content: space-evenly;
  
}

.img-size{
  display: inline-block;
  margin: 10px;
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
  width: 10rem;
}

.stars{
  background-color: #faf6e9;
  color: #494949;
}

.total-price {
  font-size:larger;
  color: black;
}

.total-day {
  margin-bottom: 10px;
}

.s1{
  font-size: large
}

.s2{
  margin-left: 30px;
}

.form-control.is-valid {
  padding-right: 10px !important;
}

@media screen 
  and (max-width: 375px) 
  and (max-height: 812px)  {

.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.s1{
  margin-left: 0px;
}
.s2{
  margin-left: 5px;
}
.button {
  margin-left: 10px !important;
}
.img-size{
  max-width: 100%;
}

.form-control.is-valid {
  padding-right: 10px !important;
}


}
</style>