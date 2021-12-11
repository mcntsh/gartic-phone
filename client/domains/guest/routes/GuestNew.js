import React from 'react'
import useUtilityClasses from 'use-utility-classes'
import { useGetGuest, useNewGuest } from '../hooks'
import { useRedirect } from '../../app/hooks'
import AppLayout from '../../app/components/AppLayout'
import Text from '../../app/components/Text'
import TextInput from '../../app/components/TextInput'
import Field from '../../app/components/Field'
import Spacing from '../../app/components/Spacing'
import Button from '../../app/components/Button'

const guestLoadingClasses = {
  when: { isLoading: true },
  use: 'text-gray-400',
}

function NewGuestForm() {
  const [name, setName] = React.useState('')
  const { isLoading, errors, addNewGuest } = useNewGuest()

  const submitForm = React.useCallback(
    (e) => {
      e.preventDefault()
      addNewGuest({ name })
    },
    [name]
  )

  return (
    <>
      <Text type="heading">Choose a nickname</Text>
      <Spacing size="small" />
      <Text type="paragraph">This is how you will appear in games.</Text>
      <Spacing size="medium" />
      <form onSubmit={submitForm}>
        <Field error={errors?.validations?.name}>
          <TextInput
            placeholder="ex: Beans"
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Spacing size="medium" />
        <Button
          type="ghost"
          text="Submit"
          isSubmit
          isLoading={isLoading}
          isFull
        />
      </form>
    </>
  )
}

function GuestSuccess({ name }) {
  return (
    <>
      <Text type="heading">Welcome, {name}!</Text>
      <Spacing size="small" />
      <Text type="paragraph">You are all ready to go.</Text>
      <Spacing size="medium" />
      <Button href="/game" type="ghost" text="New Game" isFull />
    </>
  )
}

function GuestNew() {
  const { redirect } = useRedirect()
  const { guest, isLoading, getGuest } = useGetGuest()
  const setClassName = useUtilityClasses({ isLoading })

  const className = setClassName(guestLoadingClasses)

  React.useEffect(() => {
    if (!guest) {
      getGuest()
    } else {
      redirect()
    }
  }, [guest])

  return (
    <AppLayout>
      <section className={className}>
        {guest ? <GuestSuccess name={guest.name} /> : <NewGuestForm />}
      </section>
    </AppLayout>
  )
}

export default GuestNew