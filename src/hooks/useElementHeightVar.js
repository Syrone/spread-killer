import { useEffect, useRef } from 'react'
import throttle from '../utils/throttle'

export function useElementHeightVar(cssVarName, throttleDelay = 100) {
	const ref = useRef(null)

	useEffect(() => {
		if (!cssVarName.startsWith('--')) {
			console.warn(`useElementHeightVar: cssVarName should start with "--", got "${cssVarName}"`)
		}

		const updateVar = () => {
			if (ref.current) {
				const height = ref.current.offsetHeight
				document.documentElement.style.setProperty(cssVarName, `${height}px`)
			}
		}

		// Вызов сразу после монтирования
		updateVar()

		// Слушатель ресайза с throttle
		const handleResize = throttle(updateVar, throttleDelay)
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [cssVarName, throttleDelay])

	return ref
}