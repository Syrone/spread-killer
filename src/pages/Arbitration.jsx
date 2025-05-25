import React from 'react'
import { useDispatch } from 'react-redux'

import { defaultFilters, setPageName } from '../redux/filters/slice'

import Filters from "../components/Filters/Filters"
import Table from "../components/Table/Table"
import Row from '../components/TableRow/Row'

const COLUMNHEADER_ARRAY = [
	{ key: 'coin', label: 'Пара', popover: false, sort: true },
	{ key: 'priceDiff', label: 'Связка', popover: false, sort: true },
	{ key: 'orderbook', label: 'Объем', popover: false, sort: true },
	{ key: 'open_spread', label: 'Профит', popover: false, sort: true },
	{ key: 'lifetime_seconds', label: 'Время', popover: false, sort: true },
	{ key: 'withdraw', label: 'Сети вывода', icon: { name: 'arrowUp45deg' }, popover: false, sort: false },
	{ key: 'deposit', label: 'Сети депозита', icon: { name: 'arrowUp45deg', class: 'down' }, popover: false, sort: false },
]

const ArbitrationRow = props => <Row type="arbitration" {...props} />

const Arbitration = () => {
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(setPageName({
			pageName: 'Arbitration',
			initialFilters: {
				...defaultFilters,
				sortBy: 'coin',
				sortDir: 'desc',
			}
		}))
	}, [dispatch])

	return (
		<>
			<Filters
				showSwitcher={false} />
			<Table
				arrayColumnHeader={COLUMNHEADER_ARRAY}
				RowComponent={ArbitrationRow} />
		</>
	)
}

export default Arbitration