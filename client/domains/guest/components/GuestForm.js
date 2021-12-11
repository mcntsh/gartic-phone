import React from 'react'
import { useNewGuest } from '../hooks'
import Text from '../../app/components/Text'
import TextInput from '../../app/components/TextInput'
import Field from '../../app/components/Field'
import Spacing from '../../app/components/Spacing'
import Button from '../../app/components/Button'

function GuestForm() {
  const [name, setName] = React.useState('')
  const { isLoading, errors, addNewGuest } = useNewGuest()

  const submitForm = React.useCallback(
    (e) => {
      e.preventDefault()
      if (!isLoading) {
        addNewGuest({ name })
      }
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

export default GuestForm
