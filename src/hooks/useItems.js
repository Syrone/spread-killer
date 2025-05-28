import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { setItems, setNextFetchAt } from '../redux/items/slice'

import api from '../api'

export const useItems = () => {
  const dispatch = useDispatch()

  const query = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const { data } = await api.get('/data/')

      return Object.entries(data).map(([id, item]) => ({
        id,
        ...item,
      }))
    },
    refetchInterval: 15000,
  })

  React.useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(setItems(query.data))
      dispatch(setNextFetchAt(Math.floor(Date.now() / 1000) + 15))
    }
  }, [query.isSuccess, query.data, dispatch])

  return query
}
