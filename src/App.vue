<template>
  <v-card height="75">
    <v-toolbar extended>
      <v-toolbar-title text="Dine Indkøbslister"></v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-toolbar>
  </v-card>
  <section>
    <h4>Seneste 30 dage</h4>
    <ShoppingList />
  </section>
</template>

<script>
import ShoppingList from "./views/ShoppingList.vue";
export default {
  components: {
    ShoppingList,
  },
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped></style>
