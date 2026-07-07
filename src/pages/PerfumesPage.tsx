import { Link } from 'react-router'

import { CatalogShowcaseCard } from '../components/catalog-stage/CatalogShowcaseCard'
import { PageChrome } from '../components/layout/PageChrome'
import {
  getCrossListedFragrances,
  getFragrancesByAudience,
  getLineRoute,
  ommiLines,
} from '../data/ommiCatalog'

export function PerfumesPage() {
  const crossListed = getCrossListedFragrances()

  return (
    <PageChrome>
      <main className="placeholder-page">
        <Link to="/" className="back-link">
          Volver al selector
        </Link>
        <span className="page-kicker">Perfumes</span>
        <h1>Elegir por entrada o audiencia</h1>
        <p>La matriz se organiza por lineas, con cada tarjeta mostrando su botella.</p>
        <div className="catalog-grid catalog-grid-lines">
          {ommiLines.map((line) => (
            <CatalogShowcaseCard
              key={line.id}
              href={getLineRoute(line)}
              imageSrc={line.bottleAsset}
              imageAlt={`Botella OMMI ${line.name}`}
              title={line.name}
              subtitle={line.shortDescriptor}
              brandLine={line.olfactoryElements.join(' · ')}
              notes={line.characterWords.join(' · ')}
            />
          ))}
        </div>
        <nav className="line-link-row" aria-label="Audiencias">
          <Link to="/perfumes/masculinos">
            Masculinos ({getFragrancesByAudience('masculino').length})
          </Link>
          <Link to="/perfumes/femeninos">
            Femeninos ({getFragrancesByAudience('femenino').length})
          </Link>
          <Link to="/perfumes/unisex">
            Unisex ({getFragrancesByAudience('unisex').length})
          </Link>
          <Link to="/guia">Guia</Link>
        </nav>
        <p className="page-note">
          {crossListed.length} fragancias ya aparecen cruzadas en mas de una entrada.
        </p>
      </main>
    </PageChrome>
  )
}
