import React from "react"
import { useLocation } from "react-router-dom"
import clsx from "clsx"

import { useElementHeightVar } from '../../hooks/useElementHeightVar'

import Logo from '../Logo/Logo'
import Badge from '../Badge/Badge'
import Button from '../Buttons/Button'
import ButtonLink from '../Buttons/ButtonLink'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Subscribe from '../Subscribe/Subscribe'

import styles from './Header.module.scss'

const HEADER_NAV = [
	{ label: 'Фандинг', status: false, link: '/' },
	{ label: 'Арбитраж', status: 'free', link: '/arbitration' },
	{ label: 'Стейкинг', status: false, link: '/staking' },
	{ label: 'Лаунчпулы', status: false, link: '/launchpool' }
]

const SCROLL_THRESHOLD = 10

const Header = () => {
  const headerRef = useElementHeightVar('--header-height')
	const menuRef = React.useRef(null)
	const [isMenuOpen, setMenuOpen] = React.useState(false)
  const [isScrolled, setScrolled] = React.useState(false)

	const location = useLocation()

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

	React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrolled(scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Проверим при монтировании
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

	return (
		<header ref={headerRef} className={clsx(
			styles['header'],
			isScrolled && styles['is-scrolled']
		)}>
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
								HEADER_NAV.map((item, index) => (
									<li key={item + index}
										className={styles['header-nav-item']}>
										<ButtonLink
											href={item.link}
											className={styles['header-nav-button']}
											isActive={location.pathname === item.link}>
											{item.label}
											{item.status && <Badge text={item.status} />}
										</ButtonLink>
									</li>
								))
							}
						</ul>
					</nav>
				</div>

				<div className={styles['header-buttons']}>
					<Subscribe />

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