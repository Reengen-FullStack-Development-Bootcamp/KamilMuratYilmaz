<template>
  <div>
        <b-button v-b-modal.modal-center>Open First Modal</b-button>

        <b-modal id="modal-center" size="lg" centered title="Payment" ok-only no-stacking>
            <p class="my-2">Payment Section</p>
            <b-button v-b-modal.modal-multi-2>OK</b-button>
        </b-modal>

        <b-modal id="modal-multi-2" centered title="Two Factor Validation" ok-only no-stacking>
            <p class="my-2">Please Insert Your Password Received with SMS or Email</p>
            <div class="d-flex"><input type="text">
            <b-button v-b-modal.modal-multi-3 size="sm" style="margin-left:5px">OK</b-button></div>
        </b-modal>

        <b-modal id="modal-multi-3" size="sm" centered title="Reservation Successfull" ok-only>
            <p class="my-1">Thank You For Choosing Us | Company Name</p>
        </b-modal>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>