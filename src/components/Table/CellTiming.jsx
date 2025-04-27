import React from 'react'
import { useSelector } from 'react-redux'

import { selectNow } from '../../redux/clock/selectors'

import { formatSigned, formatRemainingTime } from '../../utils/format'

import styles from './Cell.module.scss'

const CellItem = ({ funding_24h, funding_time }) => {
  const now = useSelector(selectNow)
  const remainingSeconds = funding_time - now
  const { timeString } = formatRemainingTime(Math.max(remainingSeconds, 0))

  return (
    <li className={styles['cell-item']}>
      <span>{formatSigned(funding_24h)}</span>
      <time>{timeString}</time>
    </li>
  )
}

export default CellItem