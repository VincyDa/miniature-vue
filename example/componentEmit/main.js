import { createApp } from "../../lib/miniature-vue.esm";
import { App } from "./App.js";

const rootContainer = document.querySelector("#app");
createApp(App).mount(rootContainer);