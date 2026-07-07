import { motion } from 'motion/react'

import type { OmmiLine, OmmiLineId } from '../../data/ommiCatalog'

type PrismPosition =
  | 'front'
  | 'leftNear'
  | 'rightNear'
  | 'leftFar'
  | 'rightFar'
  | 'hiddenLeft'
  | 'hiddenRight'

type CategoryPrismProps = {
  lines: OmmiLine[]
  activeLineId: OmmiLineId
  onLineChange: (lineId: OmmiLineId) => void
}

type PrismVisualState = {
  x: number
  z: number
  rotateY: number
  scale: number
  opacity: number
  blur: number
  zIndex: number
}

const prismStates: Record<PrismPosition, PrismVisualState> = {
  front: { x: 0, z: 120, rotateY: 0, scale: 1, opacity: 1, blur: 0, zIndex: 7 },
  leftNear: {
    x: -190,
    z: 20,
    rotateY: 34,
    scale: 0.82,
    opacity: 0.8,
    blur: 0,
    zIndex: 5,
  },
  rightNear: {
    x: 190,
    z: 20,
    rotateY: -34,
    scale: 0.82,
    opacity: 0.8,
    blur: 0,
    zIndex: 5,
  },
  leftFar: {
    x: -310,
    z: -110,
    rotateY: 48,
    scale: 0.64,
    opacity: 0.44,
    blur: 1.5,
    zIndex: 3,
  },
  rightFar: {
    x: 310,
    z: -110,
    rotateY: -48,
    scale: 0.64,
    opacity: 0.44,
    blur: 1.5,
    zIndex: 3,
  },
  hiddenLeft: {
    x: -410,
    z: -210,
    rotateY: 68,
    scale: 0.48,
    opacity: 0,
    blur: 4,
    zIndex: 1,
  },
  hiddenRight: {
    x: 410,
    z: -210,
    rotateY: -68,
    scale: 0.48,
    opacity: 0,
    blur: 4,
    zIndex: 1,
  },
}

const getOffset = (index: number, activeIndex: number, total: number) => {
  let offset = index - activeIndex
  const half = Math.floor(total / 2)

  if (offset > half) {
    offset -= total
  }

  if (offset < -half) {
    offset += total
  }

  return offset
}

const getPrismPosition = (offset: number): PrismPosition => {
  if (offset === 0) return 'front'
  if (offset === -1) return 'leftNear'
  if (offset === 1) return 'rightNear'
  if (offset === -2) return 'leftFar'
  if (offset === 2) return 'rightFar'
  if (offset < 0) return 'hiddenLeft'
  return 'hiddenRight'
}

export function CategoryPrism({
  lines,
  activeLineId,
  onLineChange,
}: CategoryPrismProps) {
  const activeIndex = lines.findIndex((line) => line.id === activeLineId)

  return (
    <section className="category-prism" aria-label="Líneas olfativas">
      <div className="prism-orbit">
        {lines.map((line, index) => {
          const position = getPrismPosition(
            getOffset(index, activeIndex, lines.length),
          )
          const state = prismStates[position]
          const isActive = line.id === activeLineId

          return (
            <motion.button
              key={line.id}
              type="button"
              className="prism-card"
              data-position={position}
              data-active={isActive}
              style={{
                zIndex: state.zIndex,
                borderColor: isActive ? line.palette.accent : 'transparent',
              }}
              animate={{
                x: state.x,
                z: state.z,
                rotateY: state.rotateY,
                scale: state.scale,
                opacity: state.opacity,
                filter: `blur(${state.blur}px)`,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
              onClick={() => onLineChange(line.id)}
              aria-pressed={isActive}
            >
              <span className="prism-index">0{index + 1}</span>
              <span className="prism-name">{line.name}</span>
              <span className="prism-descriptor">{line.shortDescriptor}</span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
