<template>
  <v-card elevation="2">
    <v-card-title class="justify-center">
      {{ this.$store.state.companySymbol }} -
      {{ this.$store.state.companyKeyword }}
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>Daily</v-chip>

        <v-chip>Weekly</v-chip>

        <v-chip>Monthly</v-chip>
      </v-chip-group>
    </v-card-actions>
    <CandleStickGraph />
  </v-card>
</template>

<script>
import CandleStickGraph from "@/components/CandleStickGraph.vue";
export default {
  name: "Chart",
  components: {
    CandleStickGraph,
  },
  data: () => ({
    selection: 0,
  }),
  watch: {
    selection() {
      console.log(this.selection);
      switch (this.selection) {
        case 0:
          this.$router.push({
            name: "Chart",
            params: { id: this.$route.params.id },
            query: { view: "daily" },
          });
          break;
        case 1:
          this.$router.push({
            name: "Chart",
            params: { id: this.$route.params.id },
            query: { view: "weekly" },
          });
          break;
        case 2:
          this.$router.push({
            name: "Chart",
            params: { id: this.$route.params.id },
            query: { view: "monthly" },
          });
          break;
      }
    },
  },
};
</script>
