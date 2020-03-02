import 'core-js'
import React, {
  useMemo,
  useState,
  useCallback
} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {Text} from '@commercetools-frontend/ui-kit';
import LightBox from './LightBox'
const Screenshots = ({
  images,
  open,
  setOpen,
  openLightBox,
  index,
  setIndex,
  title
}) => (
  <React.Fragment>
    <div>
      <Text.Headline as="h2">
        {title}
      </Text.Headline>
      <Container className="product-list">
        {images.map((row, index) => (
          <Row key={index}>
            {row.map((href, index) => (
              <Col lg="6" key={href}>
                <a
                  href={href}
                  onClick={e => openLightBox(e, index)}
                  key={href}
                >
                  <img
                    className="vendor-image"
                    src={href}
                  />
                </a>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      <LightBox
        images={images.flat()}
        open={open}
        setOpen={setOpen}
        index={index}
        setIndex={setIndex}
      />
    </div>
  </React.Fragment>
)
export default function ScreenshotsContainer({ product, title }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const openLightBox = useCallback((e, index) => {
    e.preventDefault()
    setIndex(index)
    setOpen(true)
  }, [])
  return useMemo(() => {
    const images = !product
      ? []
      : product.screenshots
          .reduce((result, href, index) => {
            if (index % 2 === 0) {
              result.push([])
            }
            result[result.length - 1].push(href)
            return result
          }, [])
          .filter(r => r.length)
    return !images.length
      ? ''
      : Screenshots({
          images,
          open,
          setOpen,
          openLightBox,
          index,
          setIndex,
          title
        })
  }, [index, open, openLightBox, product])
}
