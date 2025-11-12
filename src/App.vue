<template>
  <v-app>
    <the-header></the-header>
    <v-main class="mt-0">
      <ShoppingList />
      <PlusButton @toggle-open="toggleIsAddNewListOpened" />
    </v-main>
    <add-new-list v-if="isAddNewListOpened" @toggle-open="toggleIsAddNewListOpened" />

    <the-footer></the-footer>
  </v-app>
</template>
<script>
import ShoppingList from "./views/ShoppingList.vue";
import PlusButton from "./components/PlusButton.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import GreenDropDown from "./components/GreenDropDown.vue";
import AddNewList from "./views/AddNewList.vue";
export default {
  components: {
    ShoppingList,
    PlusButton,
    TheHeader,
    TheFooter,
    GreenDropDown,
    AddNewList,
  },

  data() {
    return {
      isAddNewListOpened: false,
    };
  },
  methods: {
    toggleIsAddNewListOpened() {
      this.isAddNewListOpened = !this.isAddNewListOpened;
    },
  },
};
</script>
