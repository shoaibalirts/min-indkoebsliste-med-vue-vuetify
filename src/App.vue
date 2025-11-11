<template>
  <v-app>
    <the-header></the-header>
    <!-- <v-main>
      <router-view />
    </v-main> -->
    <section>
      <ShoppingList />
      <PlusButton @toggle-open="toggleIsAddNewListOpened" />
    </section>
    <add-new-list v-if="isAddNewListOpened" @toggle-open="toggleIsAddNewListOpened" />

    <the-footer></the-footer>
  </v-app>
</template>

<script>
import ShoppingList from "./views/ShoppingList.vue";
import PlusButton from "./components/PlusButton.vue";
import GreenDropDown from "./components/GreenDropDown.vue";
import AddNewList from "./views/AddNewList.vue";
export default {
  components: {
    ShoppingList,
    PlusButton,
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
