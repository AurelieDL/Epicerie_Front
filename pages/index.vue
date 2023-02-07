<template>
  <p>ceci est la page d'accueil</p>
</template>

<script>
export default {
  auth: false,
  fetch({ redirect }) {
    redirect(301, "/article");
  },
};
</script>
