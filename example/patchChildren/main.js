import { createApp } from "../../lib/miniature-vue.esm.js";
import App from "./App.js";

const rootContainer = document.querySelector("#root");
createApp(App).mount(rootContainer);
