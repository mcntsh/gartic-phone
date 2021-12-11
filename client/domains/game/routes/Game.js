import React from 'react'
import useUtilityClasses from 'use-utility-classes'
import { useParams } from 'react-router-dom'
import { useGetGame } from '../hooks'
import AppLayout from '../../app/components/AppLayout'
import GameFetching from '../components/GameFetching'
import GameWaiting from '../components/GameWaiting'

const gameNotFoundClasses = {
  when: { hasGame: false },
  use: 'text-gray-400',
}

function Game() {
  const { uuid } = useParams()
  const { game, getGame } = useGetGame()
  const setClassName = useUtilityClasses({ hasGame: !!game })

  const gameClassName = setClassName(gameNotFoundClasses)

  React.useEffect(() => {
    if (!game) {
      getGame({ params: { uuid } })
    }
  }, [game])

  return (
    <AppLayout isCentered>
      <section className={gameClassName} data-id="route-game">
        {!game ? <GameFetching /> : <GameWaiting />}
      </section>
    </AppLayout>
  )
}

export default Game
