import { Link } from 'react-router'

import { CatalogShowcaseCard } from '../components/catalog-stage/CatalogShowcaseCard'
import { PageChrome } from '../components/layout/PageChrome'
import {
  discoverySetAssetPath,
  getLineById,
  type OmmiLineId,
} from '../data/ommiCatalog'

const discoverySetLineIds: OmmiLineId[] = ['dia', 'noche', 'piel', 'firma', 'regalo']

export function DiscoveryPage() {
  return (
    <PageChrome>
      <main className="placeholder-page">
        <Link to="/" className="back-link">
          Volver al selector
        </Link>
        <span className="page-kicker">Sets</span>
        <h1>Discovery</h1>
        <p>Explorar, comparar y elegir con menos incertidumbre.</p>

        <div className="catalog-grid discovery-set-grid">
          {discoverySetLineIds.map((lineId) => {
            const line = getLineById(lineId)
            const setAsset = discoverySetAssetPath(lineId)

            if (!setAsset) return null

            return (
              <CatalogShowcaseCard
                key={line.id}
                href={`/perfumes/${line.slug}`}
                imageSrc={setAsset}
                imageAlt={`Discovery Set OMMI ${line.name}`}
                title={`Discovery Set ${line.name}`}
                subtitle={line.shortDescriptor}
                brandLine="Tres decants para comparar"
                notes={line.characterWords.join(' - ')}
              />
            )
          })}
        </div>
      </main>
    </PageChrome>
  )
}
