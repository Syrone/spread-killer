import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	setStrategy, toggleExchange, setMValue,
	setSearch, setDiffIntervals
} from '../../redux/filters/slice'

import ym from 'react-yandex-metrika'

import { useNow } from '../../hooks/useNow'
import { useResponsiveText } from '../../hooks/useResponsiveText'
import { useElementHeightVar } from '../../hooks/useElementHeightVar'

import { selectNextFetchAt } from '../../redux/items/selectors'
import { selectFilters } from '../../redux/filters/selectors'

import debounce from '../../utils/debounce'

import Fasteners from '../Fasteners/Fasteners'
import Icon from '../Icon/Icon'
import Button from '../Buttons/Button'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'
import Switcher from '../Switcher/Switcher'

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

const Filters = ({
	showStrategy = false,
	showExchanges = true,
	showSwitcher = true,
}) => {
	const dispatch = useDispatch()
	const { strategy, exchanges, mValue, search, diffIntervals } = useSelector(selectFilters)
	const nextFetchAt = useSelector(selectNextFetchAt)
	const now = useNow()
	const secondsLeft = nextFetchAt
		? Math.max(Math.ceil(nextFetchAt - now), 0)
		: 15

	const [searchState, setSearchState] = React.useState({
		searchValue: search,
		searchMValue: mValue,
	})
	const searchPlaceholder = useResponsiveText(992, 'Поиск криптовалюты', 'Поиск')
	const switcherText = useResponsiveText(992, 'Разные интервалы', '+ / -')
	const filtersRef = useElementHeightVar('--filters-height')

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