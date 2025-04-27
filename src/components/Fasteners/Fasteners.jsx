import React from 'react'
import clsx from 'clsx'

import styles from './Fasteners.module.scss'

const Fasteners = ({ className, hasCross = false, hasLine = false, hasFill = false }) => {

	return (
		<>
			<div className={clsx(
				styles['fasteners'],
				className
			)}>
				<span>
					<span className={styles['fasteners-square']}></span>
					<span className={styles['fasteners-square']}></span>
				</span>

				{
					hasCross && (
						<span>
							<span className={styles['fasteners-cross']}></span>
							<span className={styles['fasteners-cross']}></span>
						</span>
					)
				}

				{
					hasLine && (
						<span>
							<span className={clsx(
								styles['fasteners-line'],
								hasFill && styles['fasteners-fill']
							)}></span>
							<span className={clsx(
								styles['fasteners-line'],
								hasFill && styles['fasteners-fill']
							)}></span>
						</span>
					)
				}
			</div>
		</>
	)
}

export default Fasteners