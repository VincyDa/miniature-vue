import {isRef, ref, unRef} from "../ref";
import {effect} from "../effect";
import {isReactive, reactive} from "../reactive";

describe('ref', () => {
    it('happy path', () => {
        const a = ref(1);
        expect(a.value).toBe(1)
    });

    it('ref should be reactive', () => {
        const a = ref(1);
        let dummy;
        let calls = 0;
        effect(() => {
            calls++;
            dummy = a.value;
        });
        expect(calls).toBe(1);
        expect(dummy).toBe(1);
        a.value = 2;
        expect(calls).toBe(2);
        expect(dummy).toBe(2);
    });

    it('should make nested properties reactive', () => {
        const a = ref({
            foo: 1,
        })
        let dummy;
        effect(() => {
            dummy = a.value.foo
        })
        a.value.foo = 2;
        expect(dummy).toBe(2);
        expect(isReactive(a.value)).toBe(true);
    });

    it('isRef', () => {
        const a = ref(1);
        const user = reactive({
            foo: 1,
        });
        expect(isRef(a)).toBe(true);
        expect(isRef(1)).toBe(false);
        expect(isRef(user)).toBe(false);
    });

    it('unRef', () => {
        const a = ref(1);
        expect(unRef(a)).toBe(1);
        expect(unRef(1)).toBe(1);
    });
});