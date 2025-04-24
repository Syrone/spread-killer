import React from "react"

import { throttle } from "../../utils/throttle"

import Logo from '../Logo/Logo'
import Button from '../Buttons/Button'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

import styles from './Header.module.scss'
import clsx from "clsx"

const Header = () => {
  const headerRef = React.useRef(null)
	const menuRef = React.useRef(null)
  const [isMenuOpen, setMenuOpen] = React.useState(false)

	const updateHeaderHeight = () => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight
      document.documentElement.style.setProperty('--header-height', `${height}px`)
    }
  }

	React.useEffect(() => {
    updateHeaderHeight()

    const handleResize = throttle(updateHeaderHeight)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

	React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

	const headerNavText = [
		'Фандинг',
		'Стейкинг',
		'Лаунчпулы',
	]

	return (
		<header ref={headerRef} className={styles['header']}>
			<div className="container">
				<Logo />

				<div
					ref={menuRef}
					className={clsx(
						styles['header-menu'],
						isMenuOpen && styles['is-open']
					)}>
					<div className={styles['header-menu-header']}>
						<div className={styles['header-menu-logo']}>
							<Logo />
						</div>

						<Button
							icon={'close'}
							className={styles['header-menu-close']}
							typestyle="icon"
							onClick={() => setMenuOpen(false)} />
					</div>

					<nav className={styles['header-nav']}>
						<ul className={styles['header-nav-list']}>
							{
								headerNavText.map((item, index) => (
									<li key={item + index}
										className={styles['header-nav-item']}>
										<Button
											className={styles['header-nav-button']}
											isActive={index === 0}>
											{item}
										</Button>
									</li>
								))
							}
						</ul>
					</nav>
				</div>

				<div className={styles['header-buttons']}>
					<ThemeToggle />
					<Button
						icon={'menu'}
						className={styles['header-menu-open']}
						typestyle="icon"
						onClick={() => setMenuOpen(true)} />
				</div>
			</div>
		</header>
	)
}

export default Header