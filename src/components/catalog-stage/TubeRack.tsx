import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { getLineById, type OmmiFragrance, type OmmiLine } from '../../data/ommiCatalog'

type TubeRackProps = {
  activeLine: OmmiLine
  fragrances: OmmiFragrance[]
  activeFragranceId: string | null
  onFragranceFocus: (fragrance: OmmiFragrance) => void
}

const wrapIndex = (index: number, total: number) =>
  ((index % total) + total) % total

const visibleOffsets = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]
const wheelThrottleMs = 120
const centerSettleDelayMs = 420
const wheelDeltaThreshold = 2
const touchStepPx = 42

const lineShowsAllFragrances = (lineId: OmmiLine['id']) =>
  lineId === 'mixto' || lineId === 'discovery'

const isInsideCylinderCenter = (stage: HTMLElement, event: WheelEvent) => {
  const bounds = stage.getBoundingClientRect()
  const captureWidth = Math.min(bounds.width * 0.78, 720)
  const captureHeight = Math.min(bounds.height * 0.78, 760)
  const centerX = bounds.left + bounds.width / 2
  const centerY = bounds.top + bounds.height / 2

  return (
    Math.abs(event.clientX - centerX) <= captureWidth / 2 &&
    Math.abs(event.clientY - centerY) <= captureHeight / 2
  )
}

const categoryLabelById: Record<OmmiLine['id'], string> = {
  dia: 'Dia',
  noche: 'Noche',
  piel: 'Piel',
  firma: 'Firma',
  regalo: 'Regalo',
  mixto: 'Mixto',
  discovery: 'Discovery',
}

const audienceLabelById: Record<OmmiFragrance['audience'], string> = {
  femenino: 'Mujer',
  masculino: 'Hombre',
  unisex: 'Unisex',
}

const getTubeCylinderState = (
  offset: number,
  stageHeight: number,
  isSettled: boolean,
  isCompact: boolean,
) => {
  const angleStep = 360 / 26
  const angleDeg = offset * angleStep
  const angleRad = (angleDeg * Math.PI) / 180
  const radiusY = isCompact
    ? Math.min(Math.max(120, stageHeight * 0.28), stageHeight * 0.32)
    : Math.min(Math.max(180, stageHeight * 0.44), stageHeight * 0.46)
  const radiusZ = isCompact
    ? Math.max(110, stageHeight * 0.14)
    : Math.max(150, stageHeight * 0.18)
  const y = Math.sin(angleRad) * radiusY
  const z = Math.cos(angleRad) * radiusZ
  const zNorm = (z + radiusZ) / (radiusZ * 2)
  const isCenter = offset === 0
  const baseScale = 0.26 + zNorm * 0.74
  const centerScale = isCenter && !isSettled && isCompact ? Math.max(baseScale, 0.9) : baseScale
  const baseOpacity = 0.12 + zNorm * 0.88
  const rotateFactor = isCompact ? 0.35 : 0.55

  return {
    y,
    z,
    scale: isCenter && isSettled ? 1.1 : centerScale,
    opacity: baseOpacity,
    blur: (1 - zNorm) * 4.6,
    rotateX: -angleDeg * rotateFactor,
    zIndex: Math.round(zNorm * 100),
  }
}

