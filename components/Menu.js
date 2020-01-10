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
function MenuLink({
  category,
  handleOpen,
  handleClose,
  isOpen,
  level
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
      className={level && 'dropdown-submenu'}
    >
      {category.subCategories.map(category => (
        <MenuLinkContainer
          category={category}
          key={category.id}
          level={level + 1}
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
const MenuLinkContainer = ({ category, level = 0 }) => {
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
        isOpen,
        level
      }),
    [category, handleClose, handleOpen, isOpen, level]
  )
}
const MenuContainer = props => {
  const [subCategories, setSubCategories] = useState([])
  useCategories()
  const categories = useSelector(selectCategoriesNested)
  const newProps = useMemo(
    () => ({
      ...props,
      categories,
      subCategories,
      setSubCategories
    }),
    [props, categories, subCategories]
  )
  return Menu(newProps)
}
export default MenuContainer
