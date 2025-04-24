import React from "react"
import clsx from "clsx"

import Icon from "../Icon/Icon"

import styles from './Button.module.scss'

const Button = (
	{ 
		type = "button",
		size = "",
		typestyle = "",
		isActive = false,
		className,
		children,
		icon,
		...props
	}
	) => {
	return (
		<button
			type={type}
			className={clsx(
				styles.btn,
				size && styles[`btn-${size}`],
				typestyle && styles[`btn-${typestyle}`],
				isActive && 'is-active',
				className)}
			{...props}
		>
			{children}
			{icon && <Icon name={icon} className={styles.icon} />}
		</button>
	)
}

export default Button