import React from 'react'
import { Link } from 'react-router-dom'
import clsx from "clsx"

import Icon from "../Icon/Icon";

import styles from './Button.module.scss'

const ButtonLink = (
	{
		href = "/",
		size = "",
		typestyle = "",
		isActive = false,
		className,
		children,
		icon,
		...props
	}) => {
	return (
		<Link
			to={href}
			className={clsx(
				styles.btn,
				styles[`btn-${size}`],
				styles[`btn-${typestyle}`],
				isActive && 'is-active',
				className)}
			{...props}
		>
			{icon && <Icon name={icon} className={icon} />}
			{children}
		</Link>
	)
}

export default ButtonLink