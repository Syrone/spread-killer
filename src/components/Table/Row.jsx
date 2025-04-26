import React from 'react'
import clsx from 'clsx'

import { isPositive, formatSigned, formatTimestamp } from '../../utils/format'

import Icon from '../Icon/Icon'

import styles from './Cell.module.scss'

const Row = ({ className, coin, pairs, f_spread, open_spread }) => {

	const exchangeList = React.useMemo(() => (
		pairs.map(({ exchange, price, pair, position }, index) => (
			<li
				key={index}
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
			)
		)
	), [pairs])

	const fundingList = React.useMemo(() => (
		pairs.map(({ funding, funding_period }, index) => (
			<li
				key={index}
				className={styles['cell-item']}>
				<span>
					{formatSigned(funding)}
				</span>
				<time>
					{`${funding_period}ч`}
				</time>
			</li>
		))
	), [pairs])

	const funding24List = React.useMemo(() => (
		pairs.map(({ funding_24h, funding_time }, index) => {
			const { timeString, isoString } = formatTimestamp(funding_time)

			return (
				<li
					key={index}
					className={styles['cell-item']}>
					<span>
						{formatSigned(funding_24h)}
					</span>
					<time dateTime={isoString}>
						{timeString}
					</time>
				</li>
			)
		})
	), [pairs])

	return (
		<>
			<div role='cell' className={styles['cell']}>
				<span className={styles['cell-name']}>
					{coin}
				</span>
			</div>

			<div role='cell' className={styles['cell']}>
				<ul className={styles['cell-list']}>
					{exchangeList}
				</ul>
			</div>

			<div role='cell' className={styles['cell']}>
				<ul className={styles['cell-list']}>
					{fundingList}
				</ul>
			</div>

			<div role='cell' className={styles['cell']}>
				<ul className={styles['cell-list']}>
					{funding24List}
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