import { useEffect } from 'react'

import throttle from '../utils/throttle'

export function useScrollbarWidth() {
	useEffect(() => {
		const calculateScrollbarWidth = () => {
			const scrollDiv = document.createElement('div')
			scrollDiv.style.width = '100px'
			scrollDiv.style.height = '100px'
			scrollDiv.style.overflow = 'scroll'
			scrollDiv.style.position = 'absolute'
			scrollDiv.style.top = '-9999px'
			document.body.appendChild(scrollDiv)

			const width = scrollDiv.offsetWidth - scrollDiv.clientWidth
			document.body.removeChild(scrollDiv)

			document.documentElement.style.setProperty('--scrollbar-width', `${width}px`)
		}

		const throttledCalculate = throttle(calculateScrollbarWidth)

		calculateScrollbarWidth()

		window.addEventListener('resize', throttledCalculate)

		return () => {
			window.removeEventListener('resize', throttledCalculate)
		}
	}, [])
}
