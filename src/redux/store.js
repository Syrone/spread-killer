import { configureStore } from '@reduxjs/toolkit'

import itemsSlice from './items/slice'

export const store = configureStore({
	reducer: {
		items: itemsSlice,
	},
})