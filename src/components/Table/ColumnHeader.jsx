import React from 'react'

import Button from '../Buttons/Button'
import Popover from '../Popover/Popover'

import styles from './ColumnHeader.module.scss'

const ColumnHeader = ({ label, popover, sort }) => {
	return (
		<div
			role='columnheader'
			className={styles['columnheader']}>
			<div className={styles['columnheader-info']}>
				<span>{label}</span>
				{
					popover && (
						<Popover className={styles['columnheader-popover']} popover={popover} />
					)
				}
			</div>

			{
				sort && (
					<div className={styles['columnheader-sort']}>
						<Button
							className={styles['columnheader-sort-up']}
							icon={'arrowDown'} />
						<Button
							className={styles['columnheader-sort-down']}
							icon={'arrowDown'} />
					</div>
				)
			}
		</div>
	)
}

export default ColumnHeader