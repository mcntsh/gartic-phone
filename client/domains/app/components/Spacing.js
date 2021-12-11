import React from 'react'
import PropTypes from 'prop-types'
import useUtilityClasses from 'use-utility-classes'

const spacingClasses = 'block w-full m-0'

const sizeTinySpacing = {
  when: { size: 'tiny' },
  use: 'p-0.5',
}

const sizeSmallSpacing = {
  when: { size: 'small' },
  use: 'p-1',
}

const sizeMediumSpacing = {
  when: { size: 'medium' },
  use: 'p-2',
}

const sizeLargeSpacing = {
  when: { size: 'large' },
  use: 'p-5',
}

function Spacing({ size = 'small' }) {
  const setClassName = useUtilityClasses({ size })

  const className = setClassName(
    sizeTinySpacing,
    sizeSmallSpacing,
    sizeMediumSpacing,
    sizeLargeSpacing,
    spacingClasses
  )

  return <div className={className} />
}

Spacing.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
}

export default Spacing
