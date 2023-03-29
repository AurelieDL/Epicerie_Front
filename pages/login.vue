<template>
  <v-container fluid>
    <div class="display-1 d-flex justify-center mt-4 teal--text text--darken-1">
      LE COMPTOIR DU VILLAGE
    </div>

    <v-card flat class="d-flex justify-center mt-12 rounded-lg">
      <v-card elevation="24" width="350px">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            class="pl-2"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="text"
            :rules="[(v) => !!v || 'mot de passe obligatoire']"
            class="pl-2"
            label="Mot de passe"
            required
          ></v-text-field>

          <v-card-actions class="justify-center">
            <v-btn
              :disabled="!valid"
              color="#B2DFDB"
              class="mr-4"
              @click="login()"
            >
              Se connecter
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-card>
  </v-container>
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
      this.$auth
        .loginWith("local", {
          data: {
            email: this.email,
            password: this.text,
          },
        })
        .then((res) => {});
    },
  },
};
</script>
