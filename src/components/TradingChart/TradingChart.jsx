import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createChart, LineSeries } from 'lightweight-charts'

import debounce from '../../utils/debounce'

import { setChartRange } from '../../redux/items/slice'
import { selectChartRange } from '../../redux/items/selectors'
import { selectTheme } from '../../redux/theme/selectors'

const TradingChart = React.memo(({ id, data, className, isOpen }) => {
	const dispatch = useDispatch()
	const theme = useSelector(selectTheme)
	const savedChartRange = useSelector(selectChartRange(id))

	const chartContainerRef = React.useRef()
	const chartRef = React.useRef()
	const seriesRef = React.useRef()
	const isReadyRef = React.useRef(false)

	const debouncedSave = React.useMemo(
		() =>
			debounce((range) => {
				dispatch(setChartRange({ id, range }))
			}, 200),
		[dispatch, id]
	)

	React.useEffect(() => {
		const container = chartContainerRef.current
		if (!container) return

		const chart = createChart(container, {
			autoSize: true,
			layout: {
				background: { color: '#fff' },
				textColor: '#000',
			},
			grid: {
				vertLines: { color: '#e0e0e0' },
				horzLines: { color: '#e0e0e0' },
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
			},
		})
		const lineSeries = chart.addSeries(LineSeries, { color: '#2962FF' })
		chartRef.current = chart
		seriesRef.current = lineSeries

		return () => {
			chart.remove()
		}
	}, [])

	React.useEffect(() => {
		const chart = chartRef.current
		const series = seriesRef.current
		if (!chart || !series) return

		chart.applyOptions({
			layout: {
				background: { color: theme === 'dark' ? '#000' : '#fff' },
				textColor: theme === 'dark' ? '#fff' : '#000',
			},
			grid: {
				vertLines: { color: theme === 'dark' ? '#212323' : '#e0e0e0' },
				horzLines: { color: theme === 'dark' ? '#212323' : '#e0e0e0' },
			},
		})

		series.applyOptions({
			color: theme === 'dark' ? '#2962FF' : '#0074D9',
		})
	}, [theme])

	React.useEffect(() => {
		if (seriesRef.current && data) {
			const chartData = Object.entries(data)
				.map(([t, v]) => ({ time: +t, value: v }))
				.sort((a, b) => a.time - b.time)

			seriesRef.current.setData(chartData)
		}
	}, [data])

	React.useEffect(() => {
		const chart = chartRef.current
		if (chart && savedChartRange) {
			chart.timeScale().setVisibleLogicalRange(savedChartRange)
		}

		isReadyRef.current = true
	}, [savedChartRange])

	React.useEffect(() => {
		const chart = chartRef.current
		if (!chart) return

		const handler = () => {
			if (!isReadyRef.current) return

			const range = chart.timeScale().getVisibleLogicalRange()
			if (range) {
				debouncedSave(range)
			}
		}

		chart.timeScale().subscribeVisibleLogicalRangeChange(handler)
		return () => {
			chart.timeScale().unsubscribeVisibleLogicalRangeChange(handler)
			debouncedSave.cancel?.()
		}
	}, [debouncedSave])

	return (
		<div
			ref={chartContainerRef}
			className={className}
		/>
	)
})

export default TradingChart