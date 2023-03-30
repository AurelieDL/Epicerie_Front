<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="productName"
        label="Nom du produit"
        required
      ></v-text-field>

      <v-text-field
        v-model="quantity"
        label="Quantité"
        required="false"
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Veuillez sélectionner un choix']"
        label="Emballage"
        required
      ></v-select>

      <v-text-field v-model="price_ht" label="Prix HT" required></v-text-field>

      <v-text-field v-model="vat" label="TVA" required></v-text-field>

      <v-text-field
        v-model="margin_price"
        label="Marge"
        required
      ></v-text-field>

      <v-text-field
        v-model="price_ttc"
        label="Prix TTC"
        required
      ></v-text-field>

      <v-text-field
        v-model="price_ttc"
        label="Prix TTC"
        required
      ></v-text-field>

      <v-text-field
        v-model="supplier"
        label="Fournisseur"
        required
      ></v-text-field>

      <div class="d-flex flex-column">
        <v-btn color="success" class="mt-4" block @click="validate">
          Ajouter
        </v-btn>

        <v-btn color="error" class="mt-4" block @click="reset"> Effacer </v-btn>

        <v-btn
          color="warning"
          class="mt-4"
          block
          nuxt
          to="/article"
          @click="resetValidation"
        >
          Annuler
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "ArticleForm",
  data: () => ({
    items: ["Kilo", "Pack", "Unité", "Bouteille", "Canette"],
  }),

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) alert("Formulaire correct");
    },

    reset() {
      this.$refs.form.reset();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
