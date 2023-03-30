<template></template>

<script>
export default {
  auth: false,
  fetch({ redirect }) {
    redirect(301, "/article");
  },
};
</script>
