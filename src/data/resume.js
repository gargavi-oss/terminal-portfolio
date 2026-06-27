// ---------------------------------------------------------------------------
// All portfolio content lives here. Edit this file to update the site.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Avi Garg',
  role: 'Software Developer · Full-Stack & ML',
  host: 'gargavi-oss.space',
  tagline:
    'B.E. Electronics & Communication @ Thapar Institute. I build full-stack web apps and AI-powered systems.',
  location: 'Patiala, Punjab, India',
  email: 'avigarg258@gmail.com',
  phone: '+91 74046 48978',
  portfolio: 'https://gargavi-oss.space',
}

export const about = {
  intro: 'Avi Garg',
  role: 'a full-stack & ML developer',
  location: 'Patiala, India',
  lines: [
    'I am an undergraduate engineer passionate about writing code and',
    'building web applications and AI systems that solve real-life problems.',
  ],
}

export const education = [
  {
    title: 'B.E. in Electronics & Communication Engineering',
    desc: 'Thapar Institute of Engineering & Technology | CGPA 8.8 | 2024 ~ 2028',
  },
  {
    title: 'Relevant Coursework',
    desc: 'DBMS · Data Structures & Algorithms · DAA · Operating Systems',
  },
]

// id-indexed so `projects go <id>` can open a link
export const projects = [
  {
    id: 1,
    title: 'Delivery Failure Predictor',
    desc: 'AI system (XGBoost, 96.18% acc) that flags orders at risk of failed delivery. React + Express + ML, 61-feature pipeline.',
    url: 'https://github.com/gargavi-oss/DeliveryFailurePredictor',
  },
  {
    id: 2,
    title : 'Bank Backend Management System',
    desc: 'A secure banking backend built with Node.js, Express.js, and MongoDB that supports user authentication, account management, balance tracking, and fund transfers with idempotency protection.',
    url: ' https://github.com/gargavi-oss/backendBankingSystem'
  },
  {
    id: 3,
    title: 'Prodivity Technologies',
    desc: 'Full-stack freelance agency platform (React, Node, Express, MongoDB) with a secure admin dashboard for content management.',
    url: 'https://github.com/gargavi-oss/ProdivityTechnologies',
  },
  {
    id: 4,
    title: 'Malaria Detection System',
    desc: 'Deep-learning diagnostic (ResNet18 + FastAPI + React) classifying blood-smear images as Parasitized or Uninfected.',
    url: 'https://github.com/gargavi-oss/malaria_project',
  },
]

export const achievements = [
  {
    title: 'Open Source & Version Control',
    desc: 'Managed and deployed 3+ full-stack production repositories on GitHub using advanced Git workflows, branching and CI/CD tooling.',
  },
]

export const skills = [
  { group: 'Languages', items: 'C++, JavaScript, TypeScript, SQL, Python' },
  {
    group: 'Frameworks',
    items: 'React.js, Express.js, FastAPI, Node.js, Streamlit, Tailwind CSS',
  },
  { group: 'Databases', items: 'MySQL, MongoDB (NoSQL)' },
  {
    group: 'Systems/Tools',
    items: 'Distributed Systems, System Design, Git, GitHub, VS Code',
  },
]

// id-indexed so `socials go <id>` can open a link
export const socials = [
  { id: 1, title: 'GitHub', url: 'https://github.com/gargavi-oss' },
  { id: 2, title: 'LinkedIn', url: 'https://www.linkedin.com/in/avi-garg' },
  { id: 3, title: 'Portfolio', url: 'https://gargavi-oss.space' },
  { id: 4, title: 'Email', url: 'mailto:avigarg258@gmail.com' },
]
