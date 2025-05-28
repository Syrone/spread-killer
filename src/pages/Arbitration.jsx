import React from 'react'
import { useDispatch } from 'react-redux'

import { defaultFilters, setPageName } from '../redux/filters/slice'

import Filters from "../components/Filters/Filters"
import Table from "../components/Table/Table"

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
			<Filters />
			<Table />
		</>
	)
}

export default Arbitration