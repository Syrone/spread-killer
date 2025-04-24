export function throttle(callback, delay = 250) {
  let lastCall = 0
  let timeoutId = null

  return function (...args) {
    const now = Date.now()

    if (now - lastCall < delay) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        callback(...args)
      }, delay - (now - lastCall))
    } else {
      lastCall = now
      callback(...args)
    }
  }
}
