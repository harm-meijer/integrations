import React, { useMemo } from 'react'
import HtmlDiv from './HtmlDiv'

const Banner = (title, content) => (
  <div style={{padding: '10px', backgroundColor: '#e6e6e6', width: '100%', borderRadius:'15px', marginBottom: '10px', marginTop: '10px', height: '100px'}}>
    <h4>
      {title}
    </h4>
    <HtmlDiv content={content}>
    </HtmlDiv>
  </div>
)

export default function BannerContainer({title, content}) {
  return useMemo(() => Banner(title, content), [])
}
