import { Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from "./pages/Home"
import Arbitration from "./pages/Arbitration"
import Staking from "./pages/Staking"
import Launchpool from "./pages/Launchpool"
import NotFound from "./pages/NotFound"

export default function App() {

  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route path={''} element={<Home />} />
        <Route path={'/arbitration'} element={<Arbitration />} />
        <Route path={'/staking'} element={<Staking />} />
        <Route path={'/launchpool'} element={<Launchpool />} />
        <Route path={'*'} element={<NotFound />} />
      </Route>
    </Routes>
  )
}
