export const noop: () => void = () => {};

export const extend = Object.assign

export function isObject(val: unknown): val is Record<any, any> {
    return val !== null && typeof val === 'object';
}

export function isFunction(val: unknown) {
    return typeof val === 'function';
}

export function isPromise(val: unknown): val is PromiseLike<unknown> {
    return (
        isObject(val) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function'
    );
}
