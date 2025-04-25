import React from 'react'
import clsx from 'clsx'

import FastenersCruciform from './FastenersCruciform'

import styles from './Fasteners.module.scss'

const Fasteners = ({ className }) => {

	return (
		<>
			<div className={clsx(
				styles['fasteners'],
				className
			)}>
				<span></span>
				<span></span>
			</div>
			<FastenersCruciform className={className} />
		</>
	)
}

export default Fasteners