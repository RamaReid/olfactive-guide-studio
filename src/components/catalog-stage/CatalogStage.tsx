import { useState } from 'react'

import {
  getLineById,
  ommiCategories,
  ommiPerfumes,
} from '../../data/ommiCatalog'
import type { OmmiFragrance, OmmiLineId } from '../../data/ommiCatalog'
import { AmbientBackground } from './AmbientBackground'
import { BottleCarousel } from './BottleCarousel'
import { FloatingHeader } from './FloatingHeader'
import { LineIndicator } from './LineIndicator'
import { TubeRack } from './TubeRack'

type CatalogStageProps = {
  initialLineId?: OmmiLineId
}

type StageStyle = React.CSSProperties & {
  '--ambient-base': string
  '--ambient-halo-primary': string
  '--ambient-halo-secondary': string
  '--ambient-shadow': string
  '--ambient-accent': string
}

const lineShowsAllFragrances = (lineId: OmmiLineId) =>
  lineId === 'mixto' || lineId === 'discovery'

const firstFragranceIdForLine = (lineId: OmmiLineId) =>
  lineShowsAllFragrances(lineId)
    ? ommiPerfumes[0]?.id ?? null
    : (
        ommiPerfumes.find((fragrance) => fragrance.primaryEntryId === lineId) ??
        ommiPerfumes.find((fragrance) => fragrance.categoryIds.includes(lineId))
      )?.id ?? null

export function CatalogStage({ initialLineId = 'firma' }: CatalogStageProps) {
  const [activeLineId, setActiveLineId] = useState<OmmiLineId>(initialLineId)
  const [activeFragranceId, setActiveFragranceId] = useState<string | null>(
    firstFragranceIdForLine(initialLineId),
  )

  const activeLine = getLineById(activeLineId)
  const stageStyle: StageStyle = {
    '--ambient-base': activeLine.palette.base,
    '--ambient-halo-primary': activeLine.palette.primary,
    '--ambient-halo-secondary': activeLine.palette.secondary,
    '--ambient-shadow': activeLine.palette.shadow,
    '--ambient-accent': activeLine.palette.accent,
  }

  const changeLine = (lineId: OmmiLineId) => {
    setActiveLineId(lineId)
    setActiveFragranceId(firstFragranceIdForLine(lineId))
  }

  const focusFragrance = (fragrance: OmmiFragrance) => {
    setActiveFragranceId(fragrance.id)
  }

  return (
    <main className="catalog-stage" style={stageStyle}>
      <AmbientBackground line={activeLine} />
      <div className="header-overlay">
        <FloatingHeader />
      </div>

      <section className="selector-visual-stage" aria-label="Escenario visual del selector">
        <BottleCarousel
          lines={ommiCategories}
          activeLineId={activeLineId}
          onLineChange={changeLine}
        />

        <LineIndicator
          lines={ommiCategories}
          activeLineId={activeLineId}
          onLineChange={changeLine}
        />
      </section>

      <aside className="selector-panel" aria-label="Panel funcional del selector">
        <TubeRack
          activeLine={activeLine}
          fragrances={ommiPerfumes}
          activeFragranceId={activeFragranceId}
          onFragranceFocus={focusFragrance}
        />
      </aside>
    </main>
  )
}
