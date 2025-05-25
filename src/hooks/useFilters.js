import { useSelector } from 'react-redux'
import { selectFilters } from '../redux/filters/selectors'

export function useFilters(namespace) {
  return useSelector(state => selectFilters(state, namespace))
}