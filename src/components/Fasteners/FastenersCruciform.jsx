import React from 'react'

import styles from './FastenersCruciform.module.scss'
import clsx from 'clsx'

export default function FastenersCruciform({ className }) {
	return (
		<div className={clsx(
			styles['fasteners-cruciform'],
			className
		)}>
			<span></span>
			<span></span>
		</div>
	)
}
