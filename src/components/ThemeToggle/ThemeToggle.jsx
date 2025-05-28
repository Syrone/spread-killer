import { useSelector, useDispatch } from 'react-redux'

import { toggleTheme } from '../../redux/theme/slice'

import Button from '../Buttons/Button'

import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
	  const theme = useSelector(state => state.theme.theme)
		const dispatch = useDispatch()

	return (
		<Button
			icon={theme === "dark" ? 'lightTheme' : 'darkTheme'}
			className={styles['theme-toggle']}
			typestyle="icon"
			onClick={() => dispatch(toggleTheme())} />
	)
}

export default ThemeToggle