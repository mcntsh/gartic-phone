import React from 'react'
import AppLayout from '../../app/components/AppLayout'
import Text from '../../app/components/Text'
import Spacing from '../../app/components/Spacing'

function Game() {
  return (
    <AppLayout isCentered>
      <section data-id="route-game">
        <Text type="heading">Game</Text>
        <Spacing size="small" />
        <Text type="paragraph">This is a game</Text>
      </section>
    </AppLayout>
  )
}

export default Game
