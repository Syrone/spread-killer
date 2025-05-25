import { defaultFilters } from './slice'

export const selectNamespace = state => state.filters.pageName
export const selectFilters = state => {
	return state.filters.pageFilters[state.filters.pageName] ?? defaultFilters
}