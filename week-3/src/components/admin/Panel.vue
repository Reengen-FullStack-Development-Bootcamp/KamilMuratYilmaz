<template>
  <v-container>
    <v-treeview dense hoverable :items="routeTrack">
      <template v-slot:label="{ item }">
        <span v-if="item.warning" style="color: red">
          {{ item.name }}
        </span>
        <span v-else>
          {{ item.name }}
        </span>
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Panel",

  computed: {
    ...mapState(["alertStatus"]),
    ...mapState(["routeTrack"]),
  },
};
</script>

<style></style>
