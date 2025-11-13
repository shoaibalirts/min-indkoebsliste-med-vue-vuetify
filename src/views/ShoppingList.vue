<template>
  <p v-if="loading">
    <the-loader />
  </p>

  <v-card class="mx-auto">
    <v-card-title class="text-center bg-primary rounded-b-circle">Seneste 30 dage</v-card-title>

    <v-list v-if="recent30DaysList.length > 0" class="pb-0">
      <div v-for="(list, index) in recent30DaysList" :key="`recent-${index}`">
        <list-item :listData="list" />

        <v-list-item
          class="rounded elevation-1"
          :to="{ name: 'ListDetails', params: { id: list.id } }"
          link
        >
          <v-list-item-title class="font-weight-bold">{{ list.listName }}</v-list-item-title>
          <v-list-item-subtitle>{{ list.listCreatedDate }}</v-list-item-subtitle>

          <template v-slot:append>
            <div class="d-flex flex-column align-end">
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
                  >{{ getCo2LevelText(list.totalCO2) }}</span
                >
              </div>
              <span class="text-caption">CO<sub>2</sub>: {{ list.totalCO2.toFixed(2) }} kg</span>
            </div>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <v-card-text v-else class="text-center text-medium-emphasis"
      >Ingen lister i de sidste 30 dage.</v-card-text
    >

    <v-card-title class="text-center bg-primary rounded-b-circle">Sidste måned</v-card-title>

    <v-list v-if="previousMonthList.length > 0" class="pb-0">
      <div v-for="(list, index) in previousMonthList" :key="`prev-month-${index}`">
        <list-item :listData="list" />

        <v-list-item
          class="rounded elevation-1"
          :to="{ name: 'ListDetails', params: { id: list.id } }"
          link
        >
          <v-list-item-title class="font-weight-bold">{{ list.listName }}</v-list-item-title>
          <v-list-item-subtitle>{{ list.listCreatedDate }}</v-list-item-subtitle>

          <template v-slot:append>
            <div class="d-flex flex-column align-end">
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
                  >{{ getCo2LevelText(list.totalCO2) }}</span
                >
              </div>
              <span class="text-caption">CO<sub>2</sub>: {{ list.totalCO2.toFixed(2) }} kg</span>
            </div>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <v-card-text v-else class="text-center text-medium-emphasis"
      >Ingen lister fra sidste måned.</v-card-text
    >
  </v-card>
</template>

<script>
import ListItem from "@/components/ListItem.vue";
import DialogBox from "@/components/UI/DialogBox.vue";
import productService from "@/services/productService";
import { formatDateDMY } from "@/utility/dateFormatter";
import parseDDMMYYYY from "@/utility/dateParser";
import TheLoader from "@/components/TheLoader.vue";
import { db } from "@/utility/firebaseConfig";
import { collection, getDocs, where, query, documentId } from "firebase/firestore";
import getCo2LevelColor from "@/utility/getCo2LevelColor";
import getCo2LevelText from "@/utility/getCo2LevelText";
const productsCollection = collection(db, "Products");

export default {
  components: {
    ListItem,
    DialogBox,
    TheLoader,
  },
  data() {
    return {
      shoppingList: [],
      loading: true,
      isDeletedPressed: false,
      isUpdatedPressed: false,
    };
  },
  setup() {
    return {
      parseDDMMYYYY,
    };
  },
  methods: {
    handleClick() {
      console.log("clicked on each list");
    },
    openDialogComponent() {
      this.isDeletedPressed = true;
    },
    getCo2LevelColor,
    getCo2LevelText,
  },
  computed: {
    recent30DaysList() {
      const days = 30;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      cutoffDate.setHours(0, 0, 0, 0);

      return this.shoppingList.filter((item) => {
        // Calling the function from methods using 'this.'
        const itemDate = this.parseDDMMYYYY(item.listCreatedDate);
        if (!itemDate) return false;
        return itemDate >= cutoffDate;
      });
    },
    previousMonthList() {
      const now = new Date();
      // Calculate the first day of the current month
      const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Calculate the first day of the PREVIOUS month (the start cutoff)
      const firstDayOfPreviousMonth = new Date(
        firstDayOfCurrentMonth.setMonth(firstDayOfCurrentMonth.getMonth() - 1)
      );

      // Reset firstDayOfCurrentMonth to the correct current month for the next calculation
      firstDayOfCurrentMonth.setMonth(now.getMonth());

      // Calculate the last day of the PREVIOUS month (the end cutoff)
      const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
      lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() - 1);

      // Reset the time for accurate comparison
      firstDayOfPreviousMonth.setHours(0, 0, 0, 0);
      lastDayOfPreviousMonth.setHours(23, 59, 59, 999); // Include the whole last day

      // Now filter the list
      return this.shoppingList.filter((item) => {
        // Calling the function from methods using 'this.'
        const itemDate = this.parseDDMMYYYY(item.listCreatedDate);
        if (!itemDate) return false;

        const isAfterStart = itemDate >= firstDayOfPreviousMonth;
        const isBeforeEnd = itemDate <= lastDayOfPreviousMonth;

        return isAfterStart && isBeforeEnd;
      });
    },
  },

  async mounted() {
    try {
      const receivedShoppingListFromDatabase = await productService.getShoppingList();
      // console.log("Received Indkoebsliste Data: ", receivedShoppingListFromDatabase);
      const allProductsReferenceIdsArray = receivedShoppingListFromDatabase.map((item) => {
        return item.Products;
      });
      const productsRefs = allProductsReferenceIdsArray.flat();
      // console.log("productsRefs: ", productsRefs); //array of product table document reference id's

      if (productsRefs.length === 0) {
        this.shoppingList = receivedShoppingListFromDatabase.map((list) => {
          return {
            id: list.id,
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
          id: list.id,
          listName: list.CategoryName,
          listCreatedDate: list.CreatedDate ? formatDateDMY(list.CreatedDate) : "No date available",
          totalCO2: listTotalCO2,
        };
      });

      // console.log("Processed shopping list data with CO2:", this.shoppingList);
    } catch (err) {
      console.error("Error fetching shopping list:", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
