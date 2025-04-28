import React from 'react'
import clsx from 'clsx'

import { isPositive, formatSigned } from '../../utils/format'

import Icon from '../Icon/Icon'
import CellTiming from './CellTiming'

import styles from './Cell.module.scss'

const CellList = React.memo(({ items, renderItem }) => (
	<ul className={styles['cell-list']}>
		{items.map(renderItem)}
	</ul>
))

const Row = ({ coin, pairs, f_spread, open_spread }) => {

	return (
		<>
			<div role='cell' className={styles['cell']}>
				<span className={styles['cell-name']}>
					{coin}
				</span>
			</div>

			<div role='cell' className={styles['cell']}>
				<CellList
					items={pairs}
					renderItem={({ exchange, price, pair, position }, i) => (
						<li
							key={i}
							className={styles['cell-item']}>
							<a
								href={pair.url}
								className={styles['cell-item-link']}
								target='_blank'
								rel='noreferrer'>
								<Icon name={exchange.toLowerCase()} />
								<span>
									{exchange}
								</span>
							</a>
							<span>
								{price}
								<Icon
									className={clsx(
										position === 'LONG' && styles['cell-item-success'],
										position === 'SHORT' && styles['cell-item-danger']
									)}
									name={'arrowUp45deg'} />
							</span>
						</li>
					)}
				/>
			</div>

			<div role='cell' className={styles['cell']}>
				<CellList
					items={pairs}
					renderItem={({ funding, funding_period }, i) => (
						<li
							key={i}
							className={styles['cell-item']}>
							<span>
								{formatSigned(funding)}
							</span>
							<time>
								{`${funding_period}ч`}
							</time>
						</li>
					)} />
			</div>

			<div role='cell' className={styles['cell']}>
				<ul className={styles['cell-list']}>
					<CellList
						items={pairs}
						renderItem={({ funding_24h, funding_time }, i) => (
							<CellTiming
								key={i}
								funding_24h={funding_24h}
								funding_time={funding_time}
							/>
						)} />
				</ul>
			</div>

			<div role='cell' className={styles['cell']}>
				<div className={clsx(
					styles['cell-spread'],
					isPositive(f_spread) ? styles['plus'] : styles['minus']
				)}>
					<span>
						{formatSigned(f_spread)}
					</span>

					<Icon
						className={styles['cell-spread-icon']}
						name={isPositive(f_spread) ? 'plus' : 'minus'} />
				</div>
			</div>

			<div role='cell' className={styles['cell']}>
				<div className={clsx(
					styles['cell-spread'],
					isPositive(open_spread) ? styles['plus'] : styles['minus']
				)}>
					<span>
						{formatSigned(open_spread)}
					</span>

					<Icon
						className={styles['cell-spread-icon']}
						name={isPositive(open_spread) ? 'plus' : 'minus'} />
				</div>
			</div>
		</>
	)
}

export default React.memo(Row)