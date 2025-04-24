import { useTheme } from "../../hooks/useTheme"

import Button from '../Buttons/Button'

import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<Button
			icon={theme === "dark" ? 'lightTheme' : 'darkTheme'}
			className={styles['theme-toggle']}
			typestyle="icon"
			onClick={toggleTheme} />
	)
}

export default ThemeToggle