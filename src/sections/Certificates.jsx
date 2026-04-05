import SectionLayout from './SectionLayout'

export default function Certificates(props) {
  return (
    <SectionLayout
      {...props}
      accentLabel="Certificates"
      featureTitle="Proof Of Progress"
      featureBody="This page is for certificates, course completions, and training milestones. Replace the placeholder lines with your real certification titles, issuers, and dates."
      showcaseTitle="Certificate Examples"
      showcaseItems={[
        { title: 'Frontend Course', detail: 'HTML, CSS, JavaScript' },
        { title: 'React Training', detail: 'Components, hooks, routing' },
        { title: 'UI Certificate', detail: 'Design systems and layout' },
      ]}
      heroGraphic={
        <svg viewBox="0 0 220 220" className="section-graphic" aria-hidden="true">
          <rect x="44" y="48" width="132" height="108" rx="16" fill="#d9f1ff" />
          <rect x="66" y="74" width="88" height="16" rx="8" fill="#4a8dff" />
          <rect x="76" y="106" width="68" height="10" rx="5" fill="#7eb4ff" />
          <circle cx="86" cy="174" r="20" fill="#f0ac27" />
          <circle cx="134" cy="174" r="20" fill="#f0ac27" />
        </svg>
      }
    />
  )
}
