import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";
import {ShapeFlags} from "../shared/ShapeFlags";

export function render(vnode, container) {
    patch(vnode, container);
}

function patch(vnode, container) {
    // TODO 判断vnode 是不是一个 element
    // 是 element 那么就应该处理 element
    // 思考题： 如何去区分是 element 还是 component 类型呢？
    // processElement();
    //ShapeFlags
    //vnode -> falg
    //element
    const {shapeFlag } = vnode
    if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container);
        //STATEFUL_COMPONENT
    } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container);
    }
}

function processElement(vnode: any, container: any) {
    mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
    //vnode -> element -> div
    const el = (vnode.el = document.createElement(vnode.type));

    const { children, shapeFlag } = vnode;

    // children
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // text_children
        el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        //array_children
        mountChildren(vnode, el);
    }

    // props
    const { props } = vnode;
    for (const key in props) {
        const val = props[key];
        el.setAttribute(key, val);
    }

    container.append(el);
}

function mountChildren(vnode, container) {
    vnode.children.forEach((v) => {
        patch(v, container);
    });
}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container);
}
function mountComponent(initialVNode: any, container) {
    const instance = createComponentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode,container);
}
function setupRenderEffect(instance: any, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container);

    //element -> mount
    initialVNode.el = subTree.el
}