export * from './dom'
export * from './tool'
export * from './decorator'
export * from './time-utils'
export const to = (promise) => {
  return promise
    .then(data => {
      return [data, null]
    }
    )
    .catch(err => {
      return [undefined, err]
    })
}
