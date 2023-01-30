<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="text"
        :rules="[(v) => !!v || 'mot de passe obligatoire']"
        label="Mot de passe"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="login()">
        Se connecter
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    text: "",
    email: "",
    emailRules: [
      (v) => !!v || "Merci d'indiquer votre e-mail",
      (v) => /.+@.+\..+/.test(v) || "l'e-mail doit être valide",
    ],
  }),

  methods: {
    login() {
      this.$auth.loginWith("local", {
        data: {
          login: this.email,
          password: this.text,
        },
      });
    },
  },
};
</script>
