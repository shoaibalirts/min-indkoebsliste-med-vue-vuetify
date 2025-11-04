<template>
  <h1>Din Indkøbslister</h1>
  <p v-if="loading">Henter data...</p>

  <ul v-else>
    <li v-for="list in shoppingList" :key="list.CategoryName">
      {{ list.CategoryName }}
    </li>
  </ul>
</template>

<script>
import productService from "@/services/productService";

export default {
  components: {},
  data() {
    return {
      shoppingList: [],
      loading: true,
    };
  },
  async mounted() {
    try {
      this.shoppingList = await productService.getShoppingList();
      console.log("Fetched data:", this.shoppingList);
    } catch (err) {
      console.error("Error fetching shopping list:", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
