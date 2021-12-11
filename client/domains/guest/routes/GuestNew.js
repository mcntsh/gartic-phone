import React from 'react'
import useUtilityClasses from 'use-utility-classes'
import { useGetGuest, useNewGuest } from '../hooks'
import { useRedirect } from '../../app/hooks'
import AppLayout from '../../app/components/AppLayout'
import GuestForm from '../components/GuestForm'
import GuestWelcome from '../components/GuestWelcome'

const guestLoadingClasses = {
  when: { isLoading: true },
  use: 'text-gray-400',
}

function GuestNew() {
  const { redirect } = useRedirect()
  const {
    guest,
    isLoading: isGetLoading,
    getGuest,
  } = useGetGuest({ showAlert: false })
  const { isLoading: isAddLoading } = useNewGuest()
  const setClassName = useUtilityClasses({
    isLoading: isGetLoading || isAddLoading,
  })

  const guestNewClassName = setClassName(guestLoadingClasses)

  React.useEffect(() => {
    if (!guest) {
      getGuest()
    } else {
      redirect()
    }
  }, [guest])

  return (
    <AppLayout>
      <section data-id="route-guest-new" className={guestNewClassName}>
        {guest ? <GuestWelcome /> : <GuestForm />}
      </section>
    </AppLayout>
  )
}

export default GuestNew
