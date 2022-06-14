import {creatComponentInstance, setupComponent} from "./component";

export function render (vnode, container){
    //patch
    //

    patch(vnode,container);
}


function patch (vnode, container) {
    //去处理组件

    processComponent(vnode, container);

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