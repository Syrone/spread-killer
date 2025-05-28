import React from 'react'

import { formatPrice } from '../../utils/format'

import styles from './Cell.module.scss'

const CellOrderbook = ({ items }) => {
	// const totalBase = items.reduce(
	// 	(sum, item) => sum + (item.orderbook_volume_base || 0),
	// 	0
	// )
	// const totalUsd = items.reduce(
	// 	(sum, item) => sum + (item.orderbook_volume_usd || 0),
	// 	0
	// )

	return (
		<div className={styles['cell-orderbook']}>
			<div className={styles['cell-orderbook-base']}>{formatPrice(items[0].orderbook_volume_base.toFixed(2))}</div>
			<div className={styles['cell-orderbook-usd']}>{formatPrice(items[0].orderbook_volume_usd.toFixed(2))} $</div>
		</div>
	)
}

export default React.memo(CellOrderbook)
