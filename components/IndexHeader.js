import React from 'react'

const IndexHeader = ({ title, subTitle }) => (
  <div className="integration">
    <h1 className="big-title">{title}</h1>
    <h1 className="integration-header">{subTitle}</h1>
  </div>
)
export default function IndexHeaderHeaderContainer({
  title,
  subTitle
}) {
  return () =>
    title ? IndexHeader({ title, subTitle }) : ''
}
