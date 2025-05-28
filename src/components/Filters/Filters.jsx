import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	setStrategy, toggleExchange, setHValue, setMValue,
	setSearch, setDiffIntervals
} from '../../redux/filters/slice'

import ym from 'react-yandex-metrika'

import { useNow } from '../../hooks/useNow'
import { useResponsiveText } from '../../hooks/useResponsiveText'
import { useElementHeightVar } from '../../hooks/useElementHeightVar'

import { getFiltersConfig } from '../../utils/getFiltersConfig'

import { selectNextFetchAt } from '../../redux/items/selectors'
import { selectNamespace, selectFilters } from '../../redux/filters/selectors'

import debounce from '../../utils/debounce'

import Fasteners from '../Fasteners/Fasteners'
import Icon from '../Icon/Icon'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'
import Switcher from '../Switcher/Switcher'

import SearchTime from './SearchTime'

import styles from './Filters.module.scss'

const DROPDOWN_STRATEGY = [
	{ label: 'long+short:funding', selected: false },
	{ label: 'long+short:spread', selected: false },
]

const DROPDOWN_EXCHANGES = [
	{ icon: 'binance', label: 'Binance', selected: false },
	{ icon: 'bingx', label: 'Bingx', selected: false },
	{ icon: 'bitget', label: 'Bitget', selected: false },
	{ icon: 'bybit', label: 'Bybit', selected: false },
	{ icon: 'gateio', label: 'Gateio', selected: false },
	{ icon: 'kraken', label: 'Kraken', selected: false },
	{ icon: 'huobi', label: 'Huobi', selected: false },
	{ icon: 'hyperliquid', label: 'Hyperliquid', selected: false },
	{ icon: 'lbank', label: 'Lbank', selected: false },
	{ icon: 'mexc', label: 'Mexc', selected: false },
	{ icon: 'okx', label: 'Okx', selected: false },
	{ icon: 'ourbit', label: 'Ourbit', selected: false }
]

const Filters = () => {
	const dispatch = useDispatch()
	const namespace = useSelector(selectNamespace)
	const { strategy, exchanges, hValue, mValue, search, diffIntervals } = useSelector(selectFilters)
	const nextFetchAt = useSelector(selectNextFetchAt)
	const now = useNow()

	const { showStrategy, showExchanges, showSwitcher, showSearchHours, showSearchMinutes } = getFiltersConfig(namespace)

	const secondsLeft = nextFetchAt
		? Math.max(nextFetchAt - now, 0)
		: 15

	const [searchState, setSearchState] = React.useState({
		searchValue: search,
		searchHValue: hValue,
		searchMValue: mValue,
	})

	React.useEffect(() => {
		setSearchState({ searchValue: search, searchHValue: hValue, searchMValue: mValue })
	}, [search, hValue, mValue])

	const searchPlaceholder = useResponsiveText(992, 'Поиск криптовалюты', 'Поиск')
	const switcherText = useResponsiveText(992, 'Разные интервалы', '+ / -')
	const filtersRef = useElementHeightVar('--filters-height')

	const debouncedSetH = React.useMemo(
		() => debounce((value) => {
			const numeric = value.replace(/\D/g, '')
			dispatch(setHValue(numeric))
		}, 300),
		[dispatch]
	)

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
					{
						showStrategy && (
							<Dropdown
								options={DROPDOWN_STRATEGY}
								placeholder='Стратегия'
								selected={strategy}
								onChange={value => dispatch(setStrategy(value))} />
						)
					}
					{
						showExchanges && (
							<Dropdown
								options={DROPDOWN_EXCHANGES}
								multiple={true}
								placeholder='Биржи'
								selected={exchanges}
								onChange={value => {
									dispatch(toggleExchange(value))
									ym('reachGoal', 'exchange_toggle', { exchange: value })
								}} />
						)
					}

					{
						showSearchHours && (
							<SearchTime
								value={searchState.searchHValue}
								onValueChange={value => {
									setSearchState(prev => ({
										...prev,
										searchHValue: value
									}))
									debouncedSetH(value)
								}}
								label='H'
							/>
						)
					}

					{
						showSearchMinutes && (
							<SearchTime
								value={searchState.searchMValue}
								onValueChange={value => {
									setSearchState(prev => ({
										...prev,
										searchMValue: value
									}))
									debouncedSetM(value)
								}}
								label='M'
							/>
						)
					}

					<div className={styles['filters-block']}>
						<Input
							className={styles['filters-search']}
							placeholder={searchPlaceholder}
							value={searchState.searchValue}
							onChange={(e) => {
								const value = e.target.value
								setSearchState(prev => ({
									...prev,
									searchValue: value
								}))
								debouncedSearch(value)
							}} />

						{
							showSwitcher && (
								<Switcher
									className={styles['filters-switcher']}
									text={switcherText}
									checked={diffIntervals}
									onChange={(checked) => dispatch(setDiffIntervals(checked))} />
							)
						}
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