import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSort } from '../../redux/filters/slice'

import ColumnHeader from './ColumnHeader'

import styles from './TableHeader.module.scss'

const COLUMNHEADER_ARRAY = [
	{ key: 'coin', label: 'Монета', popover: false, sort: true },
	{ key: 'priceDiff', label: 'Связка', popover: false, sort: true },
	{ key: 'fundingDiff', label: 'Фандинг', popover: 'Плата между трейдерами за удержание позиции.', sort: true },
	{ key: 'fundingTime', label: 'Фандинг [24ч]', popover: 'Прогнозируемая суточная ставка, если текущий фандинг сохранится.', sort: true },
	{ key: 'f_spread', label: 'F Spread', popover: 'Разница между фандингами на двух биржах.', sort: true },
	{ key: 'open_spread', label: 'Open Spread', popover: 'Разница между ценами на одну и ту же монету на двух биржах.', sort: true },
]

const TableHeader = ({ className }) => {
	const dispatch = useDispatch()
	const { sortBy, sortDir } = useSelector(state => state.filters)

	return (
		<div role='rowgroup' className={styles['table-header']}>
			<div role='row' className={className}>
				{COLUMNHEADER_ARRAY.map(obj => {
					const { key: objKey, ...columnProps } = obj

					return (
						<ColumnHeader
							key={objKey}
							{...columnProps}
							isActive={sortBy === objKey}
							direction={sortDir}
							onClick={() => dispatch(setSort({ sortBy: objKey }))} />
					)
				})}
			</div>
		</div>
	)
}

export default TableHeader