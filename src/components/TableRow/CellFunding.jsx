import { useNow } from '../../hooks/useNow'

import { formatSigned, formatRemainingTime } from '../../utils/format'

import styles from './Cell.module.scss'

const CellFunding = ({ funding_24h, funding_time }) => {
  const now = useNow()
  const remainingSeconds = funding_time - now
  const { timeString } = formatRemainingTime(Math.max(remainingSeconds, 0))

  return (
    <li className={styles['cell-item']}>
      <span>{formatSigned(funding_24h)}</span>
      <time>{timeString}</time>
    </li>
  )
}

export default CellFunding