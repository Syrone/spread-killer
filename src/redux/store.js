import { configureStore } from '@reduxjs/toolkit'

import itemsSlice from './items/slice'
import filtersSlice from './filters/slice'

export const store = configureStore({
	reducer: {
		items: itemsSlice,
		filters: filtersSlice,
	},
})