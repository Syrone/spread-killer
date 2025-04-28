import { useState, useEffect } from 'react'

export function useNow() {
	const [now, setNow] = useState(() => Math.floor(Date.now() / 1000))

	useEffect(() => {
		const id = setInterval(() => {
			setNow(Math.floor(Date.now() / 1000))
		}, 1000)
		return () => clearInterval(id)
	}, [])

	return now
}
