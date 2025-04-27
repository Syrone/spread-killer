import { createSlice } from '@reduxjs/toolkit'

const clockSlice = createSlice({
	name: 'clock',
	initialState: {
		now: Math.floor(Date.now() / 1000)
	},
	reducers: {
		tick(state) {
			state.now = Math.floor(Date.now() / 1000)
		},
	},
});

export const { tick } = clockSlice.actions
export default clockSlice.reducer
