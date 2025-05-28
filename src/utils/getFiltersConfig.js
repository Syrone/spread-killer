export const getFiltersConfig = (namespace) => {
	switch (namespace) {
		case 'Arbitration':
			return {
				showStrategy: false,
				showExchanges: true,
				showSwitcher: false,
				showSearchHours: false,
				showSearchMinutes: true,
			}

		case 'Home':
		default:
			return {
				showStrategy: false,
				showExchanges: true,
				showSwitcher: true,
				showSearchHours: true,
				showSearchMinutes: false,
			}
	}
}