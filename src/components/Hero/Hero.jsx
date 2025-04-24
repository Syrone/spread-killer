import React from 'react'

import WebpImage from '../WebpImage/WebpImage'

import logo from '../../assets/images/logo.png'
import logoWebp from '../../assets/images/logo.webp'
import svgFigureDarkTheme from '../../assets/images/figure-dark-theme.svg'
import svgFigureLightTheme from '../../assets/images/figure-light-theme.svg'
import smokeWebpLightTheme from '../../assets/images/smoke-light-theme.webp'
import smokeWebpDarkTheme from '../../assets/images/smoke-dark-theme.webp'

import styles from './Hero.module.scss'

const Hero = () => {
	return (
		<section className={styles['hero']}>
			<div className='container'>
				<div className={styles['hero-background']}>
					<span
						className={styles['hero-background-figure']}
						style={{ backgroundImage: `url(${svgFigureLightTheme})` }}></span>
					<span
						className={styles['hero-background-figure']}
						style={{ backgroundImage: `url(${svgFigureDarkTheme})` }}></span>

					<span
						className={styles['hero-background-smoke']}
						style={{ backgroundImage: `url(${smokeWebpLightTheme})` }}></span>
					<span
						className={styles['hero-background-smoke']}
						style={{ backgroundImage: `url(${smokeWebpDarkTheme})` }}></span>
				</div>

				<div className={styles['hero-bliks']}>
					{Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
				</div>

				<div className={styles['hero-body']}>
					<div className={styles['hero-inscription']}>
						<span className={styles['hero-inscription-text']}>
							<span>Spread</span>
							<span>Spread</span>
						</span>
						<span className={styles['hero-inscription-picture']}>
							<WebpImage src={logo} webp={logoWebp} width={'74'} height={'64'} alt={'logo'} />
							<WebpImage src={logo} webp={logoWebp} width={'74'} height={'64'} alt={'logo'} />
						</span>
						<span className={styles['hero-inscription-text']}>
							<span>Killer</span>
							<span>Killer</span>
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero