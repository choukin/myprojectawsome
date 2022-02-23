import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import md5 from "md5";

const app = createApp(App);
app.use(store).use(router).mount("#app");

app.config.globalProperties.$md5 = md5;
