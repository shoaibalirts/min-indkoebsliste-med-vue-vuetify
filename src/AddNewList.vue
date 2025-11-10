<template>
  <v-form class="position-absolute w-100 h-100">
    <v-text-field placeholder="Skriv navn" />
    <v-combobox :items="productsList" item-value="value" label="Vælg produkt">
      <!-- Custom slot for how each item appears in the dropdown -->
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" title="">
          <v-list-item-title>{{ item.raw.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.raw.co2_per_kg }} CO₂ per kg</v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-combobox>
  </v-form>
</template>

<script>
import productService from "./services/productService";

export default {
  data() {
    return {
      productsList: [],
    };
  },
  async mounted() {
    try {
      const receivedProductsListFromDatabase = await productService.getProductsList();
      this.productsList = receivedProductsListFromDatabase.map((list) => {
        return {
          value: list.prodId,
          title: list.prodName,
          co2_per_kg: list.co2_per_kg,
        };
      });
      console.log("products:", this.productsList);
    } catch (err) {
      console.error("Error fetching products list", err);
    }
  },
};
</script>
