import React from 'react'

import Fasteners from '../Fasteners/Fasteners'
import Icon from '../Icon/Icon'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'
import Switcher from '../Switcher/Switcher'

import styles from './Filters.module.scss'

const Filters = () => {
	const dropdownStrategy = [
		{ label: 'long+short:funding', selected: true },
		{ label: 'long+short:spread', selected: false },
		{ label: 'short+short:funding', selected: false },
		{ label: 'short+short:spread', selected: false },
	]

	const dropdownBridges = [
		{ icon: 'binance', label: 'Binance', selected: false },
		{ icon: 'bingx', label: 'Bingx', selected: false },
		{ icon: 'bitget', label: 'Bitget', selected: false },
		{ icon: 'bybit', label: 'Bybit', selected: false },
		{ icon: 'gate', label: 'Gate', selected: false },
		{ icon: 'htx', label: 'Huobi', selected: false },
		{ icon: 'hyperliq', label: 'Hyperliq', selected: false },
		{ icon: 'lbank', label: 'Lbank', selected: false },
		{ icon: 'mexc', label: 'Mexc', selected: false },
		{ icon: 'okx', label: 'Okx', selected: false },
		{ icon: 'ourbit', label: 'Ourbit', selected: false }
	]

	const [search, setSearch] = React.useState('')
	const [intervalSwitcher, setIntervalSwitcher] = React.useState(true)

	return (
		<section className={styles['filters']}>
			<Fasteners />
			<div className="container">
				<div className={styles['filters-body']}>
					<Dropdown
						options={dropdownStrategy}
						placeholder='Стратегия' />
					<Dropdown
						options={dropdownBridges}
						multiple={true}
						placeholder='Биржи' />

					<Input
						placeholder='Поиск криптовалюты'
						value={search}
						onChange={(e) => setSearch(e.target.value)}/>

					<Switcher 
						text={'Разные интервалы'}
						checked={intervalSwitcher}
						onChange={setIntervalSwitcher} />

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