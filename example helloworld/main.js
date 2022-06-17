//vue3
import { createApp } from '../lib/miniature-vue.esm'
import {APP} from './App'

const rootContainer = document.querySelector("#app");
createApp(App).mount(rootContainer);