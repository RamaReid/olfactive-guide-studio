import type { OmmiLine, OmmiLineId } from '../../data/ommiCatalog'

type LineIndicatorProps = {
  lines: OmmiLine[]
  activeLineId: OmmiLineId
  onLineChange: (lineId: OmmiLineId) => void
}

export function LineIndicator({
  lines,
  activeLineId,
  onLineChange,
}: LineIndicatorProps) {
  return (
    <nav className="line-indicator" aria-label="Selector de líneas">
      {lines.map((line) => {
        const isActive = line.id === activeLineId

        return (
          <button
            key={line.id}
            type="button"
            aria-label={line.name}
            aria-pressed={isActive}
            className="line-pill"
            data-active={isActive}
            onClick={() => onLineChange(line.id)}
          >
            <span className="line-pill-name">{line.name.toUpperCase()}</span>
            <span className="line-pill-mark" aria-hidden="true" />
          </button>
        )
      })}
    </nav>
  )
}
