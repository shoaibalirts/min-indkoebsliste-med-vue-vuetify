<template>
  <p v-if="loading">Henter data...</p>

  <v-card class="mx-auto" max-width="425">
    <v-list lines="">
      <v-list-item v-for="list in shoppingList" :key="list.id">
        <template v-slot:subtitle>
          {{ list.CategoryName }}
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import productService from "@/services/productService";

export default {
  components: {},
  data() {
    return {
      shoppingList: [],
      loading: true,
      myname: "Shoaib",
    };
  },
  async mounted() {
    try {
      this.shoppingList = await productService.getShoppingList();
      console.log("Received data from firebase:", this.shoppingList);
    } catch (err) {
      console.error("Error fetching shopping list:", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
