import React from 'react'

import throttle from '../../utils/throttle'

import Fasteners from '../Fasteners/Fasteners'
import Icon from '../Icon/Icon'
import Button from '../Buttons/Button'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'
import Switcher from '../Switcher/Switcher'

import styles from './Filters.module.scss'

const DROPDOWN_STRATEGY = [
	{ label: 'long+short:funding', selected: true },
	{ label: 'long+short:spread', selected: false },
]

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

	const [searchState, setSearchState] = React.useState({
		value: '',
		placeholder: window.innerWidth > 992 ? 'Поиск криптовалюты' : 'Поиск'
	})
	const [mInput, setMInput] = React.useState('')
	const [switcherState, setSwitcherState] = React.useState({
		value: true,
		text: window.innerWidth > 992 ? 'Разные интервалы' : '+ / -'
	})

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

	return (
		<section className={styles['filters']}>
			<Fasteners />
			<div className="container">
				<div className={styles['filters-body']}>
					<Dropdown
						options={DROPDOWN_STRATEGY}
						placeholder='Стратегия' />
					<Dropdown
						options={DROPDOWN_EXCHANGES}
						multiple={true}
						placeholder='Биржи' />

					<div className={styles['input-number']}>
						<Input
							className={styles['input-number-input']}
							placeholder='0'
							hasReset={false}
							value={mInput}
							onChange={(e) => setMInput(e.target.value.replace(/\D/g, ''))} />
						<Button
							size={'base'}
							typestyle={'secondary'}
							className={styles['input-number-button']}>
							M
						</Button>
					</div>

					<div className={styles['filters-block']}>
						<Input
							className={styles['filters-search']}
							placeholder={searchState.placeholder}
							value={searchState.value}
							onChange={(e) => setSearchState(prev => ({ ...prev, value: e.target.value }))} />

						<Switcher
							className={styles['filters-switcher']}
							text={switcherState.text}
							checked={switcherState.value}
							onChange={(checked) => setSwitcherState(prev => ({ ...prev, value: checked }))} />
					</div>

					<div className={styles['filters-period']}>
						<span>15s</span>
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