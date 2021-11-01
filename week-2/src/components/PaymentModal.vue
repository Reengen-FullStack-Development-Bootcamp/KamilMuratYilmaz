<template>
  <div>
        <b-button v-b-modal.modal-center class="btn.btn-primary">Payment</b-button>

        <b-modal id="modal-center" centered title="Payment" ok-only hide-footer="true" no-stacking>
            <b-form-group>
            <b-col class="my-4">
            <b-form-input
            placeholder="Address"
                />
            </b-col>
            <b-col class="my-4">
            <b-form-input
            placeholder="Credit Card ID"
                />
            </b-col>
            <b-col class="my-4">
            <b-form-input
            placeholder="Card Owner Name"
                />
            </b-col>
            </b-form-group>
            <b-button v-b-modal.modal-multi-2 class="modal-button">OK</b-button>
        </b-modal>

        <b-modal id="modal-multi-2" centered title="Two Factor Validation" ok-only hide-footer="true" no-stacking>
            <b-form-input
            placeholder="Please Insert Your Password Received with SMS or Email"
                />
            <div>
            <b-button @click="closeModal" class="modal-button">OK</b-button>
            </div>
        </b-modal>
</div>
</template>

<script>
export default {
    data() {
        return{
        }
    },

    methods: {
        // End last modal by @click
    closeModal() {
        this.$bvModal.msgBoxOk('Thank You For Choosing Us | Company Name', {
          title: 'Reservation Successfull',
          size: 'sm',
          buttonSize: 'sm',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })

    },
    },

}
</script>

<style>
.btn.btn-primary{
    background-color: #faf6e9;
    color: #494949;
    border: none;
    
}

.modal-content{
    background-color: #494949;
}

.modal-button{
    display: flex;
    margin-top: 8px;
    justify-content: space-between;
    float: right;
    background-color:#faf6e9;
    color: #494949;
    border: none;
}

.modal-title {
    margin-bottom: 0;
    line-height: 1.5;
    color: #faf6e9 ;
}

.modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
    color: #faf6e9;
}


</style>