import {h} from '../lib/miniature-vue.esm'

export const App = {
    // .vue
    // <template><template>
    //render
    //假设必须要写render
    render() {
        //ui
        return h("div", "hi, " + this.msg);
    },

    setup(){
      //composition api
      return{
          msg: "mini-vue",
      };
    },
}