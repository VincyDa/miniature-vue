import { h } from "../../lib/miniature-vue.esm.js";
import { Foo } from "./Foo"

window.self = null
export const App = {
    // 必须要写 render
    name:"App",
    render() {
        window.self = this;
        // ui
        return h(
            "div",
            {
                id: "root",
                class: ["red", "hard"],
                onclick() {
                    console.log("click");
                },
                onmousedown(){
                    console.log("mousedown")
                }
            },
            [h("div", {}, "he," + this.msg), h(Foo,
                {
                   count: 1,
                },)]
            // setupState
            // this.$el -> get root element
            // "hi, " + this.msg
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