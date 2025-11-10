<template>
  <v-card height="100">
    <v-toolbar extended>
      <v-toolbar-title text="Dine Indkøbslister"></v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-magnify" @click="handleClick"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-toolbar>
  </v-card>

  <v-app-bar :elevation="4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="handleMenuClick"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Dine Indkøbslister</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-magnify" @click="handleSearchClick"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  data() {},
  methods: {
    handleClick() {
      console.log("clicked");
    },
  },
};
</script>
