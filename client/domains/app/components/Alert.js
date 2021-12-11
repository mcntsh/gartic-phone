import React from 'react'
import PropTypes from 'prop-types'
import useUtilityClasses from 'use-utility-classes'

const alertClasses =
  'flex flex-row p-3 block font-bold text-sm text-center mb-1'

const typeDangerAlert = {
  when: { type: 'danger' },
  use: 'bg-red-300 ',
}

const typeInfoAlert = {
  when: { type: 'info' },
  use: 'bg-blue-300 ',
}

const typeSuccessAlert = {
  when: { type: 'success' },
  use: 'bg-green-300 ',
}

const alertDismissClasses =
  'ml-auto px-2 py-1 leading-none rounded-md bg-black bg-opacity-10 text-opacity-30'

function Alert({
  type = 'info',
  text,
  isDismissable = false,
  onDismiss = () => {},
}) {
  const setClassName = useUtilityClasses({ type })

  const alertClassName = setClassName(
    typeDangerAlert,
    typeInfoAlert,
    typeSuccessAlert,
    alertClasses
  )

  const alertDismissClassName = setClassName(alertDismissClasses)

  return (
    <div className={alertClassName}>
      <p className="w-full">{text}</p>
      {isDismissable && (
        <button className={alertDismissClassName} onClick={onDismiss}>
          𝗫
        </button>
      )}
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['danger', 'info', 'success']),
  text: PropTypes.string,
  isDismissable: PropTypes.bool,
  onDismiss: PropTypes.func,
}

export default Alert
