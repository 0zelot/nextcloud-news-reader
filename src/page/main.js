import { createApp } from "vue";
import { createWebHashHistory, createRouter } from "vue-router";

import App from "./App.vue";

import "./index.css";

createApp(App)
    .use(createRouter({
        history: createWebHashHistory(),
        routes: []
    }))
    .mount("#app");