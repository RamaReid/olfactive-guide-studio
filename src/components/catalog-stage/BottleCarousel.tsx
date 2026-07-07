import { useCallback, useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router'

import { getLineRoute, type OmmiLine, type OmmiLineId } from '../../data/ommiCatalog'

type BottleCarouselProps = {
  lines: OmmiLine[]
  activeLineId: OmmiLineId
  onLineChange: (lineId: OmmiLineId) => void
}

const bottleScaleMultiplier = 1.8

const linePositionTransform = (distance: number, total: number) => {
  const angleStep = total === 0 ? 0 : 360 / total
  const angle = distance * angleStep
  const radians = (angle * Math.PI) / 180
  const radius = 285
  const x = Math.sin(radians) * radius
  const z = Math.cos(radians) * radius
  const distanceFromFront = Math.abs(distance)
  const baseScale = distanceFromFront === 0 ? 1.16 : distanceFromFront === 1 ? 0.82 : 0.52

  return {
    x,
    z,
    scale: baseScale * bottleScaleMultiplier,
    opacity: distanceFromFront === 0 ? 1 : distanceFromFront === 1 ? 0.72 : distanceFromFront === 2 ? 0.24 : 0,
    blur: distanceFromFront === 0 ? 0 : distanceFromFront === 1 ? 1.1 : 4.2,
    zIndex: distanceFromFront === 0 ? 100 : distanceFromFront === 1 ? 62 : distanceFromFront === 2 ? 22 : 0,
    visible: distanceFromFront <= 2,
  }
}

const circularDistance = (index: number, activeIndex: number, total: number) => {
  const half = Math.floor(total / 2)
  let distance = index - activeIndex

  if (distance > half) {
    distance -= total
  } else if (distance < -half) {
    distance += total
  }

  return distance
}

const wheelThrottleMs = 920
const wheelDeltaThreshold = 8
const isInsideCylinderCenter = (stage: HTMLElement, event: WheelEvent) => {
  const bounds = stage.getBoundingClientRect()
  const captureWidth = Math.min(bounds.width * 0.72, 760)
  const captureHeight = Math.min(bounds.height * 0.72, 680)
  const centerX = bounds.left + bounds.width / 2
  const centerY = bounds.top + bounds.height / 2

  return (
    Math.abs(event.clientX - centerX) <= captureWidth / 2 &&
    Math.abs(event.clientY - centerY) <= captureHeight / 2
  )
}

export function BottleCarousel({
  lines,
  activeLineId,
  onLineChange,
}: BottleCarouselProps) {
  const stageRef = useRef<HTMLElement>(null)
  const lastWheelTimeRef = useRef(0)
  const navigate = useNavigate()
  const activeIndex = lines.findIndex((line) => line.id === activeLineId)
  const visibleLines = lines.map((line, index) => ({
    line,
    distance:
      activeIndex < 0
        ? 0
        : circularDistance(index, activeIndex, lines.length),
  }))

  const advanceLine = useCallback((direction: number) => {
    if (activeIndex < 0 || lines.length === 0) return

    const nextIndex = (activeIndex + direction + lines.length) % lines.length
    onLineChange(lines[nextIndex].id)
  }, [activeIndex, lines, onLineChange])

  const handleStageClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement | null)?.closest('.category-bottle')) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const centerX = bounds.left + bounds.width / 2
    const axisDeadZone = Math.min(52, bounds.width * 0.06)
    const distanceFromAxis = event.clientX - centerX

    if (Math.abs(distanceFromAxis) <= axisDeadZone) return

    event.preventDefault()
    event.stopPropagation()
    advanceLine(distanceFromAxis > 0 ? 1 : -1)
  }

  useEffect(() => {
    const stage = stageRef.current

    if (!stage || activeIndex < 0 || lines.length === 0) return

    const handleWheel = (event: WheelEvent) => {
      if (!isInsideCylinderCenter(stage, event)) return

      const wheelDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

      event.preventDefault()

      if (Math.abs(wheelDelta) < wheelDeltaThreshold) return

      const now = Date.now()
      if (now - lastWheelTimeRef.current < wheelThrottleMs) return
      lastWheelTimeRef.current = now

      advanceLine(wheelDelta > 0 ? 1 : -1)
    }

    stage.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      stage.removeEventListener('wheel', handleWheel)
    }
  }, [activeIndex, advanceLine, lines.length])

  return (
    <section
      className="category-cylinder"
      ref={stageRef}
      aria-label="Cilindro vertical de botellas"
      onClickCapture={handleStageClick}
    >
      <div className="category-cylinder-shell">
        <div className="category-cylinder-track">
          {visibleLines.map(({ line, distance }) => {
            const active = line.id === activeLineId
            const transform = linePositionTransform(distance, lines.length)

            return (
              <button
                key={line.id}
                type="button"
                className="category-bottle"
                data-active={active}
                aria-pressed={active}
                aria-disabled={!active}
                aria-label={line.name}
                tabIndex={active ? 0 : -1}
                style={{
                  zIndex: transform.zIndex,
                  transform: `translate3d(${transform.x}px, 0, ${transform.z}px) scale(${transform.scale})`,
                  opacity: transform.opacity,
                  filter: `blur(${transform.blur}px)`,
                  pointerEvents: transform.visible ? 'auto' : 'none',
                }}
                onClick={(event) => {
                  if (!active) return
                  event.stopPropagation()
                  onLineChange(line.id)
                  navigate(getLineRoute(line))
                }}
              >
                <span className="category-bottle-halo" />
                <img
                  className="category-bottle-image"
                  src={line.bottleAsset}
                  alt={`Botella OMMI ${line.name}`}
                  onError={(event) => {
                    console.error('No cargó botella de categoría:', line.bottleAsset)
                    event.currentTarget.style.display = 'none'
                    event.currentTarget.parentElement?.classList.add('asset-fallback')
                  }}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
