<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Ajouter
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Effacer </v-btn>

      <v-btn color="warning" @click="cancelValidation"> Annuler </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "ArticleForm",
};
</script>
