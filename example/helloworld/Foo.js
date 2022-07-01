import {h} from "../../lib/miniature-vue.cjs";

export const Foo = {
    setup(props) {
        //props.count
        console.log(props);
        //3.props不可以修改 shallowreadonly
        props.count++
        console.log(props)
    },
     render(){
        return h("div", {}, "foo:" + this.count);
     },
 };