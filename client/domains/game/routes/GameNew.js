import React from 'react'
import useUtilityClasses from 'use-utility-classes'
import { useNavigate } from 'react-router-dom'
import { useNewGame } from '../hooks'
import AppLayout from '../../app/components/AppLayout'
import Text from '../../app/components/Text'
import Icon from '../../app/components/Icon'
import Spacing from '../../app/components/Spacing'
import Button from '../../app/components/Button'

const iconWrapperClasses = 'w-1/4 m-auto'
const iconWrapperLoadingClasses = {
  when: { isNewGameLoading: true },
  use: 'animate-spin',
}
const routeClasses = {
  when: { isNewGameLoading: true },
  use: 'text-gray-400',
}

function GameNew() {
  const {
    game: newGame,
    isLoading: isNewGameLoading,
    addNewGame,
  } = useNewGame()
  const navigate = useNavigate()
  const setClassName = useUtilityClasses({ isNewGameLoading })

  const gameNewClassName = setClassName(routeClasses)
  const iconWrapperClassName = setClassName(
    iconWrapperClasses,
    iconWrapperLoadingClasses
  )

  React.useEffect(() => {
    if (newGame) {
      navigate({ pathname: `/game/${newGame.uuid}` })
    }
  }, [newGame])

  return (
    <AppLayout isCentered>
      <section className={gameNewClassName}>
        <div className={iconWrapperClassName}>
          <Icon type={isNewGameLoading ? 'loading' : 'game'} />
        </div>
        <Spacing size="large" />
        <Text type="heading">New Game</Text>
        <Spacing size="small" />
        <Text type="paragraph">Click the button below to start.</Text>
        <Spacing size="medium" />
        <Button
          onClick={() => addNewGame()}
          isLoading={isNewGameLoading}
          type="ghost"
          text="New Game"
          isFull
        />
      </section>
    </AppLayout>
  )
}

export default GameNew
