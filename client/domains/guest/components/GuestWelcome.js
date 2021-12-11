import React from 'react'
import { useGetGuest } from '../hooks'
import Text from '../../app/components/Text'
import Spacing from '../../app/components/Spacing'
import Button from '../../app/components/Button'

function GuestWelcome() {
  const { guest } = useGetGuest()

  return (
    <>
      <Text type="heading">Welcome, {guest.name}!</Text>
      <Spacing size="small" />
      <Text type="paragraph">You are all ready to go.</Text>
      <Spacing size="medium" />
      <Button href="/game" type="ghost" text="New Game" isFull />
    </>
  )
}

export default GuestWelcome
