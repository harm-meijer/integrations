import React from 'react'
import Lightbox from 'react-image-lightbox'

const LightBox = ({
  previous,
  current,
  next,
  movePrevious,
  moveNext,
  close,
  open
}) =>
  open && (
    <Lightbox
      mainSrc={current}
      nextSrc={next}
      prevSrc={previous}
      onCloseRequest={close}
      onMovePrevRequest={movePrevious}
      onMoveNextRequest={moveNext}
    />
  )

export default ({
  images,
  open,
  setOpen,
  index,
  setIndex
}) => {
  const max = images.length
  const calcMove = React.useCallback(
    direction => val => {
      const newVal = val + direction
      return newVal < 0 ? max : newVal > max ? 0 : newVal
    },
    [max]
  )
  const movePrevious = React.useCallback(
    () => setIndex(calcMove(-1)),
    [calcMove, setIndex]
  )
  const moveNext = React.useCallback(
    () => setIndex(calcMove(1)),
    [calcMove, setIndex]
  )
  const close = React.useCallback(() => setOpen(false), [
    setOpen
  ])
  return LightBox({
    previous: images[calcMove(-1)(index)],
    current: images[index],
    next: images[calcMove(1)(index)],
    movePrevious,
    moveNext,
    close,
    open
  })
}
