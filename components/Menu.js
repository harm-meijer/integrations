import React, {
  useMemo,
  useState,
  useCallback
} from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectMenuCategoriesNested } from '../store/selectors'
import { useCategories } from '../hooks'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap'
import { collapsedMenu } from '../helpers'

function Menu({ categories = [], subCategoryLevel }) {
  return (
    <Nav className="ct-menu">
      {categories.map(category => (
        <MenuLinkContainer
          key={category.id}
          category={category}
          subCategoryLevel={subCategoryLevel}
        />
      ))}
    </Nav>
  )
}
function MenuLink({
  category,
  handleOpen,
  handleClose,
  MobileToggle,
  isOpen,
  level,
  subCategoryLevel
}) {
  return (category.subCategories.length && level < subCategoryLevel) ? (
    <NavDropdown
      title={
        <Link
          href={`/integrations?category=${category.slug}`}
          as={`/integrations/${category.slug}`}
        >
          <span className="link-content">
            {category.name}
            <MobileToggle />
          </span>
          {}
        </Link>
      }
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={() => handleClose()}
      show={isOpen}
      id={category.id}
      className={level && 'dropdown-submenu'}
    >
      {
            category.subCategories.map(category => (
            <MenuLinkContainer
              category={category}
              key={category.id}
              level={level + 1}
            />
          ))
      }

    </NavDropdown>
  ) : (
    <Nav.Link>
      <Link
        href={`/integrations?category=${category.slug}`}
        as={`/integrations/${category.slug}`}
      >
        <span className="link-content">
          {category.name}
        </span>
      </Link>
    </Nav.Link>
  )
}
const MenuLinkContainer = ({ category, level = 0, subCategoryLevel }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = useCallback(() => {
    //touch devices see a click as mouse enter, let the button handle
    //  open or this will open and the button will close the submenu
    if (!collapsedMenu()) {
      setIsOpen(true)
    }
  }, [])
  const handleClose = useCallback(() => {
    if (!collapsedMenu()) {
      setIsOpen(false)
    }
  }, [])
  const MobileToggle = useMemo(
    () => () => (
      <button
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          setIsOpen(open => !open)
        }}
      >
        {isOpen ? '-' : '+'}
      </button>
    ),
    [isOpen]
  )
  return useMemo(
    () =>
      MenuLink({
        category:
          category.slug === 'integrations'
            ? { ...category, slug: 'all' }
            : category,
        handleOpen,
        handleClose,
        MobileToggle,
        isOpen,
        level,
        subCategoryLevel
      }),
    [
      MobileToggle,
      category,
      handleClose,
      handleOpen,
      isOpen,
      level,
      subCategoryLevel
    ]
  )
}
const MenuContainer = props => {
  const [subCategories, setSubCategories] = useState([])
  useCategories()
  const categories = useSelector(selectMenuCategoriesNested)
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
