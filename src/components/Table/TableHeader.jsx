import React from 'react'

import ColumnHeader from './ColumnHeader'

import styles from './TableHeader.module.scss'

const COLUMNHEADER_ARRAY = [
	{ label: 'Монета', popover: false, sort: true },
	{ label: 'Связка', popover: false, sort: true },
	{ label: 'Фандинг', popover: 'Разница между лучшими ценами покупки и продажи, пока сделка ещё не заключена', sort: true },
	{ label: 'Фандинг  [24ч]', popover: 'Какая-то подсказка 2', sort: true },
	{ label: 'F Spread', popover: 'Какая-то подсказка 3', sort: true },
	{ label: 'Open Spread', popover: 'Какая-то подсказка 4', sort: true },
]

const TableHeader = ({ className }) => {
	return (
		<div role='rowgroup' className={styles['table-header']}>
			<div role='row' className={className}>
				{
					COLUMNHEADER_ARRAY.map(obj => <ColumnHeader key={obj.label} {...obj} />)
				}
			</div>
		</div>
	)
}

export default TableHeader