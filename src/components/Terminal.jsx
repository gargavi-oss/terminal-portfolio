import { useEffect, useRef, useState, useCallback } from 'react'
import Prompt from './Prompt.jsx'
import { COMMAND_NAMES, renderCommand } from '../commands.jsx'
import { THEMES } from '../data/themes.js'
import { profile, projects, socials } from '../data/resume.js'

let _id = 1

function argComplete(input) {
  const tokens = input.split(' ')
  if (input === 'themes ') return { value: 'themes set' }
  if (
    'themes'.startsWith(tokens[0]) &&
    tokens[1] !== 'set' &&
    tokens[1] !== undefined &&
    'set'.startsWith(tokens[1])
  )
    return { value: 'themes set' }
  if (input === 'themes set ') return { hints: THEMES }
  if (input.startsWith('themes set '))
    return { extra: THEMES.filter((t) => t.startsWith(tokens[2] || '')) }
  if (input === 'projects ' || input === 'socials ')
    return { value: `${input}go` }
  if (input === 'projects g' || input === 'socials g')
    return { value: `${input}o` }
  if (input.startsWith('socials go '))
    return { extra: socials.map((s) => `${s.id}.${s.title}`) }
  if (input.startsWith('projects go '))
    return { extra: projects.map((p) => `${p.id}.${p.title}`) }
  return null
}

export default function Terminal({ setTheme }) {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([{ id: 0, raw: 'welcome' }])
  const [pointer, setPointer] = useState(-1)
  const [hints, setHints] = useState([])

  const inputRef = useRef(null)
  const endRef = useRef(null)

  const focusInput = useCallback(() => {
    const sel = window.getSelection()
    if (sel && sel.toString().length > 0) return
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    document.addEventListener('click', focusInput)
    return () => document.removeEventListener('click', focusInput)
  }, [focusInput])

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "instant",
      block: "end",
    })
  }, [history])

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 1)
    return () => clearTimeout(t)
  }, [inputVal, pointer])

  const parse = (raw) => {
    const norm = raw.trim().replace(/^\.\//, '')
    const parts = norm.split(/\s+/).filter(Boolean)
    return { cmd: (parts[0] || '').toLowerCase(), args: parts.slice(1) }
  }

  const runSideEffects = (cmd, args) => {
    if (cmd === 'gui') window.open(profile.portfolio, '_blank', 'noopener')
    if (cmd === 'resume')
      window.open('/avi_garg_resume.pdf', '_blank', 'noopener')
    if (cmd === 'email' && args.length === 0)
      window.open(`mailto:${profile.email}`, '_self')
    if (
      cmd === 'themes' &&
      args[0] === 'set' &&
      args.length === 2 &&
      THEMES.includes(args[1])
    )
      setTheme(args[1])
    if (cmd === 'projects' && args[0] === 'go' && args.length === 2) {
      const p = projects.find((p) => String(p.id) === args[1])
      if (p) window.open(p.url, '_blank', 'noopener')
    }
    if (cmd === 'socials' && args[0] === 'go' && args.length === 2) {
      const s = socials.find((s) => String(s.id) === args[1])
      if (s)
        window.open(s.url, s.url.startsWith('mailto') ? '_self' : '_blank')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const raw = inputVal
    const { cmd, args } = parse(raw)

    if (cmd === 'clear') {
      setHistory([])
    } else {
      runSideEffects(cmd, args)
      setHistory((h) => [{ id: _id++, raw }, ...h])
    }
    setInputVal('')
    setHints([])
    setPointer(-1)
  }

  const handleTab = () => {
    if (!inputVal) return
    const arg = argComplete(inputVal)
    if (arg?.value) {
      setInputVal(arg.value)
      setHints([])
      return
    }
    if (arg?.hints) {
      setHints(arg.hints)
      return
    }
    let matches = COMMAND_NAMES.filter((c) => c.startsWith(inputVal))
    if (arg?.extra) matches = [...matches, ...arg.extra]
    if (matches.length > 1) {
      setHints(matches)
    } else if (matches.length === 1) {
      const parts = inputVal.split(' ')
      setInputVal(
        parts.length !== 1 ? `${parts[0]} ${parts[1]} ${matches[0]}` : matches[0],
      )
      setHints([])
    }
  }

  const handleKeyDown = (e) => {
    const ctrl = e.ctrlKey
    if (e.key === 'Tab' || (ctrl && e.key.toLowerCase() === 'i')) {
      e.preventDefault()
      handleTab()
    } else if (ctrl && e.key.toLowerCase() === 'l') {
      e.preventDefault()
      setHistory([])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (pointer + 1 < history.length) {
        setInputVal(history[pointer + 1].raw)
        setPointer((p) => p + 1)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (pointer > 0) {
        setInputVal(history[pointer - 1].raw)
        setPointer((p) => p - 1)
      } else if (pointer === 0) {
        setInputVal('')
        setPointer(-1)
      }
    }
  }


  const ordered = [...history].reverse()
  const chronological = ordered.map((h) => h.raw)

  return (
    <div className="flex  flex-col overflow-y-visible px-4 pt-4 pb-3 text-[0.92rem] sm:px-6 sm:text-base">

      <div className=" overflow-y-auto">
        {ordered.map(({ id, raw }) => {
          const trimmed = raw.trim()
          const { cmd, args } = parse(raw)
          const known = COMMAND_NAMES.includes(cmd)
  
          return (
            <div key={id} className="fade-up mb-2 last:mb-0">
              <div className="break-all">
                <Prompt />
                <span className="text-t100">{raw}</span>
              </div>
  
              {trimmed === "" ? null : known ? (
                <div className="mt-1">
                  {renderCommand(cmd, args, {
                    history: chronological,
                  })
                  }
                </div>
              ) : (
                <div className="mt-1 text-t300">
                  command not found: {raw}
                </div>
              )}
            </div>
          )
        })}
  
        <div ref={endRef} />
      </div>
  
      {hints.length > 1 && (
        <div className=" py-2 text-primary">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {hints.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
        </div>
      )}
  
      <form
        onSubmit={handleSubmit}
        className="flex items-center  pt-2"
      >
        <Prompt />
  
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoFocus
          className="flex-1 bg-transparent"
        />
      </form>
    </div>
  )
}
