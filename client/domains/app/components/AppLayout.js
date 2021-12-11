import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import useUtilityClasses from 'use-utility-classes'
import Alert from './Alert'
import Button from './Button'

function AppLayoutAlerts() {
  const alerts = useSelector((state) => state.app.alerts)
  if (!alerts) {
    return null
  }

  return (
    <ul>
      {Object.keys(alerts).map((alertId) => (
        <li key={alertId}>
          <Alert type={alerts[alertId].intent} text={alerts[alertId].message} />
        </li>
      ))}
    </ul>
  )
}

const layoutBannerClasses = 'p-4 flex flex-row'
const layoutBannerNavClasses = 'ml-auto'
const layoutBannerNavlistClasses = 'flex flex-row justify-end'
const layoutBannerLogoClasses = 'font-bold tracking-tighter text-lg'

function AppLayoutBanner() {
  const setClassName = useUtilityClasses()
  const className = setClassName(layoutBannerClasses)
  const navClassName = setClassName(layoutBannerNavClasses)
  const navlistClassName = setClassName(layoutBannerNavlistClasses)
  const logoClassName = setClassName(layoutBannerLogoClasses)

  return (
    <header className={className}>
      <div>
        <a href="/">
          <h1 className={logoClassName}>🎨 Gartic Phone</h1>
        </a>
      </div>
      <nav className={navClassName}>
        <ul className={navlistClassName}>
          <li>
            <Button href="/game" text="New Game" />
          </li>
        </ul>
      </nav>
    </header>
  )
}

const layoutClasses = 'flex min-h-screen flex-col'
const layoutContentClasses = 'p-4 flex-grow flex flex-col'
const layoutInnerClasses = [
  {
    when: { isCentered: true },
    use: 'text-center',
  },
  'p-4 m-auto w-full max-w-sm',
]

function AppLayout({ children, isCentered }) {
  const setClassName = useUtilityClasses({ isCentered })
  const layoutClassName = setClassName(layoutClasses)
  const contentClassName = setClassName(layoutContentClasses)
  const innerClassName = setClassName(...layoutInnerClasses)

  return (
    <div className={layoutClassName}>
      <AppLayoutAlerts />
      <AppLayoutBanner />
      <main className={contentClassName}>
        <div className={innerClassName}>{children}</div>
      </main>
    </div>
  )
}

AppLayout.propTypes = {
  isCentered: PropTypes.bool,
}

export default AppLayout
