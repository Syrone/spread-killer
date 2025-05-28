import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	items: [],
	openItems: {},
	nextFetchAt: null,
}

export const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems(state, { payload }) {
			const existingItemsMap = new Map(state.items.map(item => [item.id, item]))

			const updatedItems = payload.map(newItem => {
				const existingItem = existingItemsMap.get(newItem.id)

				if (existingItem) {
					if (JSON.stringify(existingItem) === JSON.stringify(newItem)) {
						return existingItem
					}
				}

				return newItem
			})

			state.items = updatedItems
		},
		setNextFetchAt(state, { payload }) {
			state.nextFetchAt = payload
		},
		toggleItem(state, action) {
			const id = action.payload
			const currentItem = state.openItems[id]

			if (currentItem) {
				state.openItems[id].isOpen = !currentItem.isOpen
			} else {
				state.openItems[id] = {
					isOpen: true,
					chartRange: null
				}
			}
		},
		setChartRange(state, { payload: { id, range } }) {
			if (state.openItems[id]) {
				state.openItems[id].chartRange = range
			}
		},
		resetOpenItems(state) {
			state.openItems = {}
		}
	},
})

export const { setItems, setNextFetchAt, toggleItem, setChartRange, resetOpenItems } = itemsSlice.actions
export default itemsSlice.reducer