import React from "react"
import clsx from "clsx"

import styles from './Icon.module.scss'

import { ReactComponent as DarkTheme } from "../../assets/icons/dark-theme.svg"
import { ReactComponent as LightTheme } from "../../assets/icons/light-theme.svg"
import { ReactComponent as Menu } from "../../assets/icons/menu.svg"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg"
import { ReactComponent as Check } from "../../assets/icons/check.svg"
import { ReactComponent as Binance } from "../../assets/icons/binance.svg"
import { ReactComponent as Bingx } from "../../assets/icons/bingx.svg"
import { ReactComponent as Bitget } from "../../assets/icons/bitget.svg"
import { ReactComponent as Bybit } from "../../assets/icons/bybit.svg"
import { ReactComponent as Gate } from "../../assets/icons/gate.svg"
import { ReactComponent as Htx } from "../../assets/icons/htx.svg"
import { ReactComponent as Hyperliq } from "../../assets/icons/hyperliq.svg"
import { ReactComponent as Lbank } from "../../assets/icons/lbank.svg"
import { ReactComponent as Mexc } from "../../assets/icons/mexc.svg"
import { ReactComponent as Okx } from "../../assets/icons/okx.svg"
import { ReactComponent as Ourbit } from "../../assets/icons/ourbit.svg"

const icons = {
  darkTheme: DarkTheme,
  lightTheme: LightTheme,
  menu: Menu,
  close: Close,
  arrowDown: ArrowDown,
  check: Check,
  binance: Binance,
  bingx: Bingx,
  bitget: Bitget,
  bybit: Bybit,
  gate: Gate,
  htx: Htx,
  hyperliq: Hyperliq,
  lbank: Lbank,
  mexc: Mexc,
  okx: Okx,
  ourbit: Ourbit
}

const Icon = ({ name, className }) => {
  const SvgIcon = icons[name]

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
		<span className={clsx(
      styles.icon,
      className
      )}>
			<SvgIcon />
		</span>
	)
}

export default Icon