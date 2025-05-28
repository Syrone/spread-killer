import React from 'react'
import { useSelector } from 'react-redux'

import { selectNamespace } from '../../redux/filters/selectors'

import RowDefault from './RowDefault'
import RowArbitration from './RowArbitration'

const Row = ({ ...rest }) => {
	const namespace = useSelector(selectNamespace)

	switch (namespace) {
		case 'Arbitration':
			return <RowArbitration {...rest} />

		case 'Home':
		default:
			return <RowDefault {...rest} />
	}
}

export default React.memo(Row)