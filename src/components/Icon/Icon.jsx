import clsx from "clsx"

import styles from './Icon.module.scss'

import { ReactComponent as DarkTheme } from "../../assets/icons/dark-theme.svg"
import { ReactComponent as LightTheme } from "../../assets/icons/light-theme.svg"
import { ReactComponent as Menu } from "../../assets/icons/menu.svg"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import { ReactComponent as ArrowUp45deg } from "../../assets/icons/arrow-up-45deg.svg"
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg"
import { ReactComponent as Check } from "../../assets/icons/check.svg"
import { ReactComponent as Reset } from "../../assets/icons/reset.svg"
import { ReactComponent as Plus } from "../../assets/icons/plus.svg"
import { ReactComponent as Minus } from "../../assets/icons/minus.svg"
import { ReactComponent as Time } from "../../assets/icons/time.svg"
import { ReactComponent as Info } from "../../assets/icons/info.svg"
import { ReactComponent as Binance } from "../../assets/icons/binance.svg"
import { ReactComponent as Bingx } from "../../assets/icons/bingx.svg"
import { ReactComponent as Bitget } from "../../assets/icons/bitget.svg"
import { ReactComponent as Bybit } from "../../assets/icons/bybit.svg"
import { ReactComponent as GateIo } from "../../assets/icons/gateio.svg"
import { ReactComponent as Huobi } from "../../assets/icons/huobi.svg"
import { ReactComponent as Kraken } from "../../assets/icons/kraken.svg"
import { ReactComponent as Hyperliquid } from "../../assets/icons/hyperliq.svg"
import { ReactComponent as Lbank } from "../../assets/icons/lbank.svg"
import { ReactComponent as Mexc } from "../../assets/icons/mexc.svg"
import { ReactComponent as Okx } from "../../assets/icons/okx.svg"
import { ReactComponent as Ourbit } from "../../assets/icons/ourbit.svg"

const icons = {
  darkTheme: DarkTheme,
  lightTheme: LightTheme,
  menu: Menu,
  close: Close,
  arrowUp45deg: ArrowUp45deg,
  arrowDown: ArrowDown,
  check: Check,
  reset: Reset,
  plus: Plus,
  minus: Minus,
  time: Time,
  info: Info,
  binance: Binance,
  bingx: Bingx,
  bitget: Bitget,
  bybit: Bybit,
  gateio: GateIo,
  huobi: Huobi,
  kraken: Kraken,
  hyperliquid: Hyperliquid,
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