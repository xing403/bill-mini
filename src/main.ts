import { createSSRApp } from "vue";
import App from "./App.vue";
import store from "./store";

import '@tuniao/tn-style/dist/uniapp/index.css';
import '@/assets/style/reset.css';
import '@/assets/style/common.css'

export function createApp() {
  const app = createSSRApp(App);

  app.use(store);

  return {
    app,
  };
}
