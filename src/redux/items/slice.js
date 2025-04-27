import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from '../../api'

const initialState = {
	items: [],
	status: 'loading',
	nextFetchAt: null
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
			state.status = 'loading'
		})
		builder.addCase(fetchItems.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.items = payload;
		})
		builder.addCase(fetchItems.rejected, (state) => {
			state.status = 'error'
		})
	},
})

export const { setNextFetchAt } = itemsSlice.actions
export default itemsSlice.reducer