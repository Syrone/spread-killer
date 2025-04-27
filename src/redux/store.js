import { configureStore } from '@reduxjs/toolkit'

import itemsSlice from './items/slice'
import filtersSlice from './filters/slice'
import clockSlice, { tick } from './clock/slice'

export const store = configureStore({
	reducer: {
		items: itemsSlice,
		filters: filtersSlice,
		clock: clockSlice
	},
})

setInterval(() => {
	store.dispatch(tick())
}, 1_000)