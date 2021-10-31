<template>
  <div id = "hotelCard">
    <b-container>
        <b-row class="d-flex justify-content-around">
          <b-card 
          v-for="(hotel,i) in hotelInfo"
          :key="i"
          :title= "hotel.name"
          :img-src= "require(`@/assets/${hotel.image}`)"
          img-alt="Image"
          class="img-size"
        >
          <div class ="bottom-side">
          <b-form-rating no-border v-model="hotel.assestment" 
                  readonly color="black" class="stars"></b-form-rating>
            <b-col class="d-inline">
              <strong style="font-size: large"> <i class="fas fa-map-marker-alt"></i> {{hotel.city}}</strong>
              <strong style="margin-left: 30px;"> Price:${{hotel.price}} </strong>
              <b-button class="button" @click="goHotelPage(hotel.id)">&rsaquo;</b-button>
            </b-col>
          </div>
        </b-card>
      </b-row>
   </b-container>   
  </div>
</template>

<script>
import hotelData from "@/hotelData.json"
export default {
name: "HotelCard",
  data() {
        return {
            hotelInfo: hotelData.hotels,
        }
    },
  
  methods: {
    goHotelPage(hotelID){
      this.$router.push({path: '/hotel/' + hotelID,})
    },
  }
}
</script>

<style>

.bottom-side{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.img-size{
  display: flex;
  background-color: #faf6e9;
  margin: 10px;
  padding: 0;
  border-radius: 8px;
}

.card-img{
  border-top-left-radius: calc(9.25rem - 1px);
  border-top-right-radius: calc(9.25rem - 1px);
  border-bottom-left-radius: calc(9.25rem - 1px);
  border-bottom-right-radius: calc(9.25rem - 1px);
}



</style>