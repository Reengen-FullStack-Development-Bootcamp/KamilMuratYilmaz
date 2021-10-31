<template>
  <div>
    <b-form-group
      ref = "validateForm"
      style="
      background-color: #494949;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
      class="m-4">
     
    <!-- Name -->
    <b-col class="my-4">
        <b-form-input
            v-model="$v.name.$model"
            placeholder="Name"
            :state="$v.name.$error ? false : null"
        />
        <div class="error"></div>
        <b-alert :show="!$v.name.minLength" variant="danger">Name must have at least {{ $v.name.$params.minLength.min }}
          letters.
        </b-alert>
      </b-col>
      <!-- Age -->
      <b-col class="my-4">
        <b-form-input
            v-model="$v.age.$model"
            placeholder="Age"
            :state="$v.age.$error ? false : null"
        />
        <b-alert :show="!$v.age.minValue" variant="danger">Must be  {{ $v.age.$params.minValue.min }} or higher</b-alert>
      </b-col>
      <!-- Gender -->
      <b-col class="my-4">
        <b-form-select
            v-model="$v.gender.$model"
            :options="[{value: null, text: 'Please select your Gender(Optional)'},
            {value:'male',text:'Male'},
            {value:'female',text:'Female'},
            {value:'other',text:'Other'},]"
        />
      </b-col>
      <!-- Email -->
      <b-col class="my-4">
        <b-form-input
            v-model="$v.email.$model"
            placeholder="Email"
            :state="!$v.email.email ? false :null"
        />
      </b-col>
      <!-- Turkish Identification Number -->
      <b-col class="my-4">
        <b-form-input
            v-model.trim="$v.turkishID.$model"
            placeholder="Turkish Identification Number"
            :state="$v.turkishID.$error ? false : null"
        />
      </b-col>
      <!-- HES Code | Used for COVID health check in Turkey -->
      <b-col class="my-4">
        <b-form-input
            v-model="$v.hesCode.$model"
            placeholder="HES Code"
            :state="$v.hesCode.$error ? false : null"
        />
        <b-alert :show="$v.hesCode.$error" class="alert">Please insert as XXXX-XXX-XX with hyphens</b-alert>
      </b-col>
      <!-- Telephone Number -->
      <b-col class="my-4">
        <b-form-input
            v-model="$v.tel.$model"
            placeholder="Telephone"
            :state ="$v.tel.$error ? false : null"
        />
      </b-col>
      <div id="validation-alert"
       v-show="!$v.$invalid" 
       class="valid-sign">
       Customer Applied </div>

       <b-button
        @click="validCustomers"
        ref= "validButton"
        class="register-button"
        :disabled= "$v.$invalid">
        Click</b-button>
        
      </b-form-group>
  </div>
</template>

<script>
import {customerValidation} from "@/mixins/CustomerValidation.js"

export default {
name: "CustomerForm",
mixins:[customerValidation],

data(){
  return {
    validCount:0,
  }
},

methods:{
validCustomers() {
  this.validCount++
  this.$refs.validButton.style.background  ="black"
  this.$refs.validButton.textContent = "Reserved"
  this.$emit('validCustomers', this.validCount);
}

}

}

</script>

<style>
.register-button {
  background-color: green;
  border: none;
  margin-bottom: 15px;
  margin-top: 15px;
}

.valid-sign {
  background-color: green ;
  color: #faf6e9;
  border: none;
}

.form-control {
  background-color: #faf6e9;
}

.custom-select {
  background-color: #faf6e9;
}

.alert{
  padding: 3px;
}
</style>