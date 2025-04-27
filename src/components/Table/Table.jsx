import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import clsx from 'clsx'

import { useScrollbarWidth } from '../../hooks/useScrollbarWidth'
import { useHasScroll } from '../../hooks/useHasScroll'

import { fetchItems, setNextFetchAt } from '../../redux/items/slice'
import { selectStatus, selectVisibleItems } from '../../redux/items/selectors'

import TableHeader from './TableHeader'
import Row from './Row'
import RowSkeleton from './RowSkeleton'

import styles from './Table.module.scss'

const DEFAULT_SKELETONS = 18

const CustomScroller = React.forwardRef((props, ref) => {
	useHasScroll(ref)
	return <div ref={ref} {...props} />
})

const Table = () => {
	const dispatch = useDispatch()
	const items = useSelector(selectVisibleItems)
	const status = useSelector(selectStatus)

	React.useEffect(() => {
		let cancelled = false

		const POLL_INTERVAL = 15

		const poll = async () => {
			try {
				await dispatch(fetchItems()).unwrap()
				const nowSec = Math.floor(Date.now() / 1000)
				dispatch(setNextFetchAt(nowSec + POLL_INTERVAL))
			} catch (err) { }

			if (!cancelled) {
				setTimeout(poll, POLL_INTERVAL * 1000)
			}
		}

		poll()
		return () => { cancelled = true }
	}, [dispatch])

	const isInitial = status === 'loading' && items.length === 0

	useScrollbarWidth()

	return (
		<section className={styles['table-section']}>
			<div className='container'>

				{status === 'error' && (
					<div className={styles['message']}>
						Ошибка загрузки данных. Попробуйте обновить страницу.
					</div>
				)}


				{status !== 'error' && (
					items.length === 0 && status === 'success' ? (
						<div className={styles['message']}>
							Ничего не найдено
						</div>
					) : (
						<Virtuoso
							role='table'
							className={clsx(
								styles['table'],
								'scrollable'
							)}
							data={['header', ...(isInitial ? Array(DEFAULT_SKELETONS).fill(undefined) : items)]}
							topItemCount={1}
							computeItemKey={(index, item) =>
								item === 'header'
									? 'header' : isInitial
										? `skeleton-${index}` : item.coin_id
							}
							components={{
								Scroller: CustomScroller,
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
									return <TableHeader className={styles['row']} />
								}

								return isInitial
									? <RowSkeleton />
									: <Row {...item} />
							}}
						/>
					)
				)}
			</div>
		</section>
	)
}

export default Table