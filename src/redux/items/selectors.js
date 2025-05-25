import { createSelector } from '@reduxjs/toolkit'

import { selectFilters } from '../filters/selectors'

const selectItemsObject = (state) => state.items.items
export const selectStatus = (state) => state.items.status
export const selectNextFetchAt = (state) => state.items.nextFetchAt
export const selectError = (state) => state.items.error

export const selectItems = createSelector(
	[selectItemsObject],
	itemsObject =>
		Object.entries(itemsObject)
			.map(([id, item]) => ({ ...item, id }))
)

export const selectVisibleItems = createSelector(
	[selectItems, selectFilters],
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

		// 4) Фильтр по времени
		if (filters.mValue) {
			const now = Math.floor(Date.now() / 1000)
			const mValueSeconds = Number(filters.mValue) * 3600

			result = result.filter(item => {
				const [p0, p1] = item.pairs
				const p0TimeLeft = p0.funding_time - now
				const p1TimeLeft = p1.funding_time - now
				return (
					p0TimeLeft > 0 &&
					p1TimeLeft > 0 &&
					p0TimeLeft <= mValueSeconds &&
					p1TimeLeft <= mValueSeconds
				)
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
				default:
					return 0
			}
		})

		return result
	}
)