import {
  profile,
  about,
  education,
  projects,
  achievements,
  skills,
  socials,
} from './data/resume.js'
import { THEMES } from './data/themes.js'
import { NAME_ART, NAME_ART_MOBILE, AVATAR_ART } from './data/ascii.js'

export const COMMAND_LIST = [
  { cmd: 'about', desc: 'about Avi garg' },
  { cmd: 'clear', desc: 'clear the terminal' },
  { cmd: 'echo', desc: 'print out anything' },
  { cmd: 'education', desc: 'my education background' },
  { cmd: 'email', desc: 'send an email to me' },
  { cmd: 'gui', desc: 'open my portfolio in GUI' },
  { cmd: 'help', desc: 'check available commands' },
  { cmd: 'history', desc: 'view command history' },
  { cmd: 'projects', desc: "projects that I've built" },
  { cmd: 'pwd', desc: 'print working directory' },
  { cmd: 'resume', desc: 'open my resume (pdf)' },
  { cmd: 'skills', desc: 'languages, frameworks & tools' },
  { cmd: 'socials', desc: 'my social accounts' },
  { cmd: 'themes', desc: 'check available themes' },
  { cmd: 'welcome', desc: 'display hero section' },
  { cmd: 'whoami', desc: 'about current user' },
]

export const COMMAND_NAMES = COMMAND_LIST.map((c) => c.cmd)
const SPECIAL_CMDS = ['projects', 'socials', 'themes', 'echo']
const PAD = Math.max(...COMMAND_NAMES.map((c) => c.length)) + 2

const Line = ({ children, className = '' }) => (
  <div className={`leading-relaxed whitespace-pre-wrap break-words ${className}`}>
    {children}
  </div>
)

const Block = ({ children }) => <div className="space-y-1">{children}</div>

const Ext = ({ href, children }) => (
  <a className="term-link" href={href} target="_blank" rel="noreferrer noopener">
    {children}
  </a>
)

const Usage = ({ cmd, marginY = false }) => {
  const map = {
    themes: { action: 'set', placeholder: 'theme-name', eg: 'ubuntu' },
    projects: { action: 'go', placeholder: 'project-no', eg: '1' },
    socials: { action: 'go', placeholder: 'social-no', eg: '1' },
  }
  const a = map[cmd]
  return (
    <div className={marginY ? 'my-2' : ''}>
      <Line className="text-t200">
        Usage: {cmd} {a.action} &lt;{a.placeholder}&gt;
      </Line>
      <Line className="text-t200">
        eg: {cmd} {a.action} {a.eg}
      </Line>
    </div>
  )
}

const isArgInvalid = (args, action, options) =>
  args[0] !== action || !options.includes(args[1]) || args.length > 2


export function Welcome() {
  return (
    <div className="  items-center gap-x-4">
      <div className="min-w-[260px]">
        <pre className="hidden text-primary sm:block">{NAME_ART}</pre>
        <pre className="block text-center text-primary sm:hidden">
          {NAME_ART_MOBILE}
        </pre>
        <Line className="text-t200 font-bold">
          Welcome to My terminal portfolio. (Version 3.1)
        </Line>
        <Line className="text-t200 font-bold">----</Line>
        <Line>
          <span className="text-t200 font-bold">The project source code can be found in this project's <Ext href="https://github.com/gargavi-oss/terminal-portfolio">
            Github Repo
          </Ext> .</span>
        </Line>
        <Line className="text-t200 font-bold">----</Line>
    
        <Line className='font-bold'>
          <span className="text-t200">For a list of available commands, type </span>
          <span className="text-primary">`help`</span>
          <span className="text-t200">.</span>
        </Line>
      </div>
     
    </div>
  )
}

const Help = () => (
  <div className='font-bold text-50'>
    {COMMAND_LIST.map(({ cmd, desc }) => (
      <Line key={cmd}>
        <span className="text-primary">{cmd}</span>
        <span className="text-t300">{' '.repeat(PAD - cmd.length)}- {desc}</span>
      </Line>
    ))}
    <div className="mt-2 text-sm font-bold  text-t200">
      <Line>Tab or Ctrl + i&nbsp; =&gt; autocompletes the command</Line>
      <Line>Up / Down Arrow&nbsp; =&gt; go through previous commands</Line>
      <Line>Ctrl + l&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; =&gt; clear the terminal</Line>
    </div>
    </div>
)