export function TubeRack({
  activeLine,
  fragrances,
  activeFragranceId,
  onFragranceFocus,
}: TubeRackProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const lastWheelTimeRef = useRef(0)
  const hasRenderedActiveRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const touchAccumRef = useRef(0)
  const touchActiveRef = useRef(false)
  const navigate = useNavigate()
  const [stageHeight, setStageHeight] = useState(760)
  const [isCylinderSettled, setIsCylinderSettled] = useState(true)
  const [displayedFragranceId, setDisplayedFragranceId] = useState<string | null>(null)
  const [isCompact, setIsCompact] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 640px)')
    const handler = (event: MediaQueryListEvent) => setIsCompact(event.matches)
    setIsCompact(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const filteredFragrances = useMemo(() => {
    if (lineShowsAllFragrances(activeLine.id)) {
      return fragrances
    }

    return fragrances.filter((fragrance) => fragrance.categoryIds.includes(activeLine.id))
  }, [activeLine.id, fragrances])

  const activeFragrance = useMemo(() => {
    if (filteredFragrances.length === 0) return null

    return (
      filteredFragrances.find((fragrance) => fragrance.id === activeFragranceId) ??
      filteredFragrances.find((fragrance) => fragrance.primaryEntryId === activeLine.id) ??
      filteredFragrances[0] ??
      null
    )
  }, [activeFragranceId, activeLine.id, filteredFragrances])

  const activeIndex = useMemo(() => {
    if (!activeFragrance || filteredFragrances.length === 0) return -1

    return filteredFragrances.findIndex((fragrance) => fragrance.id === activeFragrance.id)
  }, [activeFragrance, filteredFragrances])

  const visibleFragrances = useMemo(() => {
    if (activeIndex < 0 || filteredFragrances.length === 0) return []

    return visibleOffsets.map((offset) => ({
      fragrance: filteredFragrances[wrapIndex(activeIndex + offset, filteredFragrances.length)],
      distance: offset,
    }))
  }, [activeIndex, filteredFragrances])

  const hasRepeatedVisibleFragrances = filteredFragrances.length < visibleOffsets.length
  const activeFragranceKey = activeFragrance?.id ?? ''

  useEffect(() => {
    if (!activeFragranceKey) return

    if (!hasRenderedActiveRef.current) {
      hasRenderedActiveRef.current = true
      setIsCylinderSettled(true)
      setDisplayedFragranceId(activeFragranceKey)
      return
    }

    setIsCylinderSettled(false)

    const settleTimer = window.setTimeout(() => {
      setIsCylinderSettled(true)
      setDisplayedFragranceId(activeFragranceKey)
    }, centerSettleDelayMs)

    return () => {
      window.clearTimeout(settleTimer)
    }
  }, [activeFragranceKey])

  useEffect(() => {
    const stage = stageRef.current

    if (!stage) return

    const updateStageHeight = () => {
      const nextHeight = stage.getBoundingClientRect().height

      if (nextHeight > 0) {
        setStageHeight(nextHeight)
      }
    }

    updateStageHeight()

    const resizeObserver = new ResizeObserver(updateStageHeight)
    resizeObserver.observe(stage)
    window.addEventListener('resize', updateStageHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateStageHeight)
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current

    if (!stage) return

    const handleWheel = (event: WheelEvent) => {
      if (filteredFragrances.length === 0) return
      if (!isInsideCylinderCenter(stage, event)) return

      const wheelDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

      event.preventDefault()

      if (Math.abs(wheelDelta) < wheelDeltaThreshold) return

      const now = Date.now()
      if (now - lastWheelTimeRef.current < wheelThrottleMs) return
      lastWheelTimeRef.current = now

      const direction = wheelDelta > 0 ? 1 : -1
      const steps = Math.max(1, Math.min(3, Math.floor(Math.abs(wheelDelta) / 45)))
      const currentIndex = Math.max(
        0,
        filteredFragrances.findIndex((fragrance) => fragrance.id === activeFragranceKey),
      )
      const nextIndex = wrapIndex(currentIndex + direction * steps, filteredFragrances.length)
      onFragranceFocus(filteredFragrances[nextIndex])
    }

    stage.addEventListener('wheel', handleWheel, { passive: false })

    const isInsideCenterTouch = (touch: Touch) => {
      const bounds = stage.getBoundingClientRect()
      const captureWidth = Math.min(bounds.width * 0.85, 720)
      const captureHeight = Math.min(bounds.height * 0.85, 760)
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      return (
        Math.abs(touch.clientX - centerX) <= captureWidth / 2 &&
        Math.abs(touch.clientY - centerY) <= captureHeight / 2
      )
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (filteredFragrances.length === 0) return
      const touch = event.touches[0]
      if (!touch || !isInsideCenterTouch(touch)) {
        touchActiveRef.current = false
        return
      }
      touchActiveRef.current = true
      touchStartYRef.current = touch.clientY
      touchStartXRef.current = touch.clientX
      touchAccumRef.current = 0
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchActiveRef.current) return
      const touch = event.touches[0]
      if (!touch || touchStartYRef.current === null || touchStartXRef.current === null) return

      const dy = touch.clientY - touchStartYRef.current
      const dx = touch.clientX - touchStartXRef.current
      const delta = Math.abs(dy) >= Math.abs(dx) ? dy : dx

      event.preventDefault()

      const advance = touchAccumRef.current - delta
      const steps = Math.trunc(advance / touchStepPx)
      if (steps === 0) return

      touchStartYRef.current = touch.clientY
      touchStartXRef.current = touch.clientX
      touchAccumRef.current = advance - steps * touchStepPx

      const direction = steps > 0 ? 1 : -1
      const magnitude = Math.min(3, Math.abs(steps))
      const currentIndex = Math.max(
        0,
        filteredFragrances.findIndex((fragrance) => fragrance.id === activeFragranceKey),
      )
      const nextIndex = wrapIndex(
        currentIndex + direction * magnitude,
        filteredFragrances.length,
      )
      onFragranceFocus(filteredFragrances[nextIndex])
    }

    const handleTouchEnd = () => {
      touchActiveRef.current = false
      touchStartYRef.current = null
      touchStartXRef.current = null
      touchAccumRef.current = 0
    }

    stage.addEventListener('touchstart', handleTouchStart, { passive: true })
    stage.addEventListener('touchmove', handleTouchMove, { passive: false })
    stage.addEventListener('touchend', handleTouchEnd)
    stage.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      stage.removeEventListener('wheel', handleWheel)
      stage.removeEventListener('touchstart', handleTouchStart)
      stage.removeEventListener('touchmove', handleTouchMove)
      stage.removeEventListener('touchend', handleTouchEnd)
      stage.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [activeFragranceKey, filteredFragrances, onFragranceFocus])

  if (!activeFragrance) {
    return null
  }

  const displayedFragrance =
    filteredFragrances.find((fragrance) => fragrance.id === displayedFragranceId) ??
    activeFragrance

  return (
    <section className="tube-cylinder-shell" aria-label="Cilindro horizontal de tubos">
      <div className="tube-cylinder-stage" ref={stageRef}>
        <div className="tube-cylinder-track">
          {visibleFragrances.map(({ fragrance, distance }) => {
            const isActive = fragrance.id === activeFragrance.id
            const state = getTubeCylinderState(distance, stageHeight, isCylinderSettled, isCompact)

            return (
              <button
                key={hasRepeatedVisibleFragrances ? `${fragrance.id}-${distance}` : fragrance.id}
                type="button"
                className="tube-cylinder-item"
                data-active={isActive}
                aria-pressed={isActive}
                aria-disabled={!isActive}
                aria-label={`N ${fragrance.number} ${fragrance.descriptor}`}
                tabIndex={isActive ? 0 : -1}
                style={{
                  zIndex: state.zIndex,
                  width: 'var(--tube-item-width)',
                  maxWidth: '100%',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                onClick={() => {
                  if (!isActive) return
                  onFragranceFocus(fragrance)
                  const line = getLineById(fragrance.primaryEntryId)
                  navigate(`/perfumes/${line.slug}/${fragrance.slug}`)
                }}
              >
                <span
                  className="tube-cylinder-core"
                  style={{
                    transform: `translateY(${state.y}px) translateZ(${state.z}px) rotateX(${state.rotateX}deg) scale(${state.scale})`,
                    opacity: state.opacity,
                    filter: `blur(${state.blur}px)`,
                  }}
                >
                  <img
                    className="perfume-tube-image"
                    src={fragrance.tubeAsset}
                    alt={`Tubo OMMI ${fragrance.number}`}
                    loading={isActive ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={isActive ? 'high' : 'auto'}
                    onError={(event) => {
                      console.error('No cargo tubo:', fragrance.tubeAsset)
                      event.currentTarget.style.display = 'none'
                      event.currentTarget
                        .closest('.tube-cylinder-item')
                        ?.classList.add('asset-fallback')
                    }}
                  />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="active-tube-description" key={displayedFragrance.id} aria-live="polite">
        <span className="active-tube-number">N&ordm;{displayedFragrance.number}</span>
        <strong>{displayedFragrance.descriptor}</strong>
        <span className="active-tube-meta">
          N&ordm;{displayedFragrance.number} &middot;{' '}
          {categoryLabelById[displayedFragrance.primaryEntryId]} -{' '}
          {audienceLabelById[displayedFragrance.audience]}
        </span>
        <span>{displayedFragrance.inspiration}</span>
        <span>
          {displayedFragrance.status} - Intensidad {displayedFragrance.intensity}
        </span>
        <p>{displayedFragrance.notes}</p>
      </div>
    </section>
  )
}
