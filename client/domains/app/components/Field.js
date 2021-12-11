import React from 'react'
import PropTypes from 'prop-types'
import useUtilityClasses from 'use-utility-classes'

const fieldClasses = 'block w-full'

const fieldErrorClasses = 'text-red-500 text-sm semibold block mt-2'

function Field({ error, children }) {
  const hasError = !!error
  const setClassName = useUtilityClasses()

  const fieldClassName = setClassName(fieldClasses)
  const fieldErrorClassName = setClassName(fieldErrorClasses)

  return (
    <fieldset className={fieldClassName} data-id="field">
      {React.cloneElement(children, { error })}
      {hasError && <span className={fieldErrorClassName}>{error}</span>}
    </fieldset>
  )
}

Field.propTypes = {
  error: PropTypes.string,
  helpText: PropTypes.string,
}

export default Field