const About = () => (
  <Block>
    <Line>
      <span className="text-t200">Hi, my name is </span>
      <span className="text-primary">{about.intro}</span>
      <span className="text-t200">!</span>
    </Line>
    <Line>
      <span className="text-t200">I'm </span>
      <span className="text-secondary">{about.role}</span>
      <span className="text-t200"> based in {about.location}.</span>
    </Line>
    {about.lines.map((l, i) => (
      <Line key={i} className="text-t200">
        {l}
      </Line>
    ))}
  </Block>
)

const Education = () => (
  <Block>
    <Line className="text-t200">Here is my education background!</Line>
    {education.map(({ title, desc }) => (
      <div key={title} className="mt-2">
        <Line className="text-primary">{title}</Line>
        <Line className="text-t300">{desc}</Line>
      </div>
    ))}
  </Block>
)

const Skills = () => (
  <Block>
    <Line className="text-t200">My technical toolkit:</Line>
    {skills.map(({ group, items }) => (
      <div key={group} className="mt-2">
        <Line className="text-primary">{group}</Line>
        <Line className="text-t200">{items}</Line>
      </div>
    ))}
  </Block>
)


const Projects = ({ args }) => {
  if (args.length > 0) {
    return isArgInvalid(args, 'go', ['1', '2', '3']) ? <Usage cmd="projects" /> : null
  }
  return (
    <Block>
      <Line className="text-t200">
        "Talk is cheap. Show me the code." Here are some of my projects:
      </Line>
      {projects.map(({ id, title, desc }) => (
        <div key={id} className="mt-2">
          <Line className="text-primary">{`${id}. ${title}`}</Line>
          <Line className="text-t300">{desc}</Line>
        </div>
      ))}
      <Usage cmd="projects" marginY />
    </Block>
  )
}

const Socials = ({ args }) => {
  if (args.length > 0) {
    return isArgInvalid(args, 'go', ['1', '2', '3', '4']) ? (
      <Usage cmd="socials" />
    ) : null
  }
  return (
    <Block>
      <Line className="text-t200">Here are my social links:</Line>
      {socials.map(({ id, title, url }) => (
        <Line key={id}>
          <span className="text-primary">{`${id}. ${title}`}</span>
          <span className="text-t300">
            {' '.repeat(Math.max(2, 12 - title.length))}-{' '}
          </span>
          <Ext href={url}>{url.replace('mailto:', '')}</Ext>
        </Line>
      ))}
      <Usage cmd="socials" marginY />
    </Block>
  )
}

const Themes = ({ args }) => {
  if (args.length > 0) {
    return isArgInvalid(args, 'set', THEMES) ? <Usage cmd="themes" /> : null
  }
  return (
    <Block>
      <Line className="text-t200">Available themes:</Line>
      <Line className="text-primary">{THEMES.join('    ')}</Line>
      <Usage cmd="themes" marginY />
    </Block>
  )
}

const Echo = ({ args }) => (
  <Line className="text-t100">
    {args.join(' ').replace(/^["'`]+|["'`]+$/g, '')}
  </Line>
)

const Email = () => (
  <Line>
    <Ext href={`mailto:${profile.email}`}>{profile.email}</Ext>
  </Line>
)

const History = ({ history }) => (
  <Block>
    {history.map((h, i) => (
      <Line key={i} className="text-t200">
        {h}
      </Line>
    ))}
  </Block>
)

const Whoami = ()=>{
  return (
    <div className="my-2 flex flex-wrap-reverse items-center gap-x-8">
      visitor
   
  </div>
  )
}

export function renderCommand(cmd, args, ctx) {
  if (!SPECIAL_CMDS.includes(cmd) && args.length > 0) {
    return <Line className="text-t300">Usage: {cmd}</Line>
  }

  switch (cmd) {
    case 'about':
      return <About />
    case 'echo':
      return <Echo args={args} />
    case 'education':
      return <Education />
    case 'email':
      return <Email />
    case 'gui':
      return null // side-effect: opens portfolio
    case 'help':
      return <Help />
    case 'history':
      return <History history={ctx.history} />
    case 'projects':
      return <Projects args={args} />
    case 'pwd':
      return <Line className="text-t100">/home/garg-avi</Line>
    case 'resume':
      return (
        <Line>
          <span className="text-t200">opening resume… </span>
          <Ext href="/avi_garg_resume.pdf">/avi_garg_resume.pdf</Ext>
        </Line>
      )
    case 'skills':
      return <Skills />
    case 'socials':
      return <Socials args={args} />
    case 'themes':
      return <Themes args={args} />
    case 'welcome':
      return <Welcome />
    case 'whoami':
      return <Whoami/>
    default:
      return null
  }
}
