import {track, trigger} from "./effect";
import {mutableHandlers, readonlyHandlers} from "./baseHandlers";

function createActiveObject(raw, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}

export function reactive(raw){
    return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw){
    return createActiveObject(raw, readonlyHandlers)
}