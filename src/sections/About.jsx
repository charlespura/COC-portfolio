import SectionLayout from './SectionLayout'

export default function About(props) {
  return (
    <SectionLayout
      {...props}
      accentLabel="Player Profile"
      featureTitle="Inside This Building"
      featureBody="Use this page for your intro, background, career focus, and the kind of frontend work you want clients or recruiters to remember first."
      showcaseTitle="What Users Learn"
      showcaseItems={[
        { title: 'Identity', detail: 'Who you are as a developer' },
        { title: 'Focus', detail: 'Frontend, visuals, and interaction' },
        { title: 'Style', detail: 'Clean, bold, and memorable work' },
      ]}
      heroGraphic={
        <svg viewBox="0 0 220 220" className="section-graphic" aria-hidden="true">
          <defs>
            <linearGradient id="aboutShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe48d" />
              <stop offset="100%" stopColor="#f08f2c" />
            </linearGradient>
          </defs>
          <path d="M110 18 179 42v63c0 45-27 76-69 97-42-21-69-52-69-97V42z" fill="url(#aboutShield)" />
          <circle cx="110" cy="83" r="25" fill="#fff8e4" />
          <path d="M68 156c12-24 34-36 42-36s30 12 42 36" fill="#fff8e4" />
        </svg>
      }
    />
  )
}
