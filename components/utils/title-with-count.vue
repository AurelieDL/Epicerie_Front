<template>
    <v-row justify="space-between" align-sm="center">
      <v-col v-bind="$attrs" class="title font-weight-medium pa-4">
        {{ title }} <span v-if="total !== null" class="subtitle-1 font-weight-medium">({{ total }})</span>
      </v-col>
    </v-row>
  </template>
  
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      total: {
        type: Number,
        default: null
      }
    }
  }
</script>