<template>
  <v-container>
    <v-card color="orange lighten" dark>
      <v-card-title class="text-h5 orange lighten-3 justify-center">
        Search for Exchange Market
      </v-card-title>
      <v-card-text>
        Explore hundreds of company market data ! For more information visit
        <a
          class="grey--text text--lighten-3"
          href="https://github.com/toddmotto/public-apis"
          target="_blank"
          >the GitHub repository</a
        >.
      </v-card-text>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="searchResults == null ? [] : searchResults"
          :search-input.sync="searchInput"
          color="white"
          hide-no-data
          hide-selected
          item-text="name"
          item-value="symbol"
          label="Search Market"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model" class="orange lighten-3">
          <v-list-item v-for="(field, i) in fields" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="field.value"></v-list-item-title>
              <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
          Clear
          <v-icon right> mdi-close-circle </v-icon>
        </v-btn>
        <v-btn @click="selectCompany(model.symbol)">
          List Chart
          <v-icon right> mdi-update </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <router-view></router-view>
  </v-container>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "MarketSearch",
  data: () => ({
    searchInput: null,
    model: null,
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    ...mapState(["searchResults", "companyKeyword"]),
  },
  methods: {
    ...mapActions(["getCompanySearchResult"]),
    ...mapMutations(["SET_COMPANY_KEYWORD"]),

    selectCompany(companySymbol) {
      this.$router.push({
        name: "Chart",
        params: { id: companySymbol },
        query: { view: "daily" },
      });
    },
  },
  watch: {
    searchInput() {
      if (this.searchInput.length >= 4) {
        this.$store.commit("SET_COMPANY_KEYWORD", this.searchInput);
        this.$store.dispatch("getCompanySearchResult");
      }
    },
  },
  created() {
    if (this.$route.params.id && this.searchResults === []) {
      this.getCompanySearchResult(this.$route.params.id);
    }
  },
};
</script>
