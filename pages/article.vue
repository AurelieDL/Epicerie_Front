<template>
  <v-contain>
    <v-btn block nuxt to="/articleForm"> Ajouter un article </v-btn>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="products" :search="search">
        <template #[`item.price_ht`]="{ item }">
          <p>{{ item.price_ht }} €</p>
        </template>
        <template #[`item.status.name`]="{ item }">
          <v-chip v-if="item.status.id === 3" color="red">{{
            item.status.name
          }}</v-chip>

          <v-chip v-if="item.status.id === 1" color="green">{{
            item.status.name
          }}</v-chip>

          <v-chip v-if="item.status.id === 2" color="orange">{{
            item.status.name
          }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-contain>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nom",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Quantité", value: "quantity" },
        { text: "Emballage", value: "packaging" },
        { text: "Prix HT", value: "price_ht" },
        { text: "TVA", value: "tva" },
        { text: "Marge", value: "margin_rate" },
        { text: "Status", value: "status.name" },
        { text: "Crée par", value: "creator.name" },
        { text: "Fournisseur", value: "supplier.name" },
      ],
      products: [],
    };
  },
  mounted() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      this.$axios.get("/products").then((res) => {
        this.products = res.data;
      });
    },
  },
};
</script>
