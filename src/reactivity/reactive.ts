import {track, trigger} from "./effect";
import {mutableHandlers, readonlyHandlers, shallowReadonlyHandlers} from "./baseHandlers";

export const enum ReactiveFlags{
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY= "__v_isReadonly"
}

function createActiveObject(raw, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}

export function reactive(raw){
    return createActiveObject(raw, mutableHandlers)
}

export function isReactive(value){
    return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value){
    return !!value[ReactiveFlags.IS_READONLY];
}

export function readonly(raw){
    return createActiveObject(raw, readonlyHandlers)
}

export function isProxy(value){
    return isReadonly(value) || isReactive(value)
}

export function shallowReadonly(raw){
    return createActiveObject(raw, shallowReadonlyHandlers)
}