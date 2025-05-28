import { configureStore } from '@reduxjs/toolkit'

import themeSlice from './theme/slice'
import itemsSlice from './items/slice'
import filtersSlice from './filters/slice'

export const store = configureStore({
	reducer: {
		theme: themeSlice,
		items: itemsSlice,
		filters: filtersSlice,
	},
})