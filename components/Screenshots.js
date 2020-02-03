import React, { useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Screenshots = images => (
  <React.Fragment>
    <div>
      <h1 className="integration-header">
        Screenshots and Videos
      </h1>
      <Container className="product-list">
        {images.map((row, index) => (
          <Row key={index}>
            {row.map(href => (
              <Col lg="6" key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
    </div>
  </React.Fragment>
)
export default function ScreenshotsContainer({ product }) {
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
    return !images.length ? '' : Screenshots(images)
  }, [product])
}
