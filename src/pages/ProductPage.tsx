import { Link, useParams } from 'react-router'

import { PageChrome } from '../components/layout/PageChrome'
import {
  discoverySetAssetPath,
  getFragranceBySlug,
  getLineById,
  getLineBySlug,
} from '../data/ommiCatalog'

export function ProductPage() {
  const { lineSlug, fragranceSlug } = useParams()
  const line = getLineBySlug(lineSlug ?? '')
  const fragrance = getFragranceBySlug(lineSlug ?? '', fragranceSlug ?? '')

  if (!line || !fragrance) {
    return (
      <PageChrome>
        <main className="placeholder-page">
          <Link to="/" className="back-link">
            Volver
          </Link>
          <h1>Fragancia no encontrada</h1>
          <p>Esta ruta espera una linea y una fragancia validas.</p>
        </main>
      </PageChrome>
    )
  }

  const primaryLine = getLineById(fragrance.primaryEntryId)
  const presentationLine = discoverySetAssetPath(line.id) ? line : primaryLine
  const setAsset = discoverySetAssetPath(presentationLine.id)

  return (
    <PageChrome>
      <main className="placeholder-page product-page">
        <Link to={`/perfumes/${line.slug}`} className="back-link">
          Volver a {line.name}
        </Link>

        <div className="product-detail-layout">
          <section className="product-detail-copy">
            <span className="page-kicker">{presentationLine.name}</span>
            <h1>
              N&ordm; {fragrance.number} {fragrance.family}
            </h1>
            <p>{fragrance.elements.join(' - ')}</p>

            <div className="product-detail-meta">
              <span>
                Inspirado en {fragrance.referenceBrand} - {fragrance.referenceName}
              </span>
              <strong>Intensidad {fragrance.intensity}</strong>
              <small>{fragrance.shortDescription}</small>
            </div>
          </section>

          <figure className="product-media product-media-bottle">
            <img
              src={fragrance.bottleAsset}
              alt={`Botella OMMI N ${fragrance.number} ${fragrance.referenceName}`}
            />
            <figcaption>Botella N&ordm; {fragrance.number}</figcaption>
          </figure>

          {setAsset ? (
            <figure className="product-media product-media-set">
              <img
                src={setAsset}
                alt={`Discovery Set OMMI ${presentationLine.name}`}
              />
              <figcaption>Discovery Set {presentationLine.name}</figcaption>
            </figure>
          ) : null}

          <figure className="product-media product-media-box">
            <img
              src={presentationLine.assets.boxHint}
              alt={`Caja OMMI ${presentationLine.name}`}
            />
            <figcaption>Presentacion {presentationLine.name}</figcaption>
          </figure>
        </div>
      </main>
    </PageChrome>
  )
}
