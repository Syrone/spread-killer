import React from 'react'
import clsx from 'clsx'
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom'
import * as ScrollArea from '@radix-ui/react-scroll-area'

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
	selected,
	onChange,
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [localOptions, setLocalOptions] = React.useState([])
	const [searchInput, setSearchInput] = React.useState('')
	const [search, setSearch] = React.useState('')
	const searchRef = React.useRef(null)
	const dropdownRef = React.useRef(null)
	const {
		x,
		y,
		strategy,
		refs
	} = useFloating({
		placement: 'bottom-start',
		middleware: [offset(8), flip(), shift()],
		whileElementsMounted: autoUpdate,
	})

	React.useEffect(() => {
		const selArr = multiple
			? Array.isArray(selected) ? selected : []
			: (typeof selected === 'string' ? [selected] : [])

		setLocalOptions(options.map(o => ({
			label: o.label,
			icon: o.icon,
			selected: selArr.includes(o.label),
		})))
	}, [options, selected, multiple])

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
			const updated = localOptions.map(o => ({
				...o,
				selected: o.label === option.label
			}))
			setLocalOptions(updated)
			onChange && onChange(option.label)
			setIsOpen(false)
		}
	}

	const handleApply = () => {
		if (onChange) {
			const chosen = localOptions.filter(o => o.selected).map(o => o.label)
			chosen.length > 0 && onChange(chosen)
		}
		resetSearch()
		setIsOpen(false)
	}

	const handleReset = () => {
		if (onChange) {
			const hadSelection = localOptions.some(o => o.selected)
			hadSelection && onChange([])
		}

		setLocalOptions(prev => prev.map(o => ({ ...o, selected: false })))
		resetSearch()

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
		if (multiple) return placeholder
		const sel = localOptions.find(o => o.selected)
		return sel ? sel.label : placeholder
	}

	return (
		<div
			ref={dropdownRef}
			className={styles['dropdown']}>
			<Button
				ref={refs.setReference}
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

			{
				isOpen && (
					<div
						ref={refs.setFloating}
						className={clsx(
							styles['dropdown-menu'],
						)}
						style={{
							position: strategy,
							top: y ?? '',
							left: x ?? '',
						}}>
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

						<ScrollArea.Root type='auto'
							className={clsx(
								styles['dropdown-scroll-area'],
								'scroll-area'
							)}
						>
							<ScrollArea.Viewport
								className={clsx(
									styles['dropdown-scroll-viewport'],
									'scroll-area-viewport'
								)}
							>
								<ul className={styles['dropdown-list']}>
									{
										filtered.length > 0 ? (
											filtered.map(option => (
												<li
													key={option.label}
													className={styles['dropdown-item']}>
													<Button
														className={clsx(
															styles['dropdown-item-button'],
															multiple && styles['dropdown-item-label'],
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
							</ScrollArea.Viewport>

							<ScrollArea.Scrollbar className={clsx(
								'scroll-area-scrollbar',
								'scroll-area-scrollbar-thin'
							)} orientation='vertical' style={{ position: 'relative' }}>
								<ScrollArea.Thumb className={clsx(
									'scroll-area-thumb',
									'scroll-area-thumb-thin'
								)} />
							</ScrollArea.Scrollbar>
						</ScrollArea.Root>

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
				)
			}
		</div>
	)
}

export default React.memo(Dropdown)