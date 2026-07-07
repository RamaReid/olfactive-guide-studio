import { Link, useParams } from 'react-router'

import { CatalogShowcaseCard } from '../components/catalog-stage/CatalogShowcaseCard'
import { PageChrome } from '../components/layout/PageChrome'
import {
  getFragrancesByEntry,
  getLineById,
  getLineBySlug,
  ommiFragrances,
  ommiLines,
  type OmmiFragrance,
} from '../data/ommiCatalog'

const affinityOrder = ['dia', 'noche', 'piel', 'firma', 'regalo'] as const

const byNumber = [...ommiFragrances].sort(
  (first, second) => first.numericCode - second.numericCode,
)

const interleavedFragrances = () => {
  const buckets = affinityOrder.map((entryId) =>
    byNumber.filter((fragrance) => fragrance.primaryEntryId === entryId),
  )
  const result: OmmiFragrance[] = []
  let index = 0

  while (buckets.some((bucket) => index < bucket.length)) {
    for (const bucket of buckets) {
      const fragrance = bucket[index]

      if (fragrance) {
        result.push(fragrance)
      }
    }

    index += 1
  }

  return result
}

const affinityIndex = (entryId: string) => {
  const index = affinityOrder.findIndex((candidate) => candidate === entryId)

  return index === -1 ? affinityOrder.length : index
}

const affinitySortedFragrances = () =>
  [...byNumber].sort((first, second) => {
    const firstAffinity = affinityIndex(first.primaryEntryId)
    const secondAffinity = affinityIndex(second.primaryEntryId)

    return (
      firstAffinity - secondAffinity ||
      first.numericCode - second.numericCode
    )
  })

export function LineCatalogPage() {
  const { lineSlug } = useParams()
  const line = getLineBySlug(lineSlug ?? '')

  if (!line) {
    return (
      <PageChrome>
        <main className="placeholder-page">
          <Link to="/" className="back-link">
            Volver
          </Link>
          <h1>Linea no encontrada</h1>
          <p>La ruta no coincide con una linea OMMI disponible.</p>
        </main>
      </PageChrome>
    )
  }

  const fragrances =
    line.id === 'mixto'
      ? interleavedFragrances()
      : line.id === 'discovery'
        ? affinitySortedFragrances()
        : getFragrancesByEntry(line.id)
  const usePrimaryRoute = line.id === 'mixto' || line.id === 'discovery'

  return (
    <PageChrome>
      <main className="placeholder-page">
        <Link to="/" className="back-link">
          Volver al selector
        </Link>
        <span className="page-kicker">Catalogo de linea</span>
        <h1>{line.name}</h1>
        <p>{line.shortDescriptor}</p>
        <div className="catalog-grid">
          {fragrances.map((fragrance) => (
            <CatalogShowcaseCard
              key={fragrance.id}
              href={`/perfumes/${
                usePrimaryRoute ? getLineById(fragrance.primaryEntryId).slug : line.slug
              }/${fragrance.slug}`}
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
          ))}
        </div>
        <nav className="line-link-row" aria-label="Otras lineas">
          {ommiLines.map((candidate) => (
            <Link key={candidate.id} to={`/perfumes/${candidate.slug}`}>
              {candidate.name}
            </Link>
          ))}
        </nav>
      </main>
    </PageChrome>
  )
}
