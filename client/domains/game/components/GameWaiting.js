import React from 'react'
import Text from '../../app/components/Text'
import Spacing from '../../app/components/Spacing'
import GamePlayers from './GamePlayers'

function GameWaiting() {
  return (
    <>
      <Text type="heading">Game Lobby</Text>
      <Spacing size="small" />
      <Text type="paragraph">The creator can hit ready whenever.</Text>
      <Spacing size="large" />
      <GamePlayers />
    </>
  )
}

export default GameWaiting
