import React from 'react'
import clsx from 'clsx'

import Button from '../Buttons/Button'

import styles from './Dropdown.module.scss'

const Dropdown = ({ options = [], placeholder = "Dropdown", onSelect }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [selected, setSelected] = React.useState(null)
	const dropdownRef = React.useRef(null)

	// Клик вне дропдауна
	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleSelect = (option) => {
		setSelected(option)
		setIsOpen(false)
		onSelect?.(option)
	}

	return (
		<div
			ref={dropdownRef}
			className={styles['dropdown']}>
			<Button
				className={styles['dropdown-button']}
				size={'base'}
				icon={'arrowDown'}
				onClick={() => setIsOpen(prev => !prev)}>
				<span className={styles['dropdown-button-text']}>
					{selected ? selected.label : placeholder}
				</span>
			</Button>

			{isOpen && (
				<div className={styles['dropdown-menu']}>
					<ul className={clsx(
						styles['dropdown-list'],
						'srollable-y'
					)}>
						{options.map((option) => (
							<li
								key={option.label}
								className={styles['dropdown-item']}>
								<Button
									className={clsx(
										styles['dropdown-item-button'],
										selected?.label === option.label && styles['is-active']
									)}
									size={'base'}
									icon={'check'}
									isActive={selected?.label === option.label}
									onClick={() => handleSelect(option)}
								>
									<span>{option.label}</span>
								</Button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Dropdown