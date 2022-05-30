import {isReadonly, shallowReadonly} from "../reactive";

it('happy path', () => {
    const original = {bar: {foo: 1}}
    //shallow的意思是浅的，默认 readonly 是嵌套的，而 shallowReadonly 刚好相反
    const shallow = shallowReadonly(original);
    expect(isReadonly(shallow)).toBe(true);
    expect(isReadonly(shallow.bar)).toBe(false);
});