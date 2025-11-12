<template>
  <v-card height="auto">
    <v-toolbar>
      <v-toolbar-title text="Dine Indkøbslister"></v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-toolbar>
  </v-card>

  <v-app-bar :elevation="4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Dine Indkøbslister</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>
