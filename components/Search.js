import React, {
  useState,
  useCallback,
  useMemo
} from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import { selectQuery } from '../store/selectors'
import { TextInput } from '@commercetools-frontend/ui-kit'

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
      <TextInput
        value={searchText}
        onChange={change}
        aria-label="Search"
        placeholder="Search for..."
      ></TextInput>
      {/*<input*/}
      {/*type="text"*/}
      {/*className="form-control mr-sm-2"*/}
      {/*placeholder="Search"*/}
      {/*aria-label="Search"*/}
      {/*onChange={change}*/}
      {/*value={searchText}*/}
      {/*/>*/}
    </form>
  )
}
export default function SearchTextContainer({ setNav }) {
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
      setNav(false)
      Router.push(
        `/search?q=${searchText}`,
        `/search/${searchText}`
      )
    },
    [searchText, setNav]
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
