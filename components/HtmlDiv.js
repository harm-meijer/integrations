import React, { memo } from 'react'

const HtmlDiv = ({ content, className }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: content
    }}
    className={className}
  ></div>
)
export default memo(HtmlDiv)
