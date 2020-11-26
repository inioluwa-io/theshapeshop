import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { Link } from "gatsby"

type DropdownCopmonent = {
  list: any[]
}

const DropdownContainer: any = styled.div`
  display: inline-block;

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
  left: 0;
  margin: 0;
  z-index: 991;
  display: block;
  visibility: hidden;
  background-color: #ffffff;
  min-width: 100%;
  padding: 10px 0 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.09);
  margin-top: 4px;
  padding: 39px 0;
  line-height: 1.8;
  transform: none;
  opacity: 0;
  transition: all 300ms cubic-bezier(0.2, 0.06, 0.05, 0.95);
  transition-delay: 0.2s;

  .inner-container {
    margin: 0 10.5vw;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .img {
      .gatsby-image-wrapper {
        height: 110px;
      }
    }

    .each-menu {
      text-align: left;
      grid-gap: 20px;
      padding: 0;
      display: grid;
      margin: 0;
      grid-template-columns: 1fr;

      h5 {
        letter-spacing: 1px;
        font-size: 15px;
        line-height: 1rem;
      }
      span {
        padding: 0;
      }
    }
  }
`

const Dropdown: React.FC<DropdownCopmonent> = ({
  list,
  children,
  ...props
}) => {
  return (
    <DropdownContainer {...props}>
      {children}
      <MegaMenu className="mega-menu">
        <div className="inner-container">
          {list.map((item, idx: number) => (
            <Link
              to={item?.url || "/"}
              title={item.title}
              className="each-menu"
              key={idx}
            >
              <div className="img">
                <Image
                  fluid={{
                    src: item.img,
                    aspectRatio: 2,
                    srcSet: item.img,
                    sizes: "300px",
                  }}
                />
              </div>
              <h5 className="is-uppercase">{item.title}</h5>

              <span>View all</span>
            </Link>
          ))}
        </div>
      </MegaMenu>
    </DropdownContainer>
  )
}

export default Dropdown
