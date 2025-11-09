import AddNewList from "@/AddNewList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: "/add-new", component: AddNewList }],
});

export default router;
