import React from 'react'
import clsx from 'clsx'
import {
	useFloating,
	useHover,
	useInteractions,
	FloatingArrow,
	offset,
	flip,
	shift,
	autoUpdate,
	arrow,
} from '@floating-ui/react'

import Button from '../Buttons/Button'

import styles from './Popover.module.scss'

const ARROW_HEIGHT = 6
const GAP = 8

const Popover = ({ className, popover }) => {
	const [isOpen, setIsOpen] = React.useState(false)
  const arrowRef = React.useRef(null)

	const {
		x,
		y,
		strategy,
		context,
		refs
	} = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: 'bottom-center',
		middleware: [
			offset(ARROW_HEIGHT + GAP),
			flip(),
			shift(),
			arrow({
				element: arrowRef,
			})
		],
		whileElementsMounted: autoUpdate,
	})

	const hover = useHover(context)
	const {getReferenceProps, getFloatingProps} = useInteractions([
    hover,
  ])

	return (
		<div className={styles['popover']}>
			<Button
				ref={refs.setReference}
				className={clsx(
					styles['popover-button'],
					className
				)}
				icon={'info'}
				{...getReferenceProps()} />

			{
				isOpen && (
				<div
					ref={refs.setFloating}
					className={styles['popover-body']}
					style={{
						position: strategy,
						top: y ?? '',
						left: x ?? '',
					}}
					{...getFloatingProps()}>
					<FloatingArrow
						ref={arrowRef}
						context={context}
						strokeWidth={1}
						stroke={'var(--theme-border-rgba-20)'}
						fill={'var(--theme-dark-color)'} />
					<p>{popover}</p>
				</div>
				)
			}
		</div>
	)
}

export default Popover