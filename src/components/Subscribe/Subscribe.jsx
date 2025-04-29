import React from 'react'
import clsx from 'clsx'

import { useResponsiveText } from '../../hooks/useResponsiveText'

import buttonStyles from '../Buttons/Button.module.scss'
import styles from './Subscribe.module.scss'

export default function Subscribe({ 
	className,
	size = "base",
	typestyle = "success",
}) {
	const buttonText = useResponsiveText(776, 'Купить подписку', 'Подписка')

	return (
		<a
			href='https://t.me/SpreadKillerbot'
			target='_blank'
			rel='noreferrer'
			className={clsx(
				styles['subscribe'],
				buttonStyles['btn'],
				size && buttonStyles[`btn-${size}`],
				typestyle && buttonStyles[`btn-${typestyle}`],
				className
			)}>
			{buttonText}
		</a>
	)
}
