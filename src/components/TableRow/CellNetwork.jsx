import React from 'react'
import styles from './Cell.module.scss'

function uniq(arr) {
  return Array.from(new Set(arr))
}

export const WithdrawNetworks = React.memo(({ items }) => {
  const networks = uniq(
    items
      .filter(item => item.withdraw_enabled)
      .map(item => item.withdraw_network)
  )

  return (
    <div className={styles['cell-network']}>
      {networks.length > 0 ? networks.join(', ') : '–'}
    </div>
  )
})

export const DepositNetworks = React.memo(({ items }) => {
  const networks = uniq(
    items
      .filter(item => item.deposit_enabled)
      .map(item => item.deposit_network)
  )

  return (
    <div className={styles['cell-network']}>
      {networks.length > 0 ? networks.join(', ') : '–'}
    </div>
  )
})
