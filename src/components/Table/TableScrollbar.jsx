import React from 'react'

import { useYmOnScroll } from '../../hooks/useYmOnScroll'
import { useHasScroll } from '../../hooks/useHasScroll'

const TableScrollbar = React.forwardRef((props, ref) => {
	useHasScroll(ref)
	useYmOnScroll(ref, 'table_listener_scroll')

	return <div ref={ref} {...props} />
})

export default TableScrollbar