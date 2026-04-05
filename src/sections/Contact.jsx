import SectionLayout from './SectionLayout'

export default function Contact(props) {
  return (
    <SectionLayout
      {...props}
      accentLabel="Contact"
      featureTitle="Open Channels"
      featureBody="Put your email, GitHub, LinkedIn, phone, and service availability here. This page should make it easy for someone to contact you without hunting through the village."
      showcaseTitle="Contact Examples"
      showcaseItems={[
        { title: 'Email', detail: 'Best for direct project inquiries' },
        { title: 'GitHub', detail: 'Code samples and repositories' },
        { title: 'LinkedIn', detail: 'Professional profile and network' },
      ]}
      heroGraphic={
        <svg viewBox="0 0 220 220" className="section-graphic" aria-hidden="true">
          <rect x="40" y="58" width="140" height="104" rx="14" fill="#ffd465" />
          <rect x="60" y="84" width="100" height="54" rx="8" fill="#fff7de" />
          <path d="M60 86 110 122 160 86" fill="none" stroke="#f0ac27" strokeWidth="10" strokeLinecap="round" />
        </svg>
      }
    />
  )
}
