import React from 'react'
import clsx from 'clsx'

import debounce from '../../utils/debounce'

import Icon from '../Icon/Icon'
import Button from '../Buttons/Button'
import Input from '../Input/Input'
import Checkbox from '../Checkbox/Checkbox'

import styles from './Dropdown.module.scss'

const Dropdown = ({
	options = [],
	multiple = false,
	placeholder = "Dropdown",
	onChange,
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [localOptions, setLocalOptions] = React.useState(options)
	const [searchInput, setSearchInput] = React.useState('')
	const [search, setSearch] = React.useState('')
	const searchRef = React.useRef(null)
	const dropdownRef = React.useRef(null)
	const [dropdownPosition, setDropdownPosition] = React.useState({
		up: false,
		left: false,
	})

	React.useEffect(() => {
		setLocalOptions(options)
	}, [options])

	React.useEffect(() => {
		if (isOpen && multiple && searchRef.current) {
			searchRef.current.focus()
		}
	}, [isOpen, multiple])

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

	React.useLayoutEffect(() => {
		isOpen && checkDropdownPosition()
	}, [isOpen])

	const checkDropdownPosition = () => {
		if (!dropdownRef.current) return
	
		const rect = dropdownRef.current.getBoundingClientRect()
	
		const spaceBelow = window.innerHeight - rect.bottom
		const spaceAbove = rect.top
		const spaceRight = window.innerWidth - rect.left
		const spaceLeft = rect.right
	
		setDropdownPosition({
			up: spaceBelow < 250 && spaceAbove > spaceBelow,
			left: spaceRight < 300 && spaceLeft > spaceRight
		})
	}

	const debouncedSearch = React.useMemo(() =>
		debounce((value) => setSearch(value), 300),
		[]
	)

	const resetSearch = () => {
		setSearch('')
		setSearchInput('')
	}

	const handleSelect = (option) => {
		if (multiple) {
			setLocalOptions(prev => prev.map(o =>
				o.label === option.label ? { ...o, selected: !o.selected } : o
			))
		} else {
			const updated = localOptions.map(o => ({ ...o, selected: o.label === option.label }))
			setLocalOptions(updated)
			onChange && onChange(updated.find(o => o.selected))
			setIsOpen(false)
		}
	}

	const handleApply = () => {
		onChange && onChange(localOptions.filter(o => o.selected))
		resetSearch()
		setIsOpen(false)
	}

	const handleReset = () => {
		resetSearch()
		setLocalOptions(prev => prev.map(o => ({ ...o, selected: false })))

		searchRef.current && searchRef.current.focus()
	}

	const dropdownClose = () => {
		setIsOpen(prev => !prev)
		resetSearch()
	}

	const filtered = localOptions.filter(o =>
		o.label.toLowerCase().includes(search.toLowerCase())
	)

	const displayText = () => {
		if (multiple) {
			return placeholder
		}
		const sel = localOptions.find(o => o.selected)
		return sel ? sel.label : placeholder
	}

	return (
		<div
			ref={dropdownRef}
			className={clsx(
				styles['dropdown'],
				dropdownPosition.up && styles['drop-up'],
				dropdownPosition.left && styles['drop-left']
			)}>
			<Button
				className={clsx(
					styles['dropdown-button'],
					isOpen && styles['is-active']
				)}
				size={'base'}
				icon={'arrowDown'}
				isActive={isOpen}
				onClick={() => dropdownClose()}>
				<span className={styles['dropdown-button-text']}>
					{displayText()}
				</span>
			</Button>

			{isOpen && (
				<div className={styles['dropdown-menu']}>
					{multiple && (
						<Input
							ref={searchRef}
							className={styles['dropdown-menu-search']}
							placeholder='Поиск биржи'
							value={searchInput}
							onChange={(e) => {
								setSearchInput(e.target.value)
								debouncedSearch(e.target.value)
							}} />
					)}

					<ul className={clsx(
						styles['dropdown-list'],
						'srollable-y'
					)}>
						{
							filtered.length > 0 ? (
								filtered.map(option => (
									<li
										key={option.label}
										className={styles['dropdown-item']}>
										<Button
											className={clsx(
												styles['dropdown-item-button'],
												styles['dropdown-item-label'],
												option.selected && styles['is-active']
											)}
											size="base"
											icon={!multiple && 'check'}
											isActive={option.selected}
											onClick={() => handleSelect(option)}>
											{option.icon && <Icon name={option.icon} />}
											<span>{option.label}</span>
											{
												multiple && (
													<Checkbox
														className={styles['dropdown-item-checkbox']}
														checked={option.selected}
													/>
												)
											}
										</Button>
									</li>
								))
							) : (
								<li className={styles['dropdown-empty']}>
									Ничего не найдено
								</li>
							)
						}
					</ul>

					{multiple && (
						<div className={styles['dropdown-buttons']}>
							<Button
								className={styles['dropdown-reset']}
								typestyle={'secondary'}
								size={'base'}
								onClick={handleReset}>
								Сбросить
							</Button>
							<Button
								className={styles['dropdown-apply']}
								typestyle={'success'}
								size={'base'}
								onClick={handleApply}>
								Применить
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Dropdown