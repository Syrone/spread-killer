import React from 'react'
import { Outlet } from "react-router"

import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import PageBackground from "../components/PageBackground/PageBackground"

const MainLayout = () => {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<Outlet />
			</main>

			<PageBackground />
		</>
	)
}

export default MainLayout