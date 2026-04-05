import { useEffect, useRef, useState } from 'react'
import Scene from './Scene'
import About from './sections/About'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'
import Home from './sections/Home'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import { sectionContent } from './portfolioData'

const sectionScreens = {
  Home,
  About,
  Skills,
  Certificates,
  Projects,
  Contact,
}

export default function App() {
  const [activeSection, setActiveSection] = useState('Home')
  const [theme, setTheme] = useState('dark')
  const [currentScreen, setCurrentScreen] = useState('village')
  const [enteringSection, setEnteringSection] = useState(null)
  const enterTimeoutRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(
    () => () => {
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current)
      }
    },
    [],
  )

  const handleEnterSection = (section) => {
    setActiveSection(section)
    setEnteringSection(section)

    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current)
    }

    enterTimeoutRef.current = setTimeout(() => {
      setCurrentScreen('section')
      setEnteringSection(null)
    }, 850)
  }

  const ActiveScreen = sectionScreens[activeSection]
  const activeContent = sectionContent[activeSection]

  if (currentScreen === 'section') {
    return (
      <ActiveScreen
        theme={theme}
        onBack={() => setCurrentScreen('village')}
        onThemeToggle={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
        onNavigate={handleEnterSection}
        activeSection={activeSection}
      />
    )
  }

  return (
    <main className={enteringSection ? 'app-shell entering-section' : 'app-shell'}>
      <header className="hero-bar">
        <div className="hero-title">
          <p className="eyebrow">Clash Of Clans Village</p>
          <h1>Charles Pura</h1>
          <p className="hero-subtitle">
            Drag to rotate, scroll to zoom, and click any building to go inside that section.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </button>
          <button type="button" className="open-panel-button" onClick={() => handleEnterSection(activeSection)}>
            Enter {activeSection}
          </button>
        </div>
      </header>

      <Scene
        activeSection={activeSection}
        onEnter={handleEnterSection}
        enteringSection={enteringSection}
        theme={theme}
      />

      <div className="selection-card">
        <p className="selection-label">{activeContent.label}</p>
        <h2>{activeContent.title}</h2>
        <p>{activeContent.subtitle}</p>
        <button type="button" className="selection-enter-button" onClick={() => handleEnterSection(activeSection)}>
          Enter {activeSection}
        </button>
      </div>

      {enteringSection ? (
        <div className="enter-overlay" aria-hidden="true">
          <div className="enter-overlay__ring" />
          <div className="enter-overlay__content">
            <p className="selection-label">Entering</p>
            <h2>{enteringSection}</h2>
          </div>
        </div>
      ) : null}
    </main>
  )
}
