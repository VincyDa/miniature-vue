function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
    };
    return vnode;
}

function creatComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
    };
    return component;
}
function setupComponent(instance) {
    //TODO
    //initProps()
    //initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.type;
    const { setup } = Component;
    if (setup) {
        //function Object
        const setupResult = setup();
        // @ts-ignore
        handleSetupResult(setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    //function Object
    //TODO function
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

function isObject(val) {
    return val !== null && typeof val === "object";
}

function render(vnode, container) {
    //patch
    //
    patch(vnode);
}
function patch(vnode, container) {
    //去处理组件
    //TODO 判断vnode 是不是一个 element
    //是element 那么就应该处理element
    //思考题： 如何区分是element还是component类型
    //processElement();
    if (typeof vnode.type === "string") {
        processElement(vnode);
    }
    else if (isObject(vnode.type)) {
        processComponent(vnode);
    }
}
function processElement(vnode, container) {
    mountComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    const instance = creatComponentInstance(vnode);
    +setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    //vnode -> patch
    //vnode -> element -> mountElement
    patch(subTree);
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            //先vnode
            //component -> vnode
            //所有的逻辑操作，都会基于vnode做处理
            const vnode = createVNode(rootComponent);
            render(vnode);
        },
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };
