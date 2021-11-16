export const extend = (target, o) => {
  for (const prop in o) {
    if (o.hasOwnProperty(prop)) {
      target[prop] = o[prop]
    }
  }
  return target
}
