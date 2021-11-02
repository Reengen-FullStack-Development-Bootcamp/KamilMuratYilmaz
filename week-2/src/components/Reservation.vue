<template>
  <div id= "reservation">
    <h4 style="background-color:#232b2b; color:#faf6e9"> {{customerCount}} Customer | {{dayStayed}} Days |  ${{totalPrice}} Total Price </h4>
    <b-col>
    <div class="customer-form">
        <CustomerForm  @validCustomers="validCounted($event)" v-for="(customer) in customerCount" :key="customer" />
    </div>
    <!-- If all validated forms equals to customers show payment modal -->
        <PaymentModal v-if="validCustomers == customerCount" />
    </b-col>
  </div>
</template>

<script>
import PaymentModal from "@/components/PaymentModal.vue"
import CustomerForm from "@/components/CustomerForm.vue"
export default {
  name: "Reservation",
  props:["customerCount", "totalPrice", "dayStayed"],
  components:{
    CustomerForm,
    PaymentModal,
    },

  data() {
    return {
      validCustomers : 0
    }
  },

  methods:{
    // Get validated customer count from $emit and return all forms that validated
    validCounted(e) {
      if(e)
      this.validCustomers ++
      return this.validCustomers
    },
  }
}
</script>

<style>
  .customer-form{
    display: flex;
  }

.payment-button{
  background-color: green;
  border: none;
  border-radius: 10px;
  width: 50%;
}

@media only screen 
  and (max-width: 375px) 
  and (max-height: 812px) {
    
  .customer-form {
    display: inline-block;
  }
}

</style>