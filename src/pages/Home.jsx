import React from 'react'
import { useDispatch } from 'react-redux'

import { setPageName } from '../redux/filters/slice'

import Filters from "../components/Filters/Filters"
import Table from "../components/Table/Table"

export default function Home() {
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(setPageName({
			pageName: 'Home',
		}))
	}, [dispatch])

	return (
		<>
			<Filters />
			<Table />
		</>
	)
}