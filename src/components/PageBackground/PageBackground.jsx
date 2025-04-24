import React from 'react'

import backgroundWebpLightTheme from '../../assets/images/smoke-light-theme.webp'
import backgroundWebpDarkTheme from '../../assets/images/smoke-dark-theme.webp'

import styles from './PageBackground.module.scss'

const PageBackground = () => {
	return (
		<div className={styles['page-background']}>
			<span style={{ backgroundImage: `url(${backgroundWebpLightTheme})` }}></span>
			<span style={{ backgroundImage: `url(${backgroundWebpDarkTheme})` }}></span>
		</div>
	)
}

export default PageBackground