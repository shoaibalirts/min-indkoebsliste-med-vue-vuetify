<template>
  <v-app>
    <the-header v-if="!isAddNewListOpened"></the-header>
    <v-main class="mt-0">
      <ShoppingList />
      <PlusButton @toggle-open="toggleIsAddNewListOpened" />
      <add-new-list v-if="isAddNewListOpened" @toggle-open="toggleIsAddNewListOpened" />
    </v-main>
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
