import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import clsx from 'clsx'

import { useYmLink } from '../../hooks/useYmLink'
import { useScrollbarWidth } from '../../hooks/useScrollbarWidth'

import { fetchItems, setNextFetchAt } from '../../redux/items/slice'
import { selectStatus, selectVisibleItems, selectError } from '../../redux/items/selectors'

import TableScrollbar from './TableScrollbar'
import TableHeader from './TableHeader'
import RowSkeleton from '../TableRow/RowSkeleton'

import styles from './Table.module.scss'

const DEFAULT_SKELETONS = 18

const Table = ({
	arrayColumnHeader,
	RowComponent,
}) => {
	const dispatch = useDispatch()
	const items = useSelector(selectVisibleItems)
	const status = useSelector(selectStatus)
	const error = useSelector(selectError)

	React.useEffect(() => {
		const POLL_INTERVAL = 15
		let intervalId

		const poll = async () => {
			const nowSec = Math.floor(Date.now() / 1000)
			dispatch(setNextFetchAt(nowSec + POLL_INTERVAL))
			try {
				await dispatch(fetchItems()).unwrap()
			} catch (err) { }
		}

		poll()
		intervalId = setInterval(poll, POLL_INTERVAL * 1000)

		return () => clearInterval(intervalId)
	}, [dispatch])

	const isLoading = status === 'loading'
	const isRefreshing = status === 'refreshing'
	const isInitial = isLoading && items.length === 0

	useScrollbarWidth()
	useYmLink('on_click_link')

	return (
		<section className={styles['table-section']}>
			<div className='container'>

				{status === 'error' && (
					<div className={styles['message']}>
						Ошибка загрузки данных: {error}. Попробуйте позже.
					</div>
				)}


				{(status === 'success' || isRefreshing || isLoading) && (
					items.length === 0 && !isInitial ? (
						<div className={styles['message']}>
							Ничего не найдено
						</div>
					) : (
						<Virtuoso
							role='table'
							className={clsx(
								styles['table'],
								arrayColumnHeader && arrayColumnHeader.length === 7 && styles['table-cols-7'],
								'scrollable'
							)}
							data={['header', ...(isInitial ? Array(DEFAULT_SKELETONS).fill(undefined) : items)]}
							topItemCount={1}
							computeItemKey={(index, item) =>
								item === 'header'
									? 'header' : isInitial
										? `skeleton-${index}` : item.id
							}
							components={{
								Scroller: TableScrollbar,
								List: React.forwardRef((props, ref) => (
									<div
										role="rowgroup"
										className={styles['table-body']}
										{...props}
										ref={ref}
									/>
								)),
								Item: React.forwardRef((props, ref) => (
									<div role="row" className={styles.row} {...props} ref={ref} />
								)),
							}}
							itemContent={(_, item) => {
								if (item === 'header') {
									return <TableHeader arrayColumnHeader={arrayColumnHeader} className={styles['row']} />
								}

								return isInitial
									? <RowSkeleton />
									: <RowComponent {...item} />
							}}
						/>
					)
				)}
			</div>
		</section>
	)
}

export default Table