import objectContaining = jasmine.objectContaining;
import {hasOwn} from "../shared/index";

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
};

export  const PublicInstanceProxyHandlers={
    get({_: instance},key){
        //seupState
        const { setupState, props } = instance;
        if(key in setupState){
            return setupState[key];
        }


        if(hasOwn(setupState, key)){
            return setupState[key];
        }else if (hasOwn(props, key)){
            return props[key];
        }

        //key -> $el
        const publicGetter = publicPropertiesMap[key];
        if(publicGetter){
            return publicGetter(instance)
        }
    },
};