import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	toggleExchange, setMValue,
	setSearch, setDiffIntervals
} from '../../redux/filters/slice'

import { selectNextFetchAt } from '../../redux/items/selectors'
import { selectFilters } from '../../redux/filters/selectors'
import { selectNow } from '../../redux/clock/selectors'

import { useElementHeightVar } from '../../hooks/useElementHeightVar'

import throttle from '../../utils/throttle'
import debounce from '../../utils/debounce'

import Fasteners from '../Fasteners/Fasteners'
import Icon from '../Icon/Icon'
import Button from '../Buttons/Button'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'
import Switcher from '../Switcher/Switcher'

import styles from './Filters.module.scss'

// const DROPDOWN_STRATEGY = [
// 	{ label: 'long+short:funding', selected: false },
// 	{ label: 'long+short:spread', selected: false },
// ]

const DROPDOWN_EXCHANGES = [
	{ icon: 'binance', label: 'Binance', selected: false },
	{ icon: 'bingx', label: 'Bingx', selected: false },
	{ icon: 'bitget', label: 'Bitget', selected: false },
	{ icon: 'bybit', label: 'Bybit', selected: false },
	{ icon: 'gateio', label: 'Gateio', selected: false },
	{ icon: 'htx', label: 'Huobi', selected: false },
	{ icon: 'hyperliquid', label: 'Hyperliquid', selected: false },
	{ icon: 'lbank', label: 'Lbank', selected: false },
	{ icon: 'mexc', label: 'Mexc', selected: false },
	{ icon: 'okx', label: 'Okx', selected: false },
	{ icon: 'ourbit', label: 'Ourbit', selected: false }
]

const Filters = () => {
	const dispatch = useDispatch()
	const { exchanges, mValue, search, diffIntervals } = useSelector(selectFilters)
	const nextFetchAt = useSelector(selectNextFetchAt)
	const now = useSelector(selectNow)
	const secondsLeft = nextFetchAt
		? Math.max(nextFetchAt - now, 0)
		: 15

	const [searchState, setSearchState] = React.useState({
		searchValue: search,
		searchMValue: mValue,
		placeholder: window.innerWidth > 992 ? 'Поиск криптовалюты' : 'Поиск'
	})
	const [switcherState, setSwitcherState] = React.useState({
		text: window.innerWidth > 992 ? 'Разные интервалы' : '+ / -'
	})
	const filtersRef = useElementHeightVar('--filters-height')

	const handleResizeThrottled = React.useCallback(() =>
		throttle(() => {
			setSearchState(prev => ({
				...prev,
				placeholder: window.innerWidth > 992 ? 'Поиск криптовалюты' : 'Поиск'
			}))
			setSwitcherState(prev => ({
				...prev,
				text: window.innerWidth > 992 ? 'Разные интервалы' : '+ / -'
			}))
		}), []
	)

	React.useEffect(() => {
		window.addEventListener('resize', handleResizeThrottled)
		return () => window.removeEventListener('resize', handleResizeThrottled)
	}, [handleResizeThrottled])

	const debouncedSetM = React.useMemo(
		() => debounce((value) => {
			const numeric = value.replace(/\D/g, '')
			dispatch(setMValue(numeric))
		}, 300),
		[dispatch]
	)

	const debouncedSearch = React.useMemo(
		() => debounce((value) => {
			dispatch(setSearch(value))
		}, 300),
		[dispatch]
	)

	return (
		<section ref={filtersRef} className={styles['filters']}>
			<Fasteners hasLine={true} hasFill={true} />
			<div className="container">
				<div className={styles['filters-body']}>
					{/* <Dropdown
						options={DROPDOWN_STRATEGY}
						placeholder='Стратегия'
						selected={strategy}
						onChange={value => dispatch(setStrategy(value))} /> */}
					<Dropdown
						options={DROPDOWN_EXCHANGES}
						multiple={true}
						placeholder='Биржи'
						selected={exchanges}
						onChange={value => dispatch(toggleExchange(value))} />

					<div className={styles['input-number']}>
						<Input
							className={styles['input-number-input']}
							placeholder='0'
							hasReset={false}
							value={searchState.searchMValue}
							maxLength={2}
							onChange={(e) => {
								const value = e.target.value.replace(/\D/g, '')
								setSearchState(prev => ({
									...prev,
									searchMValue: value
								}))
								debouncedSetM(value)
							}} />
						<Button
							size={'base'}
							typestyle={'secondary'}
							className={styles['input-number-button']}>
							H
						</Button>
					</div>

					<div className={styles['filters-block']}>
						<Input
							className={styles['filters-search']}
							placeholder={searchState.placeholder}
							value={searchState.searchValue}
							onChange={(e) => {
								const value = e.target.value
								setSearchState(prev => ({
									...prev,
									searchValue: value
								}))
								debouncedSearch(value)
							}} />

						<Switcher
							className={styles['filters-switcher']}
							text={switcherState.text}
							checked={diffIntervals}
							onChange={(checked) => dispatch(setDiffIntervals(checked))} />
					</div>

					<div className={styles['filters-period']}>
						<span>{secondsLeft}s</span>
						<Icon
							className={styles['filters-period-icon']}
							name={'time'} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Filters