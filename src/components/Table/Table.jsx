import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import clsx from 'clsx'

import { COLUMNHEADER_MAP } from '../../constants/tableHeaders'

import { useItems } from '../../hooks/useItems'
import { useYmLink } from '../../hooks/useYmLink'
import { useScrollbarWidth } from '../../hooks/useScrollbarWidth'

import { selectVisibleItems } from '../../redux/items/selectors'
import { selectNamespace } from '../../redux/filters/selectors'

import TableScrollbar from './TableScrollbar'
import TableHeader from './TableHeader'
import Row from '../TableRow/Row'
import RowSkeleton from '../TableRow/RowSkeleton'

import styles from './Table.module.scss'

const DEFAULT_COLUMNS = COLUMNHEADER_MAP['home']

const DEFAULT_SKELETONS = 18

const Table = () => {
	const namespace = useSelector(selectNamespace)

	const arrayColumnHeader = COLUMNHEADER_MAP[namespace.toLowerCase()] || DEFAULT_COLUMNS

	const items = useSelector(selectVisibleItems, shallowEqual)
	const {
		isLoading,
		isError,
		isFetching,
		error,
	} = useItems()


	const isInitialLoad = isLoading && items.length === 0
	const isEmpty = !isLoading && items.length === 0

	const virtuosoData = React.useMemo(() => {
		if (isInitialLoad) {
			return ['header', ...Array(DEFAULT_SKELETONS).fill(undefined)]
		}
		return ['header', ...items]
	}, [isInitialLoad, items])

	const computeItemKey = React.useMemo(() =>
		(index, item) => {
			if (item === 'header') return 'header'
			if (isInitialLoad) return `skeleton-${index}`
			return item.id
		},
		[isInitialLoad]
	)

	const itemContent = React.useMemo(() =>
		(index, item) => {
			const isEvenRow = index % 2 === 1

			if (item === 'header') {
				return <TableHeader className={styles['row']} />
			}

			return (
				<div className={clsx(styles.row, isEvenRow && styles.even)}>
					{isInitialLoad ? <RowSkeleton /> : <Row {...item} />}
				</div>
			)
		},
		[isInitialLoad]
	)

	useScrollbarWidth()
	useYmLink('on_click_link')

	return (
		<section className={styles['table-section']}>
			<div className='container'>

				{isError && (
					<div className={styles['message']}>
						Ошибка загрузки данных: {error?.message || 'Неизвестная ошибка. Попробуйте позже.'}
					</div>
				)}


				{!isLoading && !isError && isEmpty && (
					<div className={styles['message']}>
						Ничего не найдено
					</div>
				)}

				{!isError && !isEmpty && (
					<Virtuoso
						role='table'
						className={clsx(
							styles['table'],
							arrayColumnHeader && arrayColumnHeader.length === 7 && styles['table-cols-7'],
							'scrollable'
						)}
						data={virtuosoData}
						topItemCount={1}
						computeItemKey={computeItemKey}
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
						itemContent={itemContent}
					/>
				)}

				{isFetching && !isInitialLoad && (
					<div className={styles['message']}>Обновление данных…</div>
				)}
			</div>
		</section>
	)
}

export default Table