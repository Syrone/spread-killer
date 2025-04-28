import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from '../../api'

const initialState = {
	items: [],
	status: 'idle',
	nextFetchAt: null,
	error: null,
}

export const fetchItems = createAsyncThunk(
	'items/fetchItems',
	async () => {
		const { data } = await api.get('/generate-data/')
		return data
	},
)

export const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setNextFetchAt(state, { payload }) {
			state.nextFetchAt = payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchItems.pending, (state) => {
			state.status = state.items.length > 0 ? 'refreshing' : 'loading'
			state.error = null
		})
		builder.addCase(fetchItems.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.items = payload
			state.error = null
		})
		builder.addCase(fetchItems.rejected, (state, { error }) => {
			state.status = 'error'
			state.error = error.message || 'Неизвестная ошибка'
		})
	},
})

export const { setNextFetchAt } = itemsSlice.actions
export default itemsSlice.reducer