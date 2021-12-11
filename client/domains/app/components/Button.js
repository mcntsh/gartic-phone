import React from 'react'
import PropTypes from 'prop-types'
import useUtilityClasses from 'use-utility-classes'
import { TEXT_CLASSES } from '../../../constants/base-classes'

const buttonClasses = `
  border-2 rounded-md px-4
  py-2 transition-colors inline-block
  text-center
`

const fullButton = {
  when: { isFull: true },
  use: 'block w-full',
}

const inlineButton = {
  when: { isFull: false },
  use: 'inlne-block w-auto',
}

const typeLoadingButton = {
  when: { isLoading: true },
  use: 'cursor-not-allowed border-gray-300 text-gray-400',
}

const typeDefaultButton = {
  when: { type: 'default', isLoading: false },
  use: `
    border-black bg-black hover:bg-gray-700
    text-white
  `,
}

const typeDefaultLoadingButton = {
  when: { type: 'default', isLoading: true },
  use: 'bg-gray-300',
}

const typeGhostButton = {
  when: { type: 'ghost', isLoading: false },
  use: `
    border-black hover:bg-black hover:text-white
    text-black bg-transparent
  `,
}

function Button({
  type = 'default',
  isLoading = false,
  isFull = false,
  isSubmit = false,
  href,
  text,
  onClick = () => {},
}) {
  const setClassName = useUtilityClasses({ type, isLoading, isFull })

  const className = setClassName(
    inlineButton,
    fullButton,
    typeDefaultButton,
    typeDefaultLoadingButton,
    typeGhostButton,
    typeLoadingButton,
    buttonClasses,
    TEXT_CLASSES.CTA
  )

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {text}
      </a>
    )
  }

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['default', 'ghost']),
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  isFull: PropTypes.bool,
  isSubmit: PropTypes.bool,
}

export default Button
