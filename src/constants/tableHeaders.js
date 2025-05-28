export const COLUMNHEADER_MAP = {
	home: [
		{ key: 'coin', label: 'Монета', popover: false, sort: true },
		{ key: 'priceDiff', label: 'Связка', popover: false, sort: true },
		{ key: 'fundingDiff', label: 'Фандинг', popover: 'Плата между трейдерами за удержание позиции.', sort: true },
		{ key: 'fundingTime', label: 'Фандинг [24ч]', popover: 'Прогнозируемая суточная ставка, если текущий фандинг сохранится.', sort: true },
		{ key: 'f_spread', label: 'F Spread', popover: 'Разница между фандингами на двух биржах.', sort: true },
		{ key: 'open_spread', label: 'Open Spread', popover: 'Разница между ценами на одну и ту же монету на двух биржах.', sort: true },
	],

	arbitration: [
		{ key: 'coin', label: 'Пара', popover: false, sort: true },
		{ key: 'priceDiff', label: 'Связка', popover: false, sort: true },
		{ key: 'orderbook', label: 'Объем', popover: false, sort: true },
		{ key: 'profit', label: 'Профит', popover: false, sort: true },
		{ key: 'date_added', label: 'Время', popover: false, sort: true },
		{ key: 'withdraw', label: 'Сети вывода', icon: { name: 'arrowUp45deg' }, popover: false, sort: false },
		{ key: 'deposit', label: 'Сети депозита', icon: { name: 'arrowUp45deg', class: 'down' }, popover: false, sort: false },
	],

	// Пример для будущих namespace:
	// spot: [...],
	// funding: [...],
}