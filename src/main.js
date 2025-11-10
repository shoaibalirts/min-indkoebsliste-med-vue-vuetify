import { createApp } from "vue";
import App from "./App.vue";
import TheHeader from "./components/layout/TheHeader.vue";
// import TheFooter from "./components/layout/TheFooter.vue";
import vuetify from "./plugins/vuetify"; // Import the Vuetify instance
import router from "./router";

const app = createApp(App);
app.use(vuetify); // Use Vuetify as a plugin
app.use(router);
app.component("the-header", TheHeader);
// app.component("the-footer", TheFooter);

app.mount("#app");
