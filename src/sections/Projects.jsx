import SectionLayout from './SectionLayout'

export default function Projects(props) {
  return (
    <SectionLayout
      {...props}
      accentLabel="Build Archive"
      featureTitle="Project Showcase"
      featureBody="Use this page for your strongest builds. Add screenshots, live links, stacks, and short outcome notes so each project feels like a finished build, not a placeholder."
      showcaseTitle="Project Examples"
      showcaseItems={[
        { title: 'Portfolio Site', detail: '3D interactive personal brand' },
        { title: 'Landing Page', detail: 'Bold marketing and animation' },
        { title: 'Business Web App', detail: 'Responsive client dashboard' },
      ]}
      heroGraphic={
        <svg viewBox="0 0 220 220" className="section-graphic" aria-hidden="true">
          <rect x="36" y="44" width="148" height="124" rx="18" fill="#8a6bff" />
          <rect x="54" y="66" width="112" height="72" rx="10" fill="#f7f0ff" />
          <rect x="54" y="150" width="44" height="8" rx="4" fill="#d7c6ff" />
          <rect x="106" y="150" width="60" height="8" rx="4" fill="#d7c6ff" />
          <path d="M80 116 100 96l18 18 26-30" fill="none" stroke="#8a6bff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      }
    />
  )
}
