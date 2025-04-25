import React from 'react'
import clsx from 'clsx'

import Button from '../Buttons/Button'

import styles from './Input.module.scss'

const Input = ({
  value,
  onChange,
  placeholder = 'Enter text',
  type = 'text',
  label,
  error,
  className,
	ref,
  ...props
}) => {
	const handleReset = () => {
    const event = {
      target: {
        value: ''
      }
    }
    onChange?.(event)
  }

  return (
    <div className={clsx(styles['input-container'], className)}>
      {label && <label className={styles['input-label']}>{label}</label>}
			<div className={clsx(styles['input-wrapper'])}>
				<input
					ref={ref}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={clsx(
						styles['input'],
						value && styles['input-value'],
						error && styles['input-error']
					)}
					{...props}
				/>
				{value && (
					<Button
						className={styles['input-reset']}
						icon={'reset'}
						onClick={handleReset} />
				)}
			</div>
      {error && <span className={styles['input-error-message']}>{error}</span>}
    </div>
  )
}

export default Input
