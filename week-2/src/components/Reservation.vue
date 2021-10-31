<template>
  <div>
    <h4 style="background-color:#232b2b; color:#faf6e9"> {{customerCount}} Customer | {{dayStayed}} Days |  ${{totalPrice}} Total Price </h4>
    <b-col>
    <div class="d-flex">
        <CustomerForm  @validCustomers="validCounted($event)" v-for="(customer) in customerCount" :key="customer" />
    </div>
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
    validCounted(e) {
      if(e)
      this.validCustomers ++
      return this.validCustomers
    },

    goPayment() {
      console.log(this.validCustomers);
    }
  }
}
</script>

<style>
.payment-button{
  background-color: green;
  border: none;
  border-radius: 10px;
  width: 50%;
}

</style>