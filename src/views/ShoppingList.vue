<template>
  <p v-if="loading">
    <the-loader />
  </p>

  <v-card class="mx-auto" max-width="425">
    <v-list v-for="(list, index) in shoppingList" :key="index" lines="two">
      <v-list-item @click="handleClick">
        <v-list-item-title class="font-weight-bold">{{ list.listName }}</v-list-item-title>
        <v-list-item-subtitle>{{ list.listCreatedDate }}</v-list-item-subtitle>

        <template v-slot:append>
          <div class="d-flex flex-column align-start">
            <div class="d-flex align-center">
              <v-icon
                :color="getCo2LevelColor(list.totalCO2)"
                icon="mdi-circle-medium"
                size="16"
                class="mr-1"
              ></v-icon>

              <span
                class="text-body-2 font-weight-medium"
                :class="`text-${getCo2LevelColor(list.totalCO2)}`"
              >
                {{ getCo2LevelText(list.totalCO2) }}
              </span>
            </div>

            <span class="text-subtitle-1 text-caption">
              {{ list.totalCO2.toFixed(2) }} kg CO2
            </span>
          </div>
        </template>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </v-card>
</template>

<script>
import productService from "@/services/productService";
import { formatDateDMY } from "@/utility/dateFormatter";
import TheLoader from "@/components/TheLoader.vue";
import { db } from "@/utility/firebaseConfig";
import { collection, getDocs, where, query, documentId } from "firebase/firestore";
const productsCollection = collection(db, "Products");

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
  methods: {
    getCo2LevelColor(co2Value) {
      if (co2Value < 4.5) {
        // < 15
        return "green";
      } else if (co2Value > 4.4 && co2Value < 8) {
        //15-40
        return "yellow-darken-3";
      } else {
        // >40
        return "red";
      }
    },
    getCo2LevelText(co2Value) {
      if (co2Value < 4.5) {
        // <15
        return "Lav";
      } else if (co2Value > 4.4 && co2Value < 8) {
        // 15-40
        return "Medium";
      } else {
        // >40
        return "Høj";
      }
    },
    handleClick() {
      console.log("clicked on each list");
    },
  },
  computed: {
    // recentShoppingList30Days() {
    //   const days = 30;
    //   const cutoffDate = new Date();
    //   cutoffDate.setDate(cutoffDate.getDate() - days);
    //   const recentItems = this.shoppingList.filter((item) => {
    //     const itemDate = new Date(item.listCreatedDate);
    //     return itemDate > cutoffDate;
    //   });
    //   console.log("Recent Items: ", recentItems);
    // },
  },
  async mounted() {
    try {
      const receivedShoppingListFromDatabase = await productService.getShoppingList();
      console.log("Received Indkoebsliste Data: ", receivedShoppingListFromDatabase);
      const allProductsReferenceIdsArray = receivedShoppingListFromDatabase.map((item) => {
        return item.Products;
      });
      const productsRefs = allProductsReferenceIdsArray.flat();
      console.log("productsRefs: ", productsRefs); //array of product table document reference id's

      if (productsRefs.length === 0) {
        this.shoppingList = receivedShoppingListFromDatabase.map((list) => {
          return {
            listName: list.CategoryName,
            listCreatedDate: list.CreatedDate
              ? formatDateDMY(list.CreatedDate)
              : "No date available",
            totalCO2: 0,
          };
        });
        return;
      }
      // console.log("Received data from Firebase Database:", this.shoppingList);

      const q = query(productsCollection, where(documentId(), "in", productsRefs));
      const querySnapshot = await getDocs(q);

      // AI start
      const productCo2Map = {};
      querySnapshot.forEach((doc) => {
        productCo2Map[doc.id] = doc.data().co2_per_kg;
      });
      this.shoppingList = receivedShoppingListFromDatabase.map((list) => {
        const listTotalCO2 = list.Products.reduce((sum, productId) => {
          const co2Value = productCo2Map[productId] || 0;
          return sum + co2Value;
        }, 0);
        // AI end
        return {
          listName: list.CategoryName,
          listCreatedDate: list.CreatedDate ? formatDateDMY(list.CreatedDate) : "No date available",
          totalCO2: listTotalCO2,
        };
      });

      console.log("Processed shopping list data with CO2:", this.shoppingList);
    } catch (err) {
      console.error("Error fetching shopping list:", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
