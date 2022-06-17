import {creatComponentInstance, setupComponent} from "./component";
import {isObject} from "../share/index";

export function render (vnode, container){
    //patch
    //

    patch(vnode,container);
}


function patch (vnode, container) {
    //去处理组件
    //TODO 判断vnode 是不是一个 element
    //是element 那么就应该处理element
    //思考题： 如何区分是element还是component类型
    //processElement();
    if (typeof vnode.type === "string"){
        processElement(vnode, container);
    }else if(isObject(vnode.type)){
        processComponent(vnode, container);
    }


}

function processElement(vnode: any, container: any){
    mountELement(vnode, container);
}

function mountComponent(vnode: any, container){
    const instance = creatComponentInstance(vnode);+
        setupComponent(instance);
    setupRenderEffect(instance, container);
}

function processComponent(vnode: any, container: any){
    mountComponent(vnode, container);
}

function mountComponent(vnode: any, container){
    const instance = creatComponentInstance(vnode);+
    setupComponent(instance);
    setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container){
    const subTree = instance.render();

    //vnode -> patch
    //vnode -> element -> mountElement
    patch(subTree, container);
}