import React from 'react'
import TimeAgo from 'react-time-ago'
import useUtilityClasses from 'use-utility-classes'
import { useGetGame } from '../hooks'

const playerRowClasses = 'p-3 flex flex-row items-center'
const playerColorClasses = 'rounded-full w-4 h-4 block mr-2'
const playerNameClasses = 'text-sm antialiased'
const playerNameCreatorClasses = {
  when: { isCreator: true },
  use: 'font-semibold',
}
const playerJoinedClasses = 'text-sm text-gray-400 antialiased ml-auto'

function GamePlayer({ name, color, dateJoined, isCreator }) {
  const setClassName = useUtilityClasses({ isCreator })

  const playerRowClassName = setClassName(playerRowClasses)
  const playerColorClassName = setClassName(playerColorClasses)
  const playerNameClassName = setClassName(
    playerNameCreatorClasses,
    playerNameClasses
  )
  const playerJoinedClassName = setClassName(playerJoinedClasses)

  return (
    <li className={playerRowClassName}>
      <span
        className={playerColorClassName}
        style={{ backgroundColor: color }}
      />
      <span className={playerNameClassName}>{name}</span>
      <span className={playerJoinedClassName}>
        <TimeAgo date={new Date(dateJoined)} locale="en-US" />
      </span>
    </li>
  )
}

const playerWrapperClasses = 'divide-y bg-white rounded-sm shadow-sm'

function GamePlayers() {
  const { game } = useGetGame()
  const setClassName = useUtilityClasses()

  const playerWrapperClassName = setClassName(playerWrapperClasses)

  return (
    <ul className={playerWrapperClassName}>
      {game.guests.map((guest) => (
        <GamePlayer
          key={guest.uuid}
          name={guest.name}
          color={guest.color}
          dateJoined={guest.date_joined}
          isCreator={guest.uuid === game.creator.uuid}
        />
      ))}
    </ul>
  )
}

export default GamePlayers
