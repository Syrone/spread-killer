import React from 'react'
import clsx from 'clsx'

import { isPositive, formatSigned } from '../../utils/format'

import Icon from '../Icon/Icon'

import styles from './Cell.module.scss'

const CellSpread = ({ spread }) => {
	const timestamps = Object.keys(spread)
	const lastKey = timestamps[timestamps.length - 1]
	const lastSpread = spread[lastKey]

	return (
		<div className={clsx(
			styles['cell-spread'],
			isPositive(lastSpread) ? styles['plus'] : styles['minus']
		)}>
			<span>
				{formatSigned(lastSpread)}
			</span>

			<Icon
				className={styles['cell-spread-icon']}
				name={isPositive(lastSpread) ? 'plus' : 'minus'} />
		</div>
	)
}

export default React.memo(CellSpread)