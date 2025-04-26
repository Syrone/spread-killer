import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

import { fetchItems } from '../../redux/items/slice'
import { selectItems, selectStatus } from '../../redux/items/selectors'

import Button from '../Buttons/Button'
import TableHeader from './TableHeader'
import Row from './Row'
import RowSkeleton from './RowSkeleton'

import styles from './Table.module.scss'

const DEFAULT_SKELETONS = 10

const Table = () => {
	const dispatch = useDispatch()
	const items = useSelector(selectItems)
	const status = useSelector(selectStatus)
	const viewportRef = React.useRef(null)

	const isInitialLoading = status === 'loading' && items.length === 0
	const isRefreshing = status === 'loading' && items.length > 0

	React.useEffect(() => {
		const fetch = () => dispatch(fetchItems())

		fetch()

		const interval = setInterval(fetch, 15000)

		return () => clearInterval(interval)
	}, [dispatch])

	return (
		<section className={styles['table-section']}>
			<div className='container'>
				<ScrollArea.Root role='table' type='auto' className={clsx(
					styles['table'],
					'scroll-area'
				)}>
					<TableHeader className={styles['row']} />

					<Virtuoso
						data={isInitialLoading ? Array.from({ length: DEFAULT_SKELETONS }) : items}
						style={{ height: '100%' }}
						components={{
							Scroller: React.forwardRef((props, ref) => (
								<ScrollArea.Viewport
									{...props}
									ref={ref}
									className='scroll-area-viewport'
								/>
							)),
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
						itemContent={(index, item) => {
							if (isInitialLoading) {
								return <RowSkeleton key={index} />
							}
							return <Row key={item.coin + index} {...item} />
						}}
					/>

					<div className='scroll-area-with-buttons'>
						<ScrollArea.Scrollbar className='scroll-area-scrollbar' orientation='vertical'>
							<ScrollArea.Thumb className='scroll-area-thumb' />
						</ScrollArea.Scrollbar>
						<Button
							className='scroll-area-button up'
							typestyle='secondary'
							icon='arrowDown'
							onClick={() => {
								viewportRef.current?.scrollBy({ top: -100, behavior: 'smooth' });
							}}
						/>
						<Button
							className='scroll-area-button down'
							typestyle='secondary'
							icon='arrowDown'
							onClick={() => {
								viewportRef.current?.scrollBy({ top: +100, behavior: 'smooth' });
							}}
						/>
					</div>
				</ScrollArea.Root>
			</div>
		</section>
	)
}

export default Table