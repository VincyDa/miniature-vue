import {isTracking, trackEffect, triggerEffect} from "./effect";
import {hasChanged, isObject} from "../share";
import {reactive} from "./reactive";

class RefImpl{
    private _value: any;
    //这里我们也需要一个 deps Set 用于储存所有的依赖
    public dep;
    private _rawValue: any;
    constructor(value) {
        this._rawValue = value;
        this._value = value
        // 在这里进行一下判断，如果是 Object 的话，就对其进行 reacitve
        this._value = isObject(value) ? reactive(value) : value
        this.dep = new Set();
    };
    get value(){
        trackRefValue(this);
        return this._value
    };
    set value(newValue){
        //在这里进行判断
        // 在这里用这个工具函数进行判断
        if (hasChanged(newValue, this._rawValue)){
            this._rawValue = newValue
            this._value = isObject(newValue) ? reactive(newValue) : newValue
            //在 set 中触发依赖
            triggerEffect(this.dep)
        }
    }
}

export function trackRefValue(ref){
    if(isTracking()){
        trackEffect(ref.dep)
    }
}

export function ref(value){
    return new RefImpl(value)
}