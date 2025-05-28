import React from 'react'

import Icon from '../Icon/Icon'

import styles from './Cell.module.scss'

const CellLigament = ({ pairs }) => {
	return (
		<div className={styles['cell-ligament']}>
			{pairs.map(({ exchange, price, pair }, idx) => (
				<div key={exchange + pair.base + pair.quote} className={styles['cell-ligament-item']}>
					<a
						href={pair.url}
						target="_blank"
						rel="noreferrer"
						className={styles['cell-ligament-link']}
					>
						<Icon
							className={styles['cell-ligament-link-icon']}
							name={exchange.toLowerCase()} />
						<span>{exchange.toLowerCase()}</span>
					</a>
					<span className={styles['cell-ligament-price']}>{price.toFixed(5)} $</span>

					{idx === 0 && (
						<Icon
							name="arrowUp45deg"
							className={styles['cell-ligament-icon']}
						/>
					)}
				</div>
			))}
		</div>
	)
}

export default React.memo(CellLigament)