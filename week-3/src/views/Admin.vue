<template>
  <v-container>
    <Form :hidden="false" />
    <Panel />
  </v-container>
</template>

<script>
import Form from "../components/admin/Form.vue";
import Panel from "../components/admin/Panel.vue";
export default {
  name: "Admin",
  components: {
    Form,
    Panel,
  },
};
</script>

<style></style>
