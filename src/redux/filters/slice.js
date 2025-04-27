import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	strategy: 'long+short:funding',
	exchanges: [],
	mValue: '',
	search: '',
	diffIntervals: false,
	sortBy: 'f_spread',
	sortDir: 'desc',
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setStrategy(state, { payload }) {
			state.strategy = payload
		},
		toggleExchange(state, { payload }) {
			state.exchanges = payload
		},
		setMValue(state, { payload }) {
			state.mValue = payload
		},
		setSearch(state, { payload }) {
			state.search = payload
		},
		setDiffIntervals(state, { payload }) {
			state.diffIntervals = payload
		},
		setSort(state, { payload: { sortBy } }) {
			if (state.sortBy === sortBy) {
				state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc'
			} else {
				state.sortBy = sortBy
				state.sortDir = 'asc'
			}
		},
		clearFilters(state) {
			Object.assign(state, initialState)
		},
	},
})

export const {
	setStrategy,
	toggleExchange,
	setMValue,
	setSearch,
	setDiffIntervals,
	setSort,
	clearFilters,
} = filtersSlice.actions
export default filtersSlice.reducer