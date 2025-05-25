import React from 'react'

import styles from './Cell.module.scss'

const CellList = React.memo(({ items, renderItem }) => (
	<ul className={styles['cell-list']}>
		{items.map(renderItem)}
	</ul>
))

export default CellList