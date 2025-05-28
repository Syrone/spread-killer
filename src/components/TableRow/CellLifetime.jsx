import React from 'react'
import { useNow } from '../../hooks/useNow'

import { formatTimeSecond } from '../../utils/format'

import styles from './Cell.module.scss'

const CellLifetime = ({ dateAdded }) => {
  const now = useNow()
  const lifetime = now - dateAdded

  return (
    <div className={styles['cell-lifetime']}>
      {formatTimeSecond(lifetime)}
    </div>
  )
}

export default React.memo(CellLifetime)