import React from 'react'
import useUtilityClasses from 'use-utility-classes'
import AppLayout from '../components/AppLayout'
import Text from '../components/Text'
import Spacing from '../components/Spacing'
import Icon from '../components/Icon'

const iconWrapperClasses = 'w-1/4 m-auto'
const routeClasses = 'text-gray-400'

function AppHome() {
  const setClassName = useUtilityClasses()

  const homeClassName = setClassName(routeClasses)
  const iconWrapperClassName = setClassName(iconWrapperClasses)

  return (
    <AppLayout isCentered>
      <section className={homeClassName}>
        <div className={iconWrapperClassName}>
          <Icon type="home" />
        </div>
        <Spacing size="large" />
        <Text type="heading">Welcome</Text>
        <Spacing size="small" />
        <Text type="paragraph">
          There is nothing to do here. Either join a game using a link or create
          one above.
        </Text>
      </section>
    </AppLayout>
  )
}

export default AppHome
