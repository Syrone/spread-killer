import React from 'react'

import ButtonLink from '../Buttons/ButtonLink'

import styles from './NotFoundContent.module.scss'

export default function FotFoundContent() {
	return (
		<section className={styles['notfound']}>
			<div className='container'>
				<div className={styles['notfound-content']}>
					<p>
					Такой страницы не существует
					</p>
					<ButtonLink
						typestyle='secondary'
						size='base'>
						Назад
					</ButtonLink>
				</div>
			</div>
		</section>
	)
}
