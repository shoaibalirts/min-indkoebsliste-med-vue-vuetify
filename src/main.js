import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify"; // Import the Vuetify instance
import router from "./router";

const app = createApp(App);
app.use(vuetify); // Use Vuetify as a plugin
app.use(router);

app.mount("#app");
