import { useState } from 'react'

import type { OmmiLine } from '../../data/ommiCatalog'

type PackageHintProps = {
  line: OmmiLine
}

export function PackageHint({ line }: PackageHintProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const canShowImage = Boolean(line.assets.boxHint && !hasImageError)

  return (
    <div className="package-hint" aria-hidden="true">
      {canShowImage ? (
        <img
          className="package-image"
          src={line.assets.boxHint}
          alt=""
          onError={() => setHasImageError(true)}
        />
      ) : null}
      <div className="package-plane package-plane-front">
        <span>OMMI</span>
        <span>{line.name}</span>
      </div>
      <div className="package-plane package-plane-side" />
    </div>
  )
}
