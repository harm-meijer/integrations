import React, {
  useMemo,
  useState,
  useCallback
} from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectCategoriesNested } from '../store/selectors'
import { useCategories } from '../hooks'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap'

function Menu({ categories = [] }) {
  return (
    <Nav className="ct-menu">
      {categories.map(category => (
        <MenuLinkContainer
          key={category.id}
          category={category}
        />
      ))}
    </Nav>
  )
}
function SubMenuLink({ category }) {
  return (
    <NavDropdown.Item>
      <Link
        href={`/integrations?category=${category.slug}`}
        as={`/integrations/${category.slug}`}
      >
        <div>{category.name}</div>
      </Link>
    </NavDropdown.Item>
  )
}
function MenuLink({
  category,
  handleOpen,
  handleClose,
  isOpen
}) {
  return category.subCategories.length ? (
    <NavDropdown
      title={
        <Link
          href={`/integrations?category=${category.slug}`}
          as={`/integrations/${category.slug}`}
        >
          <span>{category.name}</span>
        </Link>
      }
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={handleClose}
      show={isOpen}
      id={category.id}
    >
      {category.subCategories.map(category => (
        <SubMenuLink
          category={category}
          key={category.id}
        />
      ))}
    </NavDropdown>
  ) : (
    <Nav.Link>
      <Link
        href={`/integrations?category=${category.slug}`}
        as={`/integrations/${category.slug}`}
      >
        <span>{category.name}</span>
      </Link>
    </Nav.Link>
  )
}
const MenuLinkContainer = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(
    () => setIsOpen(false),
    []
  )
  return useMemo(
    () =>
      MenuLink({
        category,
        handleOpen,
        handleClose,
        isOpen
      }),
    [category, handleClose, handleOpen, isOpen]
  )
}
const MenuContainer = props => {
  const [subCategories, setSubCategories] = useState([])
  useCategories()
  const categories = useSelector(selectCategoriesNested)
  return useMemo(
    () =>
      Menu({
        ...props,
        categories,
        subCategories,
        setSubCategories
      }),
    [props, categories, subCategories]
  )
}
export default MenuContainer
