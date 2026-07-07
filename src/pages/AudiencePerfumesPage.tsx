import { Link } from 'react-router'

import { CatalogShowcaseCard } from '../components/catalog-stage/CatalogShowcaseCard'
import { PageChrome } from '../components/layout/PageChrome'
import {
  getFragrancesByAudience,
  getLineById,
  type OmmiAudience,
} from '../data/ommiCatalog'

type AudiencePerfumesPageProps = {
  audience: OmmiAudience
}

export function AudiencePerfumesPage({ audience }: AudiencePerfumesPageProps) {
  const fragrances = getFragrancesByAudience(audience)

  return (
    <PageChrome>
      <main className="placeholder-page">
        <Link to="/perfumes" className="back-link">
          Volver a perfumes
        </Link>
        <span className="page-kicker">Perfumes {audience}</span>
        <h1>{audience[0].toUpperCase() + audience.slice(1)}</h1>
        <p>Seleccion filtrada por audiencia, con cards visuales y botella real.</p>
        <div className="catalog-grid">
          {fragrances.map((fragrance) => {
            const entry = getLineById(fragrance.primaryEntryId)

            return (
              <CatalogShowcaseCard
                key={fragrance.id}
                href={`/perfumes/${entry.slug}/${fragrance.slug}`}
                imageSrc={fragrance.bottleAsset}
                imageAlt={`Botella OMMI N°${fragrance.number} ${fragrance.referenceName}`}
                number={fragrance.number}
                title={fragrance.family}
                subtitle={`${fragrance.referenceBrand} · ${fragrance.referenceName}`}
                brandLine={fragrance.shortDescription}
                price="$45.000,00"
                installmentText="$40.500,00 con transferencia o deposito"
                notes={fragrance.elements.slice(0, 4).join(' · ')}
              />
            )
          })}
        </div>
      </main>
    </PageChrome>
  )
}
