import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from '../../api'

const initialState = {
	items: [],
	status: 'loading',
}

export const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchItems.pending, (state) => {
			state.prevCount = state.items.length
			state.status = 'loading'
    })
		builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload
			state.status = 'success'
    })
		builder.addCase(fetchItems.rejected, (state) => {
			state.status = 'error'
    })
	},
})

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const { data } = await api.get('/generate-data/')
    return data
  },
)

export const { setItems } = itemsSlice.actions

export default itemsSlice.reducer