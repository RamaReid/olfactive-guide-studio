import { useRef, useState } from 'react'
import { motion } from 'motion/react'

import type { OmmiFragrance, OmmiLine } from '../../data/ommiCatalog'

export type CarouselBottlePosition = 'previous' | 'active' | 'next'

type BottleAvatarProps = {
  line: OmmiLine
  fragrance: OmmiFragrance
  position: CarouselBottlePosition
  isBackVisible: boolean
  isDragging: boolean
  onSelect: (fragrance: OmmiFragrance) => void
  onBackVisibleChange: (isVisible: boolean) => void
  onDraggingChange: (isDragging: boolean) => void
}

const positionTransform: Record<
  CarouselBottlePosition,
  {
    x: number
    scale: number
    rotateY: number
    opacity: number
    blur: number
    zIndex: number
  }
> = {
  previous: {
    x: -228,
    scale: 0.82,
    rotateY: 35,
    opacity: 0.56,
    blur: 1.6,
    zIndex: 2,
  },
  active: { x: 0, scale: 1, rotateY: 0, opacity: 1, blur: 0, zIndex: 5 },
  next: {
    x: 228,
    scale: 0.82,
    rotateY: -35,
    opacity: 0.56,
    blur: 1.6,
    zIndex: 2,
  },
}

export function BottleAvatar({
  line,
  fragrance,
  position,
  isBackVisible,
  isDragging,
  onSelect,
  onBackVisibleChange,
  onDraggingChange,
}: BottleAvatarProps) {
  const dragStartX = useRef<number | null>(null)
  const movedDuringPointer = useRef(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [frontImageFailed, setFrontImageFailed] = useState(false)
  const [backImageFailed, setBackImageFailed] = useState(false)

  if (!line || !fragrance) {
    return null
  }

  const isActive = position === 'active'
  const frontImageSrc = fragrance.asset?.bottleFront ?? line.assets.bottleFront
  const backImageSrc = line.assets.bottleBack
  const canShowFrontImage = Boolean(frontImageSrc && !frontImageFailed)
  const canShowBackImage = Boolean(backImageSrc && !backImageFailed)
  const transform = positionTransform[position]

  const resetDrag = () => {
    dragStartX.current = null
    onDraggingChange(false)
  }

  const selectFragrance = () => {
    onSelect(fragrance)
    onBackVisibleChange(false)
  }

  return (
    <motion.button
      type="button"
      className="bottle-avatar"
      data-position={position}
      data-active={isActive}
      data-back-visible={isBackVisible}
      data-dragging={isDragging}
      aria-label={`Seleccionar N°${fragrance.number} ${fragrance.family}`}
      style={{ zIndex: transform.zIndex }}
      animate={{
        x: transform.x,
        scale: transform.scale,
        rotateX: isActive ? tilt.y : 0,
        rotateY: transform.rotateY + (isActive && isBackVisible ? 180 : 0) + tilt.x,
        opacity: transform.opacity,
        filter: `blur(${transform.blur}px)`,
      }}
      transition={{ type: 'spring', stiffness: 170, damping: 22 }}
      onMouseMove={
        isActive
          ? (event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const x = (event.clientX - rect.left) / rect.width - 0.5
              const y = (event.clientY - rect.top) / rect.height - 0.5
              setTilt({ x: x * 8, y: y * -6 })
            }
          : undefined
      }
      onMouseLeave={isActive ? () => setTilt({ x: 0, y: 0 }) : undefined}
      onPointerDown={
        isActive
          ? (event) => {
              dragStartX.current = event.clientX
              movedDuringPointer.current = false
              event.currentTarget.setPointerCapture(event.pointerId)
            }
          : undefined
      }
      onPointerMove={
        isActive
          ? (event) => {
              if (dragStartX.current === null) return

              const deltaX = event.clientX - dragStartX.current

              if (Math.abs(deltaX) > 8) {
                movedDuringPointer.current = true
                onDraggingChange(true)
              }

              if (deltaX > 54) {
                onBackVisibleChange(false)
              }

              if (deltaX < -54) {
                onBackVisibleChange(true)
              }
            }
          : undefined
      }
      onPointerCancel={isActive ? resetDrag : undefined}
      onPointerUp={
        isActive
          ? () => {
              const shouldSelect = !movedDuringPointer.current
              resetDrag()

              if (shouldSelect) {
                selectFragrance()
              }
            }
          : undefined
      }
      onClick={selectFragrance}
    >
      <span className="bottle-glow" />
      <span className="bottle-form">
        <span className="bottle-cap" />
        <span className="bottle-neck" />
        <span className="bottle-face bottle-front">
          {canShowFrontImage ? (
            <img
              className="bottle-image"
              src={frontImageSrc}
              alt=""
              onError={() => setFrontImageFailed(true)}
            />
          ) : (
            <>
              <span className="bottle-brand">OMMI</span>
              <span className="bottle-line">{fragrance.family}</span>
              <span className={`bottle-label bottle-label-${line.labelShape}`} />
              <span className="bottle-elements">
                {line.olfactoryElements.slice(0, 3).join(' · ')}
              </span>
            </>
          )}
        </span>
        <span className="bottle-face bottle-back">
          {canShowBackImage ? (
            <img
              className="bottle-image"
              src={backImageSrc}
              alt=""
              onError={() => setBackImageFailed(true)}
            />
          ) : (
            <>
              <span className="back-title">OMMI</span>
              <span>{line.name}</span>
              <span>{fragrance.referenceBrand}</span>
              <span>{fragrance.referenceName}</span>
            </>
          )}
        </span>
      </span>
    </motion.button>
  )
}
