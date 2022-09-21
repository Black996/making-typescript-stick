import { expectType } from "tsd";

// IMPLEMENT THIS TYPE
export type WrapForPenpal<T>= 
    {[k in keyof T]: T[k] extends (...args:any)=> infer R 
      ? R extends Promise<any> 
      ? (...args:any) => R : (...args:any) => Promise<R> 
      : T[k];
    };

/**
 * Test Scenario - Do not change anything below this line
 */
const methods = {
  foo:'wfewf',
  add(a: number, b: number): number {
    return a + b;
  },
  subtract(a: number, b: number): Promise<number> {
    return Promise.resolve(a - b);
  }
};

// let m: typeof methods
const asyncMethods: WrapForPenpal<typeof methods> = {} as any;

let addPromise = asyncMethods.add(1, 2);
let fooPromise = asyncMethods.foo;

expectType<Promise<number>>(addPromise);
// @ts-expect-error
expectType<typeof addPromise>("this should fail");

let subtractPromise = asyncMethods.subtract(1, 2);
expectType<Promise<number>>(subtractPromise);
// @ts-expect-error
expectType<typeof subtractPromise>("this should fail");
