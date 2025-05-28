import { createSelector } from '@reduxjs/toolkit'

import { selectFilters } from '../filters/selectors'

export const selectItemsArray = (state) => state.items.items
export const selectNextFetchAt = (state) => state.items.nextFetchAt
export const selectOpenItems = (state) => state.items.openItems

export const selectOpenRows = createSelector(
	[selectOpenItems],
	(openItems) => {
		const openRows = {}
		Object.keys(openItems).forEach(id => {
			openRows[id] = openItems[id]?.isOpen || false
		})
		return openRows
	}
)

export const selectChartRange = (id) => createSelector(
	[selectOpenItems],
	(openItems) => openItems[id]?.chartRange || null
)

export const selectVisibleItems = createSelector(
	[selectItemsArray, selectFilters],
	(items, filters) => {
		const dir = filters.sortDir === 'asc' ? 1 : -1
		const extreme = dir === 1 ? Math.min : Math.max

		let result = items

		// 1) Поиск
		if (filters.search) {
			result = result.filter(item =>
				item.coin.toLowerCase().includes(filters.search.toLowerCase())
			)
		}

		// 2) Фильтр по Биржам
		if (filters.exchanges.length > 0) {
			const selectedExchanges = filters.exchanges.map(e => e.toUpperCase())

			result = result.filter(item => {
				// Оставляем только те пары, чей exchange входит в выбранный список
				const matchedPairs = item.pairs.filter(p =>
					selectedExchanges.includes(p.exchange)
				)
				const count = matchedPairs.length

				switch (selectedExchanges.length) {
					case 1:
						// при одной выборке – хотя бы одна пара
						return count >= 1

					case 2:
						// при двух – ровно две (чтобы были оба фильтра)
						return count === 2

					default:
						// при трёх и более – любые сочетания по 2 (хотя бы две пары)
						return count >= 2
				}
			})
		}

		// 4) Фильтр по интервалам
		if (filters.diffIntervals) {
			result = result.filter(item => {
				const [p0, p1] = item.pairs
				return p0.funding_period !== p1.funding_period
			})
		}

		// 4) Фильтр по времени часы
		if (filters.hValue) {
			const now = Math.floor(Date.now() / 1000)
			const hValueSeconds = Number(filters.hValue) * 3600

			result = result.filter(item => {
				const [p0, p1] = item.pairs
				const p0TimeLeft = p0.funding_time - now
				const p1TimeLeft = p1.funding_time - now
				return (
					p0TimeLeft > 0 &&
					p1TimeLeft > 0 &&
					p0TimeLeft <= hValueSeconds &&
					p1TimeLeft <= hValueSeconds
				)
			})
		}

		// 5) Фильтр по времени минуты
		if (filters.mValue) {
			const now = Math.floor(Date.now() / 1000)
			const mValueSeconds = Number(filters.mValue) * 60

			result = result.filter(item => {
				const age = now - item.date_added
				return age <= mValueSeconds
			})
		}

		// 5) Сортировка
		result = [...result]

		result.sort((a, b) => {
			switch (filters.sortBy) {
				case 'coin':
					return dir * a.coin.localeCompare(b.coin)
				case 'priceDiff': {
					const aVal = extreme(a.pairs[0].price, a.pairs[1].price)
					const bVal = extreme(b.pairs[0].price, b.pairs[1].price)
					return dir * (aVal - bVal)
				}
				case 'orderbook': {
					const aVal = extreme(a.pairs[0].orderbook_volume_usd)
					const bVal = extreme(b.pairs[0].orderbook_volume_usd)
					return dir * (aVal - bVal)
				}
				case 'fundingDiff': {
					const aVal = extreme(a.pairs[0].funding, a.pairs[1].funding)
					const bVal = extreme(b.pairs[0].funding, b.pairs[1].funding)
					return dir * (aVal - bVal)
				}
				case 'fundingTime': {
					const aVal = extreme(a.pairs[0].funding_time, a.pairs[1].funding_time)
					const bVal = extreme(b.pairs[0].funding_time, b.pairs[1].funding_time)
					return dir * (aVal - bVal)
				}
				case 'f_spread':
					return dir * (a.f_spread - b.f_spread)
				case 'open_spread':
					return dir * (a.open_spread - b.open_spread)
				case 'profit':
					const getLast = (obj) => {
						const times = Object.keys(obj)
							.map(t => parseInt(t, 10))
							.sort((a, b) => a - b)
						if (times.length === 0) return 0
						return obj[times[times.length - 1]]
					}
					const aLast = getLast(a.open_spread)
					const bLast = getLast(b.open_spread)
					return dir * (aLast - bLast)
				case 'date_added':
					return (dir * (a.date_added - b.date_added))
				default:
					return 0
			}
		})

		return result
	}
)