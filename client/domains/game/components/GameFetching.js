import React from 'react'
import useUtilityClasses from 'use-utility-classes'
import Text from '../../app/components/Text'
import Icon from '../../app/components/Icon'
import Spacing from '../../app/components/Spacing'

const iconWrapperClasses = 'w-1/4 m-auto animate-spin'

function GameFetching() {
  const setClassName = useUtilityClasses()

  const iconWrapperClassName = setClassName(iconWrapperClasses)

  return (
    <>
      <div className={iconWrapperClassName}>
        <Icon type="loading" />
      </div>
      <Spacing size="large" />
      <Text type="heading">Finding game...</Text>
      <Spacing size="small" />
      <Text type="paragraph">Hang in there, it will only take a sec.</Text>
    </>
  )
}

export default GameFetching
