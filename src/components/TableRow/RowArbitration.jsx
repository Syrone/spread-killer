import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import { useNow } from '../../hooks/useNow'
import { formatTimeSecond } from '../../utils/format'

import { toggleItem } from '../../redux/items/slice'
import { selectOpenRows } from '../../redux/items/selectors'

import Icon from '../Icon/Icon'
import Button from '../Buttons/Button'
import CellLigament from './CellLigament'
import CellLifetime from './CellLifetime'
import CellOrderbook from './CellOrderbook'
import CellSpread from './CellSpread'
import TradingChart from '../TradingChart/TradingChart'

import styles from './Cell.module.scss'

const RowArbitration = ({
	id,
	coin,
	pairs,
	open_spread,
	date_added,
	withdraw_network,
	deposit_network
}) => {
	const now = useNow()
	const dispatch = useDispatch()
	const openRows = useSelector(selectOpenRows)
	const isOpen = openRows[id]
	const handleToggle = React.useCallback(() => dispatch(toggleItem(id)), [dispatch, id])

	return (
		<>
			<div role='cell' className={clsx(
				styles['cell'],
				styles['cell-collapse-header']
			)}>
				<Button
					icon='arrowDown'
					className={clsx(
						styles['cell-collapse-button'],
						isOpen && 'is-active'
					)}
					onClick={handleToggle}>
					{coin}/{pairs[0].pair.quote}
				</Button>
			</div>

			<div role='cell' className={styles['cell']}>
				<CellLigament pairs={pairs} />
			</div>

			<div role='cell' className={styles['cell']}>
				<CellOrderbook items={pairs} />
			</div>

			<div role='cell' className={styles['cell']}>
				<CellSpread spread={open_spread} />
			</div>

			<div role='cell' className={styles['cell']}>
				<CellLifetime
					dateAdded={date_added} />
			</div>

			<div role='cell' className={styles['cell']}>
				<div>{withdraw_network}</div>
			</div>

			<div role='cell' className={styles['cell']}>
				<div>{deposit_network}</div>
			</div>

			<div role='cell' className={clsx(
				styles['cell-collapse'],
				isOpen && styles['is-open'],
			)}>
				<div className={styles['cell-collapse-content']}>
					{isOpen && (
						<>
							<div className={styles['cell-pairs']}>
								{pairs.map(({ exchange, price, position, funding_time, orderbook_volume_usd, volume }, i) => (
									<div key={i} className={styles['cell-pair']}>
										<div className={styles['cell-pair-header']}>
											<span className={styles['cell-pair-name']}>
												<Icon 
													className={styles['cell-pair-name-icon']}
													name={exchange.toLowerCase()} />
												<span>
													{exchange}
												</span>
											</span>
											<span className={styles['cell-pair-price']}>
												<Icon
													className={clsx(
														position === 'LONG' && styles['cell-item-success'],
														position === 'SHORT' && styles['cell-item-danger']
													)}
													name={'arrowUp45deg'} />
											</span>
										</div>

										<ul className={styles['cell-pair-list']}>
											<li className={styles['cell-pair-list-item']}>
												<span>Цена:</span>
												<span>{price.toFixed(5)}</span>
											</li>
											<li className={styles['cell-pair-list-item']}>
												<span>Фандинг:</span>
												<span>1% {formatTimeSecond(funding_time - now)}</span>
											</li>
											<li className={styles['cell-pair-list-item']}>
												<span>Объем:</span>
												<span>{orderbook_volume_usd} $</span>
											</li>
											<li className={styles['cell-pair-list-item']}>
												<span>Объем 24:</span>
												<span>{volume} $</span>
											</li>
										</ul>
									</div>
								))}
							</div>
							<TradingChart id={id} data={open_spread} className={styles['cell-chart']} isOpen={isOpen} />
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default React.memo(RowArbitration)