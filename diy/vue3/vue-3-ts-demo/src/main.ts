import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import md5 from "md5";
import { createPinia } from "pinia";

function SecetPiniaPlugin() {
  return { secret: "the cake is a lie" };
}
const pinia = createPinia();

pinia.use(SecetPiniaPlugin);

const app = createApp(App);
app.use(store).use(pinia).use(router).mount("#app");

app.config.globalProperties.$md5 = md5;
