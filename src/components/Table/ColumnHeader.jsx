import React from 'react'
import clsx from 'clsx'

import Icon from '../Icon/Icon'
import Button from '../Buttons/Button'
import Popover from '../Popover/Popover'

import styles from './ColumnHeader.module.scss'

const ColumnHeader = ({
	label,
	popover,
	sort,
	onClick,
	isActive,
  direction
}) => {
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
					<Button
						onClick={onClick}
						className={styles['columnheader-sort']}>
						<Icon
							className={clsx(
								styles['columnheader-sort-icon'],
								isActive && direction === 'asc' && styles['is-active']
							)}
							name={'arrowDown'} />
						<Icon
							className={clsx(
								styles['columnheader-sort-icon'],
								isActive && direction === 'desc' && styles['is-active']
							)}
							name={'arrowDown'} />
					</Button>
				)
			}
		</div>
	)
}

export default ColumnHeader