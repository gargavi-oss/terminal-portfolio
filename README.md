# Avi Garg — Terminal Portfolio

An interactive, terminal-style developer portfolio built with **React + Vite + Tailwind CSS v4**.
Visitors explore the portfolio by typing commands into a fake shell.

![stack](https://img.shields.io/badge/React-18-22C55E?style=flat-square)
![stack](https://img.shields.io/badge/Vite-6-22C55E?style=flat-square)
![stack](https://img.shields.io/badge/Tailwind-v4-22C55E?style=flat-square)

## Commands

| Command | What it shows |
| --- | --- |
| `help` | List every command |
| `about` | Short bio |
| `education` | Degree + coursework |
| `projects` | Built projects with stacks |
| `achievements` | Highlights |
| `skills` | Languages, frameworks, tools |
| `contact` | Email / phone / location |
| `socials` | GitHub · LinkedIn · Portfolio |
| `resume` | Open the resume PDF |
| `ls` | List sections |
| `whoami` · `banner` · `clear` | Utilities |

> Each section also works with a `./` prefix (e.g. `./about`, `./projects`, `./achievement`) and
> common aliases (`edu`, `work`, `stack`, `links`, …).

### Keyboard
- **Tab** — autocomplete a command
- **↑ / ↓** — cycle through command history
- **Ctrl + L** — clear the screen

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Editing content

All resume content lives in [`src/data/resume.js`](src/data/resume.js) — update that one file to
change the bio, projects, education, skills, achievements, and links. The resume PDF is served from
[`public/avi_garg_resume.pdf`](public/avi_garg_resume.pdf).

## Design

OLED dark theme · JetBrains Mono · terminal-green (`#22C55E`) accent on deep black (`#05070d`),
with CRT scanlines, a blinking block cursor, and a boot sequence. Respects
`prefers-reduced-motion`.
# terminal-portfolio
