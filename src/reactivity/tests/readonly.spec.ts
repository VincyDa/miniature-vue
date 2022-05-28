import {reactive, readonly} from "../reactive";

describe('readonly', () => {
    it('happy path', () => {
        //non set
        const original = {foo: 1, bar: 2};
        const wrapped = readonly(original);
        expect(wrapped).not.toBe(original);
        expect(wrapped.bar).toBe(2)
    });

    it('should warn when update readonly prop value', () => {
        // 这里使用 jest.fn
        console.warn = jest.fn()
        const readonlyObj = readonly({ foo: 1 })
        readonlyObj.foo = 2
        expect(console.warn).toHaveBeenCalled()
    })
});