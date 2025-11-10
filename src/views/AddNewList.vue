<template>
  <v-form id="list-form">
    <v-row align="center">
      <v-btn icon="mdi-chevron-left" variant="plain" size="large" @click="handleClickBackBtn" />
      <v-text-field placeholder="Skriv navn" v-model="listName" @blur="handleSaveList" />
    </v-row>

    <v-row v-for="product in shoppingList.Products" v-bind:key="product.id">
      <v-checkbox :label="product.title"></v-checkbox>
      <p>{{ product.co2_per_kg }} kg CO₂</p>
    </v-row>

    <v-combobox
      :items="productsList"
      item-value="value"
      label="Vælg produkt"
      v-model="selectedItem"
      @update:model-value="handleUpdateList"
    >
      <!-- Custom slot for how each item appears in the dropdown -->
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" title="">
          <v-list-item-title>{{ item.raw.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.raw.co2_per_kg }} kg CO₂</v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-combobox>
  </v-form>
</template>

<script>
import productService from "../services/productService";

export default {
  data() {
    return {
      productsList: [],
      shoppingList: {
        CategoryName: "",
        CreatedDate: null,
        Products: [],
      },
      selectedItem: null,
      unsubscribe: null,
      listId: null,
      listName: "",
    };
  },
  methods: {
    handleClickBackBtn() {
      this.$emit("toggle-open");
    },
    setShoppingListData(data) {
      this.shoppingList = data;
    },
    async listenToList(id) {
      if (this.unsubscribe) this.unsubscribe(); // clear previous listener if any

      this.unsubscribe = await productService.listenToShoppingList(id, this.setShoppingListData);
    },
    async handleSaveList() {
      const snapshotId = await productService.createShoppingList(this.listName);

      this.listId = snapshotId;

      this.listenToList(snapshotId);
    },
    handleUpdateList(product) {
      if (!this.listId || !product) return;
      console.log("product", product);
      // productService.addProductToList(this.listId, product);
    },
  },
  async mounted() {
    try {
      const receivedProductsListFromDatabase = await productService.getProductsList();
      this.productsList = receivedProductsListFromDatabase.map((list) => {
        return {
          value: list.prodId,
          title: list.prodName,
          co2_per_kg: list.co2_per_kg,
          prodAlternatives: list.prodAlternatives || [],
        };
      });
    } catch (err) {
      console.error("Error fetching products list", err);
    }
  },
};
</script>

<style>
#list-form {
  background-color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
