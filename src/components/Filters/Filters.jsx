import React from 'react'

import Fasteners from '../Fasteners/Fasteners'
import Dropdown from '../Dropdown/Dropdown'

import styles from './Filters.module.scss'

const Filters = () => {
	const dropdownStrategy = [
		{ label: 'long+short:funding' },
		{ label: 'long+short:spread' },
		{ label: 'short+short:funding' },
		{ label: 'short+short:spread' },
	]

	return (
		<section className={styles['filters']}>
			<Fasteners />
			<div className="container">
				<div className={styles['filters-body']}>
					<Dropdown
						options={dropdownStrategy}
						placeholder='Стратегия' />
				</div>
			</div>
		</section>
	)
}

export default Filters