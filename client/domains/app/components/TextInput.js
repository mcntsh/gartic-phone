import React from 'react'
import PropTypes from 'prop-types'
import useUtilityClasses from 'use-utility-classes'

const textInputClasses = `
  border border-solid rounded-md px-4
  py-2 transition-colors text-base block
  w-full
`

const defaultTextInput = {
  when: { isLoading: false, hasError: false },
  use: 'border-gray-300',
}

const loadingTextInput = {
  when: { isLoading: true },
  use: 'cursor-not-allowed border-gray-300 text-gray-400',
}

const loadingErrorTextInput = {
  when: { hasError: true, isLoading: true },
  use: 'border-red-300',
}

const errorTextInput = {
  when: { hasError: true, isLoading: false },
  use: 'border-red-500',
}

function TextInput({
  isLoading = false,
  error,
  placeholder,
  value,
  onChange = () => {},
}) {
  const hasError = !!error
  const setClassName = useUtilityClasses({ hasError, isLoading })

  const className = setClassName(
    textInputClasses,
    defaultTextInput,
    loadingTextInput,
    loadingErrorTextInput,
    errorTextInput
  )

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
    />
  )
}

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default TextInput
