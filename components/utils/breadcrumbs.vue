<template>
    <v-row no-gutters>
      <v-col cols="12">
        <v-breadcrumbs v-bind="$attrs" class="px-1" :items="items" large divider="/" />
      </v-col>
    </v-row>
  </template>
<script>
  export default {
    props: {
      items: {
        type: Array,
        default: () => []
      }
    }
  }
</script>