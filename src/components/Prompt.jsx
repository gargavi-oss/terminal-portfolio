import { profile } from '../data/resume.js'

// Shell prompt: visitor@avi-garg.dev:~$
export default function Prompt() {
  return (
    <span className="mr-3 inline-block whitespace-nowrap">
      <span className="text-secondary">visitor</span>
      <span className="text-t200">@</span>
      <span className="text-primary">{profile.host}</span>
      <span className="text-t200">:~$</span>
    </span>
  )
}
