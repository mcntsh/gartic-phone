import React from 'react'
import useUtilityClasses from 'use-utility-classes'
import { useGetGame, useStartGame, useJoinGame } from '../hooks'
import { useGetGuest } from '../../guest/hooks'
import Text from '../../app/components/Text'
import Spacing from '../../app/components/Spacing'
import Button from '../../app/components/Button'
import GamePlayers from './GamePlayers'

const gameWaitingLoadingClasses = {
  when: { isLoading: true },
  use: 'text-gray-400',
}

function GameWaiting() {
  const { game, getGame } = useGetGame()
  const {
    startGame,
    isLoading,
    isSuccessful: isStartSuccessful,
  } = useStartGame()
  const { joinGame, isSuccessful: isJoinSuccessful } = useJoinGame()
  const { guest } = useGetGuest()
  const setClassName = useUtilityClasses({ isLoading })

  const gameWaitingClassName = setClassName(gameWaitingLoadingClasses)

  const isCreator = game.creator.uuid === guest.uuid
  const isJoined = game.guests.some(
    (gameGuest) => gameGuest.uuid === guest.uuid
  )

  React.useEffect(() => {
    if (!isJoined) {
      joinGame({ params: { uuid: game.uuid } })
    }
  }, [isJoined])

  React.useEffect(() => {
    if (isJoinSuccessful || isStartSuccessful) {
      getGame({ params: { uuid: game.uuid } })
    }
  }, [isJoinSuccessful, isStartSuccessful])

  return (
    <div className={gameWaitingClassName}>
      <Text type="heading">Game Lobby</Text>
      <Spacing size="small" />
      <Text type="paragraph">The creator can hit start whenever.</Text>
      <Spacing size="large" />
      <GamePlayers />
      {isCreator && (
        <>
          <Spacing size="medium" />
          <Button
            onClick={() => startGame({ params: { uuid: game.uuid } })}
            isLoading={isLoading}
            type="ghost"
            text="Start Game"
            isFull
          />
        </>
      )}
    </div>
  )
}

export default GameWaiting
