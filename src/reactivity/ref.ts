import {isTracking, trackEffect, triggerEffect} from "./effect";
import {hasChanged, isObject} from "../share";
import {reactive} from "./reactive";

class RefImpl{
    private _value: any;
    //这里我们也需要一个 deps Set 用于储存所有的依赖
    public dep;
    private _rawValue: any;
    public __v_isRef = true;
    constructor(value) {
        this._rawValue = value;
        // 在这里进行一下判断，如果是 Object 的话，就对其进行 reacitve
        this._value = convert(value);
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
            this._rawValue = newValue;
            this._value = convert(newValue);
            //在 set 中触发依赖
            triggerEffect(this.dep);
        }
    }
}

export function convert(value){
    return isObject(value) ? reactive(value) :value
}

export function trackRefValue(ref){
    if(isTracking()){
        trackEffect(ref.dep)
    }
}

export function ref(value){
    return new RefImpl(value)
}

export function isRef(ref){
    return !!ref.__v_isRef
}

export function unRef(ref){
    //看看是不是ref对象，返回 ref.value
    return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objectWithRefs){
    return new Proxy(objectWithRefs,{
        get(target, key){
            //get -> age(ref) 那么就给他返回 .value
            //not ref -> value
            return unRef(Reflect.get(target, key));
        },
        set(target, key, value){
            //set -> ref .value
            if (isRef(target[key] && !isRef(value))){
                return target[key].value = value
            }else{
                return Reflect.set(target, key, value)
            }
        }
    })
}