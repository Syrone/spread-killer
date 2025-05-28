import clsx from 'clsx'

import logo from '../../assets/images/logo.png'
import logoWebp from '../../assets/images/logo.webp'
import WebpImage from '../WebpImage/WebpImage'

import ButtonLink from '../Buttons/ButtonLink'

import styles from './Logo.module.scss'

export default function Logo({ className, ...props }) {
	return (
		<ButtonLink
			className={clsx(
				styles['logo'],
				className
			)}
			{...props}>
			<WebpImage src={logo} webp={logoWebp} width={'40'} height={'34'} alt={'logo'} />
			<span className={styles['logo-text']}>
				<span>SKiller</span>
				<span>SKiller</span>
			</span>
		</ButtonLink>
	)
}
