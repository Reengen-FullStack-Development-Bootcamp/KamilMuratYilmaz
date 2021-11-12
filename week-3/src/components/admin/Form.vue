<template>
  <v-form ref="form" v-model="isAdmin" lazy-validation>
    <v-text-field
      v-model="admin"
      :counter="10"
      :rules="adminRules"
      label="Admin User"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="[passwordRules, passwordCorrectRule]"
      type="password"
      label="Password"
      required
    ></v-text-field>
    <v-btn color="success" class="mr-4" @click="validate"> Sign In </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    isAdmin: false,
    admin: "admin",
    adminRules: [(v) => !!v || "Admin User is required"],
    password: "123456",
    passwordRules: [(v) => !!v || "Password is required"],
  }),
  computed: {
    passwordCorrectRule() {
      return () => this.password === "123456" || "Password must match";
    },
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.isAdmin = true;
        console.log(this.isAdmin);
      } else {
        this.isAdmin = false;
        this.$store.commit("ALERT", true);
        this.$router.go();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
