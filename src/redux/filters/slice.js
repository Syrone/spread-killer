import { createSlice } from '@reduxjs/toolkit'

export const defaultFilters = {
	strategy: 'long+short:funding',
	exchanges: [],
	mValue: '',
	search: '',
	diffIntervals: false,
	orderbook: '',
	lifetime_seconds: '',
	sortBy: 'f_spread',
	sortDir: 'desc',
}

const initialState = {
	pageName: 'Home',
	pageFilters: {},
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setPageName(state, { payload: { pageName, initialFilters } }) {
			state.pageName = pageName

			if (!state.pageFilters[pageName]) {
				state.pageFilters[pageName] = initialFilters
					? { ...initialFilters }
					: { ...defaultFilters }
			}
		},
		setStrategy(state, { payload }) {
			const name = state.pageName

			state.pageFilters[name] ??= { ...defaultFilters }
			state.pageFilters[name].strategy = payload
		},
		toggleExchange(state, { payload }) {
			const name = state.pageName

			state.pageFilters[name] ??= { ...defaultFilters }
			state.pageFilters[name].exchanges = payload
		},
		setMValue(state, { payload }) {
			const name = state.pageName

			state.pageFilters[name] ??= { ...defaultFilters }
			state.pageFilters[name].mValue = payload
		},
		setSearch(state, { payload }) {
			const name = state.pageName

			state.pageFilters[name] ??= { ...defaultFilters }
			state.pageFilters[name].search = payload
		},
		setDiffIntervals(state, { payload }) {
			const name = state.pageName

			state.pageFilters[name] ??= { ...defaultFilters }
			state.pageFilters[name].diffIntervals = payload
		},
		setSort(state, { payload: { sortBy } }) {
			const name = state.pageName

			state.pageFilters[name] ??= { ...defaultFilters }
			const filters = state.pageFilters[name]
			if (filters.sortBy === sortBy) {
				filters.sortDir = filters.sortDir === 'asc' ? 'desc' : 'asc'
			} else {
				filters.sortBy = sortBy
				filters.sortDir = 'asc'
			}
		},
		clearFilters(state) {
			state.pageFilters[state.pageName] = { ...defaultFilters }
		},
	},
})

export const {
	setPageName,
	setStrategy,
	toggleExchange,
	setMValue,
	setSearch,
	setDiffIntervals,
	setSort,
	clearFilters,
} = filtersSlice.actions
export default filtersSlice.reducer