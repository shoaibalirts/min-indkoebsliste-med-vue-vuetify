<template>
  <p v-if="loading">
    <the-loader />
  </p>

  <v-card class="mx-auto" max-width="425">
    <v-list v-for="(list, index) in shoppingList" :key="index" lines="two">
      <v-list-item>
        <!-- <template v-slot:subtitle> -->
        <p>{{ list.listName }}</p>
        <p>{{ list.listCreatedDate }}</p>
        <p>{{ list.prodName }}</p>
        <p>{{ list.co2_per_kg }}</p>
        <!-- <total-carbon productsWithThisId="list.Products" /> -->

        <!-- <p>
          CO2 (Kg):
          {{ list.listProducts ? list.listProducts[0].co2_per_kg : "Products array not available" }}
        </p> -->
        <p>{{ totalCO2 }}</p>
        <!-- </template> -->
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import productService from "@/services/productService";
import { formatDateDMY } from "@/utility/dateFormatter";
import TheLoader from "@/components/TheLoader.vue";
import TotalCarbon from "@/components/TotalCarbon.vue";
export default {
  components: {
    TheLoader,
    TotalCarbon,
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
      const productDetails = await productService.getProductDetailAgainstProductDocumentReference(
        "IDA1sJ3jn8QjnhjjLnGd"
      );
      console.log("Product details: ", productDetails);
      // const allProducts = await productService.getAllProductsFromProductsTable();  // Marta requested
      // console.log("All Products:", allProducts); // Marta requested
      this.shoppingList = receivedShoppingListFromDatabase.map((list) => {
        return {
          listName: list.CategoryName,
          listCreatedDate: list.CreatedDate ? formatDateDMY(list.CreatedDate) : "No date available",
          prodName: productDetails.prodName,
          co2_per_kg: productDetails.co2_per_kg,
          // totalListProductsCO2: list.Products.map((prod) => this.sum = this.sum + prod.co2_per_kg),
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
