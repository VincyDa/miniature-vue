import {extend} from "../shared";

let shouldTrack;
let activeEffect;

export class ReactiveEffect{
    private _fn: any;
    deps = [];
    active = true;
    onStop?: () => void;
    constructor(fn, public scheduler?) {
        this._fn = fn;
    }
    run(){
        activeEffect = this;
        //1.会收集依赖
        //2.shouldTrack来做区分
        if(!this.active){
            return this._fn();
        }

        shouldTrack = true;
        activeEffect = this;

        const result = this._fn();
        //reset
        shouldTrack = false;

        return result
    }
    stop(){
        if(this.active){
            cleanupEffect(this)
            this.active = false;
            if(this.onStop){
                this.onStop();
            }
        }
    }
}

function cleanupEffect (effect){
    effect.deps.forEach((dep: any) => {
        dep.delete(effect);
    });
}

const targetMap = new Map();

export function track(target, key){
    //target -> key -> dep
    if(!isTracking()) return;
    let depsMap = targetMap.get(target);
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target, depsMap)
    }

    let  dep = depsMap.get(key);
    if(!dep){
        dep = new Set();
        depsMap.set(key, dep);
    }
    trackEffect(dep);
}

export function isTracking(){
    return shouldTrack && activeEffect !== undefined;
}

export function trackEffect(dep){
    if(dep.has(activeEffect)) return;
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
}

export function trigger(target, key){
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    triggerEffect(dep);
}

export function triggerEffect(dep){
    for(const effect of dep){
        if(effect.scheduler){
            effect.scheduler();
        }else{
            effect.run();
        }
    }
}

export function effect(fn, options:any = {}){
    //fn
    const _effect = new ReactiveEffect(fn,options.scheduler);
    //options
    Object.assign(_effect, options);
    //extend
    extend(_effect, options)

    _effect.run();

    const runner: any =  _effect.run.bind(_effect);
    runner.effect = _effect;

    return runner;
}

export function stop (runner){
    runner.effect.stop();
}