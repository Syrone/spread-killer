import React from 'react'

import FastenersCruciform from './FastenersCruciform'

import styles from './Fasteners.module.scss'

const Fasteners = () => {

	return (
		<>
			<div className={styles['fasteners']}>
				<span></span>
				<span></span>
			</div>
			<FastenersCruciform />
		</>
	)
}

export default Fasteners