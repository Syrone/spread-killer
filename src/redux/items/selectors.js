import { createSelector } from '@reduxjs/toolkit'

import { selectFilters } from '../filters/selectors'

export const selectItems = (state) => state.items.items
export const selectStatus = (state) => state.items.status
export const selectNextFetchAt = (state) => state.items.nextFetchAt

export const selectVisibleItems = createSelector(
	[selectItems, selectFilters],
	(items, filters) => {
		const dir = filters.sortDir === 'asc' ? 1 : -1
		const extreme = dir === 1 ? Math.min : Math.max

		return items
			// Осталось: strategy
			// 1) По строке поиска
			.filter(item => item.coin.toLowerCase().includes(filters.search.toLowerCase()))
			// 2) По выбранным биржам
			.filter(item => {
				if (filters.exchanges.length === 0) return true
				const selectedExchanges = filters.exchanges.map(e => e.toUpperCase())
				return item.pairs.every(p => selectedExchanges.includes(p.exchange))
			})
			// 3) Фильтрация по diffIntervals: сравнение funding_period
			.filter(item => {
				const { diffIntervals } = filters
				if (!diffIntervals) return true
				const [p0, p1] = item.pairs
				return p0.funding_period !== p1.funding_period
			})
			// 4) Фильтрация по mValue: разница во времени funding_time в минутах
			.filter(item => {
				const { mValue } = filters
				if (!mValue) return true
				const [p0, p1] = item.pairs

				const now = Math.floor(Date.now() / 1000) // текущее время в секундах
				const mValueSeconds = Number(mValue) * 3600 // часы → секунды

				const p0TimeLeft = p0.funding_time - now
				const p1TimeLeft = p1.funding_time - now

				return (
					p0TimeLeft > 0 &&
					p1TimeLeft > 0 &&
					p0TimeLeft <= mValueSeconds &&
					p1TimeLeft <= mValueSeconds
				)
			})
			// 4) Сортировка
			.sort((a, b) => {
				switch (filters.sortBy) {
					case 'coin':
						return dir * a.coin.localeCompare(b.coin)
					case 'priceDiff': {
						// price — пара: [первый обмен, второй обмен]
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
	}
)