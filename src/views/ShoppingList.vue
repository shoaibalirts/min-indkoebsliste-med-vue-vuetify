<template>
  <p v-if="loading">
    <the-loader />
  </p>

  <v-card class="mx-auto" max-width="425">
    <v-list v-for="(list, index) in shoppingList" :key="index" lines="two">
      <v-list-item>
        <template v-slot:subtitle>
          <p>{{ list.listName }}</p>
          <p>{{ list.listCreatedDate }}</p>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import productService from "@/services/productService";
import { formatDateDMY } from "@/utility/dateFormatter";
import TheLoader from "@/components/TheLoader.vue";
export default {
  components: {
    TheLoader,
  },
  data() {
    return {
      shoppingList: [],
      loading: true,
    };
  },
  computed() {},
  async mounted() {
    try {
      const receivedShoppingListFromDatabase = await productService.getShoppingList();
      this.shoppingList = receivedShoppingListFromDatabase.map((list) => {
        return {
          ...list,
          listName: list.CategoryName,
          listCreatedDate: list.CreatedDate ? formatDateDMY(list.CreatedDate) : "No date available",
        };
      });
      console.log("Received data from Firebase Database:", this.shoppingList);
    } catch (err) {
      console.error("Error fetching shopping list:", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
