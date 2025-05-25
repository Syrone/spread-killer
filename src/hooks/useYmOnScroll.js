import { useEffect } from 'react'

import ym from 'react-yandex-metrika'

export const useYmOnScroll = (ref, goal, threshold = 0.9) => {
	useEffect(() => {
		const node = ref.current
		if (!node) return

		const onScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } = node
			const scrollRatio = (scrollTop + clientHeight) / scrollHeight
			if (scrollRatio > threshold) {
				ym('reachGoal', goal)
				node.removeEventListener('scroll', onScroll)
			}
		}

		node.addEventListener('scroll', onScroll)
		return () => node.removeEventListener('scroll', onScroll)
	}, [ref, goal, threshold])
}
