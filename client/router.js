import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useGetGuest } from './domains/guest/hooks'
import { useRedirect } from './domains/app/hooks'
import AppHome from './domains/app/routes/AppHome'
import GuestNew from './domains/guest/routes/GuestNew'
import GameNew from './domains/game/routes/GameNew'
import Game from './domains/game/routes/Game'

function GuestRoute({ context }) {
  const { guest } = useGetGuest()
  const { getPathWithRedirect } = useRedirect()

  if (!guest) {
    context.redirect = getPathWithRedirect('/guest')

    return <Navigate to={context.redirect} />
  }

  return <Outlet />
}

function Router({ context } = {}) {
  return (
    <Routes>
      <Route exact path="/" element={<AppHome />} />
      <Route path="guest" element={<GuestNew />} />
      <Route path="game" element={<GuestRoute context={context} />}>
        <Route path=":uuid" element={<Game />} />
        <Route index element={<GameNew />} />
      </Route>
    </Routes>
  )
}

export default Router
