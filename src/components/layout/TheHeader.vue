<template>
  <v-app-bar :elevation="4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title @click="reloadApp">Dine Indkøbslister</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-magnify" @click="callSearchComponent"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    reloadApp() {
      window.location.reload();
    },
    callSearchComponent() {
      console.log("clicked");
    },
  },
};
</script>
