<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card>
      <v-card-title><span>NOUVEL ARTICLE</span></v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="productName"
          label="Nom du produit"
          required
        ></v-text-field>

        <v-text-field
          v-model="productQuantity"
          label="Quantité"
          required="false"
        ></v-text-field>

        <v-select
          v-model="productPackaging"
          :items="items"
          :rules="[(v) => !!v || 'Veuillez sélectionner un choix']"
          label="Emballage"
          required
        ></v-select>

        <v-text-field
          v-model="productPrice_ht"
          label="Prix HT"
          required
        ></v-text-field>

        <v-text-field v-model="productVat" label="TVA" required></v-text-field>

        <v-text-field
          v-model="productMargin_rate"
          label="Marge"
          required
        ></v-text-field>

        <v-text-field
          v-model="productPrice_ttc"
          label="Prix TTC"
          required
        ></v-text-field>

        <v-text-field
          v-model="productPrice_ttc"
          label="Prix TTC"
          required
        ></v-text-field>

        <v-text-field
          v-model="productSupplier"
          label="Fournisseur"
          required
        ></v-text-field>

        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block @click="saveProduct">
            Ajouter
          </v-btn>

          <v-btn color="error" class="mt-4" block @click="reset">
            Effacer
          </v-btn>

          <v-btn
            color="warning"
            class="mt-4"
            block
            nuxt
            to="/article"
            @click="dialog = false"
          >
            Annuler
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ArticleForm",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    items: ["Kilo", "Pack", "Unité", "Bouteille", "Canette"],
    productName: "",
  }),

  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
      },
    },
  },

  methods: {
    saveProduct() {
      //POST de l'article, si ok fermer le form et revenir sur page article
      this.$axios
        .post("/products", {
          name: this.productName,
          quantity: this.productQuantity,
          packaging: this.productPackaging,
          price_ht: this.productPrice_ht,
          vat: this.productVat,
          margin_rate: this.productMargin_rate,
          price_ttc: this.productPrice_ttc,
          supplier: this.productSupplier,
        })
        .then((res) => {
          this.products = res.data;
          this.dialog = false;
        });
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
