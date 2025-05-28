import { createSlice } from '@reduxjs/toolkit'

const THEME_KEY = 'theme'
const initial = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'

const themeSlice = createSlice({
	name: 'theme',
	initialState: { theme: initial },
	reducers: {
		toggleTheme(state) {
			state.theme = state.theme === 'light' ? 'dark' : 'light'
			localStorage.setItem(THEME_KEY, state.theme)
			document.documentElement.classList.toggle('dark-theme', state.theme === 'dark')
			document.documentElement.classList.toggle('light-theme', state.theme === 'light')
		},
	}
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
