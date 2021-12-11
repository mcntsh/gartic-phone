import React from 'react'
import PropTypes from 'prop-types'
import useUtilityClasses from 'use-utility-classes'
import { TEXT_CLASSES } from '../../../constants/base-classes'

const tagFromType = {
  heading: 'h2',
  subheading: 'h3',
  paragraph: 'p',
}

const typeParagraphText = {
  when: { type: 'paragraph' },
  use: TEXT_CLASSES.PARAGRAPH,
}

const typeSubheadingText = {
  when: { type: 'subheading' },
  use: TEXT_CLASSES.SUBHEADING,
}

const typeHeadingText = {
  when: { type: 'heading' },
  use: TEXT_CLASSES.HEADING,
}

function Text({ type = 'paragraph', color = 'default', children }) {
  const setClassName = useUtilityClasses({ color, type })

  const className = setClassName(
    typeParagraphText,
    typeSubheadingText,
    typeHeadingText
  )

  const Tag = `${tagFromType[type]}`
  return <Tag className={className}>{children}</Tag>
}

Text.propTypes = {
  type: PropTypes.oneOf(['heading', 'subheading', 'paragraph']),
  color: PropTypes.oneOf(['default', 'muted']),
}

export default Text
