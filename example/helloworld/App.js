import { h } from "../../lib/miniature-vue.esm.js";

window.self = null
export const App = {
    // 必须要写 render
    render() {
        window.self = this;
        // ui
        return h(
            "div",
            {
                id: "root",
                class: ["red", "hard"],
            },
            // setupState
            // this.$el -> get root element
            "hi, " + this.msg
            // string
            // "hi, mini-vue"
            // Array
            //[h("p", { class:"red"}, "hi"), h("p", {class:"blue"}, "mini-vue")]
        );
    },

    setup() {
        return {
            msg: "mini-vue",
        };
    },
};