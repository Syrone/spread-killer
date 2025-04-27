import { useLayoutEffect } from 'react'
import throttle from '../utils/throttle'

export function useHasScroll(elRef) {
  useLayoutEffect(() => {
    const el = elRef.current
    if (!el) return

    const update = () => {
      const hasV = el.scrollHeight > el.clientHeight
      const hasH = el.scrollWidth > el.clientWidth

      requestAnimationFrame(() => {
        el.setAttribute('data-has-vertical-scroll', hasV)
        el.setAttribute('data-has-horizontal-scroll', hasH)
      })
    }

    const throttled = throttle(update, 100)
    update()

    window.addEventListener('resize', throttled)

    let ro
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(throttled)
      ro.observe(el)
    }

    return () => {
      window.removeEventListener('resize', throttled)
      if (ro) ro.disconnect()
    }
  }, [elRef])
}
