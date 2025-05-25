// RouteListener.js
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import ym from 'react-yandex-metrika'

export default function RouteListener() {
  const { pathname } = useLocation()

  useEffect(() => {
    ym('hit', pathname)
  }, [pathname])
  return null
}
