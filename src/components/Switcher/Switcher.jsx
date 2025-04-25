import React from 'react'
import clsx from 'clsx'

import styles from './Switcher.module.scss'

export default function Switcher({
	value = false,
	disabled = false,
	checked = false,
	text,
	onChange,
	className,
	...props
}) {
	const handleToggle = (e) => onChange && onChange(e.target.checked)

	return (
		<label className={clsx(
			styles['switcher'],
			className
		)}>
			<div className={styles['switcher-container']}>
				<input
					type='checkbox'
					className={styles['switcher-input']}
					checked={checked}
					onChange={handleToggle}
					disabled={disabled}
					{...props}
				/>
				<span
					className={styles['switcher-toggle']}
				></span>
				<span
					className={styles['switcher-decoration']}
				></span>
			</div>

			{text && <span>{text}</span>}
		</label>
	)
}
