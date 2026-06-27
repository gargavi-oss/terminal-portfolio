import { useEffect, useState } from 'react'
import Terminal from './components/Terminal.jsx'
import { THEMES, DEFAULT_THEME } from './data/themes.js'

const STORAGE_KEY = 'avi-terminal-theme'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved =
      typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)
    return saved && THEMES.includes(saved) ? saved : DEFAULT_THEME
  })

  // Apply the theme to <html> and persist it.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore storage errors (private mode) */
    }
  }, [theme])

  return <Terminal setTheme={setTheme} />
}
