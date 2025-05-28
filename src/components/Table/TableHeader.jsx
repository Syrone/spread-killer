import { useDispatch, useSelector } from 'react-redux'

import { COLUMNHEADER_MAP  } from '../../constants/tableHeaders'

import { setSort } from '../../redux/filters/slice'
import { selectNamespace, selectFilters } from '../../redux/filters/selectors'

import ColumnHeader from './ColumnHeader'

import styles from './TableHeader.module.scss'

const DEFAULT_COLUMNS = COLUMNHEADER_MAP['home']

const TableHeader = ({ className }) => {
	const dispatch = useDispatch()
	const namespace = useSelector(selectNamespace)
	const { sortBy, sortDir } = useSelector(selectFilters)

	const arrayColumnHeader = COLUMNHEADER_MAP[namespace.toLowerCase()] || DEFAULT_COLUMNS

	return (
		<div role='rowgroup' className={styles['table-header']}>
			<div role='row' className={className}>
				{arrayColumnHeader.map(obj => {
					const { key: objKey, ...columnProps } = obj

					return (
						<ColumnHeader
							key={objKey}
							{...columnProps}
							isActive={sortBy === objKey}
							direction={sortDir}
							onClick={() => dispatch(setSort({ sortBy: objKey }))} />
					)
				})}
			</div>
		</div>
	)
}

export default TableHeader