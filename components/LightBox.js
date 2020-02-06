import React from 'react'
import Lightbox from 'react-image-lightbox'

const LightBox = ({
  previous,
  current,
  next,
  movePrevious,
  moveNext,
  close,
  isOpen
}) =>
  isOpen && (
    <Lightbox
      mainSrc={current}
      nextSrc={next}
      prevSrc={previous}
      onCloseRequest={close}
      onMovePrevRequest={movePrevious}
      onMoveNextRequest={moveNext}
    />
  )

export default ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(true)
  const max = images.length
  const calcMove = React.useCallback(
    direction => val => {
      const newVal = val + direction
      return newVal < 0 ? max : newVal > max ? 0 : newVal
    },
    [max]
  )
  const movePrevious = React.useCallback(
    () => setCurrentIndex(calcMove(-1)),
    [calcMove]
  )
  const moveNext = React.useCallback(
    () => setCurrentIndex(calcMove(1)),
    [calcMove]
  )
  const close = React.useCallback(
    () => setIsOpen(false),
    []
  )
  return LightBox({
    previous: images[calcMove(-1)(currentIndex)],
    current: images[currentIndex],
    next: images[calcMove(1)(currentIndex)],
    movePrevious,
    moveNext,
    close,
    isOpen
  })
}
