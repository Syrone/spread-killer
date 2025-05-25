import React from 'react'

import { useNow } from '../../hooks/useNow'

import { formatTimeSecond } from '../../utils/format'

import styles from './Cell.module.scss'

const CellLifetime = ({ lifetime }) => {
  const now = useNow()
	const [start] = React.useState(() => now)

  const elapsed = Math.floor(now - start)
  const remaining = Math.max(lifetime - elapsed, 0)

  return (
    <div className={styles['cell-lifetime']}>
			{formatTimeSecond(remaining)}
		</div>
  )
}

export default CellLifetime