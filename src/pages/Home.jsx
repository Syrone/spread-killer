import Filters from "../components/Filters/Filters"
import Table from "../components/Table/Table"
import Row from '../components/TableRow/Row'

export default function Home() {

	return (
		<>
			<Filters />
			<Table RowComponent={Row} />
		</>
	)
}