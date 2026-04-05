import SectionLayout from './SectionLayout'

export default function Home(props) {
  return (
    <SectionLayout
      {...props}
      accentLabel="Base Center"
      featureTitle="Village Status"
      featureBody="This is the main control room of the portfolio. From here the user can jump back out to the village or move directly into every other building page."
      showcaseTitle="Quick Clues"
      showcaseItems={[
        { title: 'About', detail: 'Profile and creative direction' },
        { title: 'Skills', detail: 'Frontend and 3D tool stack' },
        { title: 'Projects', detail: 'Examples of finished work' },
      ]}
      heroGraphic={
        <svg viewBox="0 0 220 220" className="section-graphic" aria-hidden="true">
          <rect x="46" y="102" width="128" height="82" rx="10" fill="#8b5f33" />
          <polygon points="110,42 46,102 174,102" fill="#d84d3f" />
          <rect x="92" y="122" width="36" height="62" rx="8" fill="#f7dd8e" />
          <circle cx="154" cy="78" r="16" fill="#ffd465" />
        </svg>
      }
    />
  )
}
