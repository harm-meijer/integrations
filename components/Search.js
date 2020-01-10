import React, {
  useState,
  useCallback,
  useMemo
} from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import { selectQuery } from '../store/selectors'
const SearchText = function SearchText({
  change,
  search,
  searchText
}) {
  return (
    <form
      className="form-inline my-2 my-lg-0"
      onSubmit={search}
    >
      <input
        type="text"
        className="form-control mr-sm-2"
        placeholder="Search"
        aria-label="Search"
        onChange={change}
        value={searchText}
      />
    </form>
  )
}
export default function SearchTextContainer() {
  const query = useSelector(selectQuery)
  const [searchText, setSearchText] = useState(
    query?.q || ''
  )
  const change = useCallback(
    e => setSearchText(e.target.value),
    []
  )
  const search = useCallback(
    e => {
      e.preventDefault()
      Router.push(
        `/search?q=${searchText}`,
        `/search/${searchText}`
      )
    },
    [searchText]
  )
  const newProps = useMemo(
    () => ({
      change,
      search,
      searchText
    }),
    [change, search, searchText]
  )
  return SearchText(newProps)
}
