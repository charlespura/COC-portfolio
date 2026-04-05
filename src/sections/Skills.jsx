import SectionLayout from './SectionLayout'

export default function Skills(props) {
  return (
    <SectionLayout
      {...props}
      accentLabel="Troop Setup"
      featureTitle="Skill Loadout"
      featureBody="This page works like your troop setup. Keep your strongest frontend, UI, animation, and 3D tools here so the section reads fast and looks intentional."
      showcaseTitle="Skill Logos"
      showcaseItems={[
        { title: 'React', detail: 'Components and app structure' },
        { title: 'Three.js', detail: '3D scenes and interaction' },
        { title: 'CSS', detail: 'Responsive visual polish' },
      ]}
      heroGraphic={
        <svg viewBox="0 0 220 220" className="section-graphic" aria-hidden="true">
          <circle cx="110" cy="110" r="18" fill="#61dafb" />
          <ellipse cx="110" cy="110" rx="74" ry="28" fill="none" stroke="#61dafb" strokeWidth="10" />
          <ellipse cx="110" cy="110" rx="74" ry="28" fill="none" stroke="#61dafb" strokeWidth="10" transform="rotate(60 110 110)" />
          <ellipse cx="110" cy="110" rx="74" ry="28" fill="none" stroke="#61dafb" strokeWidth="10" transform="rotate(120 110 110)" />
        </svg>
      }
    />
  )
}
