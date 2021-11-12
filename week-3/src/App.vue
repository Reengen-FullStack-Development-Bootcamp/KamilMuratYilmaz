<template>
  <v-app>
    <v-app-bar app color="warning" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-4"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-row>
          <strong>Exchange-Market </strong>
        </v-row>
      </div>

      <v-spacer></v-spacer>
      <v-btn fab color="white">
        <router-link to="/admin" style="color: black">Admin</router-link>
      </v-btn>
      <v-btn fab>
        <router-link to="/" style="color: white">Home</router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  watch: {
    $route(to, from) {
      let routeTrack = {
        name: `${new Date().toLocaleString("en-US")}`,
        children: [
          { name: `From : ${from.fullPath}` },
          { name: `To : ${to.fullPath}` },
        ],
      };
      this.$store.commit("TRACK_ROUTE", routeTrack);
      console.log(routeTrack);
    },
  },
};
</script>
