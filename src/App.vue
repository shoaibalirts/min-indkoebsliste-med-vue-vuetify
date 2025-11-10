<template>
  <the-header></the-header>
  <section>
    <h4>Seneste 30 dage</h4>
    <ShoppingList />
    <PlusButton @toggle-open="toggleIsAddNewListOpened" />
    <GreenDropDown />
  </section>

  <add-new-list v-if="isAddNewListOpened" @toggle-open="toggleIsAddNewListOpened" />

  <the-footer></the-footer>
  <router-view></router-view>
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
