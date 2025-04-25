import React from 'react'
import clsx from 'clsx'

import Icon from '../Icon/Icon'

import styles from './Checkbox.module.scss'

const Checkbox = ({
	checked = false,
	onChangeCallback,
	className
}) => {
	const handleChange = (e) => onChangeCallback && onChangeCallback(e.target.checked)

	return (
		<div className={clsx(
			styles['checkbox'],
			className
		)}>
			<input
				type='checkbox'
				className={styles['checkbox-input']}
				checked={checked}
				onChange={handleChange} />
			<Icon name={'check'} className={styles['checkbox-icon']} />
		</div>
	)
}

export default Checkbox