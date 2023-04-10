<template>
  <v-dialog v-model="dialog" width="800" persistent>
    <v-card width="100%">
      <v-card-title class="white--text primary">
        Ajouter un article
      </v-card-title>
      <v-card-text class="mt-3 pb-0">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col>
              <v-text-field
                v-model="productName"
                label="Nom du produit"
                :rules="[(v) => !!v || 'Nom du produit requis']"
                outlined
                dense
                class="rounded-0"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="productSupplier"
                label="Fournisseur"
                :rules="[(v) => !!v || 'Nom du fournisseur requis']"
                outlined
                dense
                class="rounded-0"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="productPackaging"
                :items="items"
                :rules="[(v) => !!v || 'Veuillez sélectionner un choix']"
                label="Emballage"
                outlined
                dense
                class="rounded-0"
              ></v-select>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="productQuantity"
                label="Quantité"
                type="number"
                :rules="[(v) => !!v || 'Quantité requise']"
                outlined
                dense
                class="rounded-0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="productPrice_ht"
                label="Prix HT"
                type="number"
                :rules="[(v) => !!v || 'prix HT requis']"
                outlined
                dense
                class="rounded-0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="productVat"
                label="TVA"
                type="number"
                :rules="[(v) => !!v || 'TVA requise']"
                outlined
                dense
                class="rounded-0"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="productMargin_rate"
                label="Marge"
                type="number"
                :rules="[(v) => !!v || 'Marge requise']"
                outlined
                dense
                class="rounded-0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="productPrice_ttc"
                label="Prix TTC"
                type="number"
                :rules="[(v) => !!v || 'Prix TTC requis']"
                outlined
                dense
                class="rounded-0"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-col cols="auto">
          <v-btn
             color="error"
             @click="reset(); dialog = false"
            >
            Annuler
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn
            color="primary"
            :disabled="!valid"
            @click="saveProduct"
            >
            Ajouter
          </v-btn>
        </v-col>
      </v-card-actions>
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
    productQuantity: "",
    productPackaging: "",
    productPrice_ht: "",
    productVat: "",
    productMargin_rate: "",
    productPrice_ttc: "",
    productSupplier: "",
    valid: false,
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
          this.$emit('refresh', 'create')
          this.dialog = false;
        });
    },
    reset() {
      this.$refs.form.reset();
    }
  }
}
</script>
