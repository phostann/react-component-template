// check if the target is an object
export function isObject(target: any): boolean {
  return Object.prototype.toString.call(target) === '[object Object]'
}

// check if the target is a function
export function isFunction(target: any): boolean {
  return typeof target === 'function'
}
