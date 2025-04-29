import { useState, useEffect } from 'react'

import throttle from '../utils/throttle'

export function useResponsiveText(breakpoint, desktopText, mobileText) {
	const [text, setText] = useState(() =>
		window.innerWidth >= breakpoint ? desktopText : mobileText
	)

	useEffect(() => {
		const handleResize = throttle(() => {
			setText(window.innerWidth >= breakpoint ? desktopText : mobileText)
		})

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [breakpoint, desktopText, mobileText])

	return text
}
