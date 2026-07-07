import { Link } from 'react-router'

import { PageChrome } from '../components/layout/PageChrome'

type InfoPageProps = {
  kicker: string
  title: string
  body: string
  artwork?: {
    src: string
    alt: string
  }
}

export function InfoPage({ kicker, title, body, artwork }: InfoPageProps) {
  return (
    <PageChrome>
      <main className="placeholder-page">
        <div className="info-page-layout">
          <div className="info-page-copy">
            <Link to="/" className="back-link">
              Volver al selector
            </Link>
            <span className="page-kicker">{kicker}</span>
            <h1>{title}</h1>
            <p>{body}</p>
          </div>

          <div className="info-page-artwork">
            <img
              src={artwork?.src ?? '/ommi_other/OMMI Firma.png'}
              alt={artwork?.alt ?? ''}
            />
          </div>
        </div>
      </main>
    </PageChrome>
  )
}
