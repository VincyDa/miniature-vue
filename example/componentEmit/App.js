import {h} from "../../lib/miniature-vue.esm.js";
import {Foo} from "../helloworld/Foo";

export const App = {
    name: "App",
    render() {
        //emit
        return h("div", {}, [h("div", {}, "App"), h(Foo, {
            // on + Event
            onAdd(a,b){
                console.log("onAdd", a ,b);
            },
            //add-foo ->AddFooo
            onAddFoo(a,b){
                console.log("onAdd",a,b)
            }
        }),
        ]);
    },
    setup() {
        return {};
    },
}