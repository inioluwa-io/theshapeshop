import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { theme } from "../../utils/theme"

type ListDropdownCopmonent = {
  list: any[]
}

const ListDropdownContainer: any = styled.div`
  display: inline-block;
  cursor: pointer;

  &:hover {
    .mega-menu {
      transition-delay: 0s;
      visibility: visible;
      opacity: 1;
    }
  }
`
const MegaMenu: any = styled.div`
  position: absolute;
  right: 0;
  margin: 0;
  z-index: 991;
  display: block;
  visibility: hidden;
  min-width: 12rem;
  background-color: #ffffff;
  padding: 10px 0 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.09);
  margin-top: 4px;
  padding: 0px 10px;
  line-height: 1.8;
  transform: none;
  opacity: 0;
  transition: all 300ms cubic-bezier(0.2, 0.06, 0.05, 0.95);
  transition-delay: 0.2s;

  .inner-container {
    // margin: 0 10.5vw;
    .each-menu {
      padding: 10px 5px;
      span {
        padding: 0;
        font-size: 15px;
        font-weight: 400;
        transition: all 300ms cubic-bezier(0.2, 0.06, 0.05, 0.95);
      }
      &:hover span {
        color: ${theme.mainBrandColor};
      }

      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
    }
  }
`

const ListDropdown: React.FC<ListDropdownCopmonent> = ({
  list,
  children,
  ...props
}) => {
  return (
    <ListDropdownContainer {...props}>
      {children}
      <MegaMenu className="mega-menu">
        <div className="inner-container">
          {list.map((item, idx: number) => (
            <Link to={"/" + item?.slug || "/"} className="each-menu" key={idx}>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </MegaMenu>
    </ListDropdownContainer>
  )
}

export default ListDropdown
