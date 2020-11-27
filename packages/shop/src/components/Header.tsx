import React, { useEffect, useState, useRef, useCallback } from "react"
import styled from "styled-components"
import { Spring, animated } from "react-spring"
import { Link } from "gatsby"
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion"
import gql from "graphql-tag"

import config from "../utils/config"
import SocialIcons from "./SocialIcons"
import { theme } from "../utils/theme"
import { graphql, useStaticQuery } from "gatsby"
import { Dropdown, ListDropdown } from "../ui-components"

const cartQuery = gql`
  query HeaderQuery {
    cartItems @client {
      id
    }
  }
`

const Container: any = styled.div`
  .min-my-navbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    .column {
      padding: 0.2rem 0;
    }
  }

  a {
    color: #4a4a4a;
  }
  header {
    height: 100px;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  .my-navbar {
    flex: 1;
    display: grid;
    grid-template-columns: 6rem 1fr 6rem;
  }
  .my-my-navbar-menu {
    text-align: center;
    display: block;

    a {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      padding: 6px 4px;
      font-size: 14px;
      font-weight: 400;
      transition: color 300ms cubic-bezier(0.2, 0.06, 0.05, 0.95);

      &:not(:last-child) {
        margin-right: 20px;
      }

      &.my-navbar-text {
        letter-spacing: 1px;
        color: ${theme.lightShades};
      }

      &.my-navbar-text:hover,
      &.my-navbar-text.active {
        color: ${theme.primaryColor};
      }
    }
  }
  img.logo {
    max-width: 180px;
  }
`

const ContainerMobile = styled.div`
  .min-my-navbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    .column {
      padding: 0.2rem 0;
    }
  }

  a {
    color: #4a4a4a;
  }
  .logo-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header {
    height: 70px;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  .my-navbar {
    flex: 1;
    display: grid;
    grid-template-columns: 4rem 1fr 4rem;
  }
  .my-my-navbar-menu {
    text-align: center;
    display: block;

    a {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      padding: 6px 4px;
      font-size: 14px;
      font-weight: 400;
      transition: color 300ms cubic-bezier(0.2, 0.06, 0.05, 0.95);

      &:not(:last-child) {
        margin-right: 20px;
      }

      &.my-navbar-text {
        letter-spacing: 1px;
        color: ${theme.lightShades};
      }

      &.my-navbar-text:hover,
      &.my-navbar-text.active {
        color: ${theme.primaryColor};
      }
    }
  }
  img.logo {
    max-width: 180px;
  }
  .menu-trigger {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      height: 30px;
      width: 30px;
      fill: #303030;

      path {
        fill: none !important;
        stroke-width: 2px;
        stroke: ${theme.darkShades} !important;
        stroke-linecap: butt;
        stroke-linejoin: miter;
      }
    }
  }
`

const MobileMenu: any = styled(animated.div)`
  && {
    position: fixed;
    left: 0;
    top: 0px;
    height: 100%;
    width: 300px;
    transform: translateX(-100%);
    background-color: #fff;
    z-index: 2;
    overflow: hidden;
    border-right: 1px solid #eee;
    background: #fff;

    .menu-header {
      border-bottom: 1px solid #eee;
      height: 70px;
      margin: 0 15px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 10px;
      }

      .icon {
        height: 30px;
        width: 30px;
        fill: #303030;

        path {
          fill: none !important;
          stroke-width: 2px;
          stroke: ${theme.darkShades} !important;
          stroke-linecap: butt;
          stroke-linejoin: miter;
        }
      }
    }

    .menu {
      padding: 0 15px;
    }

    .social {
      margin-top: 20px;
    }
    a:hover {
      background: transparent;
      color: ${theme.primaryColor};
    }
  }
`
const AccordionStyled = styled(Accordion)`
  .accordion__item:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  .accordion__title {
    padding: 1rem 0;
    cursor: pointer;
    :focus {
      outline: none;
    }
    h3,
    a {
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1px;
    }
  }
  .accordion__body {
    display: block;
  }
  .accordion__body--hidden {
    display: none;
  }
`

const Cart = styled.div`
  font-size: 1.2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 18px;
  a,
  .link {
    color: #4a4a4a !important;
    display: flex;
    position: relative;
  }
  .icon {
    width: 28px;
    height: 28px;
    path {
      fill: none !important;
      stroke-width: 2;
      stroke: #000;
      stroke-linecap: butt;
      stroke-linejoin: miter;
    }
  }
  span {
    font-weight: 700;
    padding: 0 0.1rem 0 0.5rem;
  }
  .fallback-text {
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    position: absolute;
    height: 1px;
    width: 1px;
  }
  .count {
    background-color: ${config.primaryColor};
    color: #fff;
    font-size: 12px;
    width: 22px;
    height: 22px;
    font-weight: 400;
    text-align: center;
    border-radius: 20px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -5px;
    right: -5px;
    border: 1px solid #fff;
  }
`
const AnnouncementContainer = styled.div`
  background-color: ${theme.mainBrandColor};
  // background-color: ${theme.lightShades};
  z-index: 99;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  .item {
    // color: ${theme.darkAccent} !important;
    color: #fff !important;
    text-transform: uppercase;
    font-weight: 500;
    font-weight: 600;
    font-size: 11px;
  }
`

const MobileUnderlay: any = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #eeeeeeaa;
  transition: opacity 0.25s ease;

  @media (min-width: 768px) {
    display: none;
  }
`

const NavItems = [
  { id: 1, name: "Collections", url: "/collections/all" },
  { id: 3, name: "Blog", url: "/blog" },
  { id: 4, name: "About", url: "/about" },
  { id: 5, name: "Contact", url: "/contact" },
]

const collectionItems = [
  { img: "/images/wear3.jpg", title: "Full body shapers" },
  { img: "/images/wear1.jpg", title: "Buttlifters" },
  { img: "/images/wear5.jpg", title: "Waist trainers" },
]

const Announcement: React.FC<{ slide: string[] }> = ({ slide }) => (
  <AnnouncementContainer>
    {slide.map((item, idx: number) => (
      <p className="item" key={idx}>
        {item}
      </p>
    ))}
  </AnnouncementContainer>
)

const Header: React.FC<any> = ({ home }) => {
  const data: any = useStaticQuery(graphql`
    query HeaderQuery {
      allSanityCategory {
        edges {
          node {
            _id
            slug {
              current
            }
            title
            image {
              asset {
                fluid(maxWidth: 250) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
      }
    }
  `)
  const refs = useRef<HTMLDivElement>()

  const setBarToFixed = useCallback(
    () => {
      const DOMNode = refs.current
      if (DOMNode) {
        const container = DOMNode.querySelector(
          "#main-head-con.is-hidden-mobile"
        ) as HTMLDivElement

        if (window.scrollY > 50) {
          DOMNode.style.position = "sticky"
          DOMNode.style.width = "100%"
          DOMNode.style.top = "0px"
          DOMNode.style.left = "0"
          container.style.transform = "translateY(-50px)"
        } else {
          DOMNode.style.position = "relative"
          DOMNode.style.top = "auto"
          DOMNode.style.left = "auto"
          container.style.transform = "translateY(0px)"
        }
      }
    },
    [refs]
  )

  useEffect(() => {
    window.addEventListener("scroll", setBarToFixed, { passive: true })
    return () => {
      window.removeEventListener("scroll", setBarToFixed)
    }
  }, [setBarToFixed])

  const [mobileMenuActive, setMobileMenuActive] = useState(false)

  const { allSanityCategory } = data

  const cart = (
    <Cart>
      <ListDropdown list={[{ title: "Sign in" }, { title: "Register" }]}>
        <div className="link">
          <svg
            aria-hidden="true"
            focusable="false"
            role="presentation"
            className="icon icon-user"
            viewBox="0 0 64 64"
          >
            <path d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z"></path>
          </svg>
          <span className="fallback-text ">Log in</span>
        </div>
      </ListDropdown>
      <Link to="/cart">
        <svg
          aria-hidden="true"
          focusable="false"
          role="presentation"
          className="icon icon-bag"
          viewBox="0 0 64 64"
        >
          <g fill="none" stroke="#000" strokeWidth="2">
            <path d="M25 26c0-15.79 3.57-20 8-20s8 4.21 8 20"></path>
            <path d="M14.74 18h36.51l3.59 36.73h-43.7z"></path>
          </g>
        </svg>
        {2 > 0 && <div className="count">2</div>}
      </Link>
    </Cart>
  )

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive)
  }

  return (
    <div className="container" style={{ zIndex: 11 }} ref={refs}>
      <Container
        id="main-head-con"
        className="is-hidden-mobile"
        mainBrandColor={theme.mainBrandColor}
      >
        <Announcement slide={["Everything under N6,000"]} />
        <header>
          <nav
            className="my-navbar page-width"
            role="navigation"
            aria-label="main navigation"
          >
            <div></div>
            <div className="my-my-navbar-menu">
              {NavItems.map((item, idx: number) => {
                if (idx === Math.floor(NavItems.length / 2)) {
                  return (
                    <React.Fragment key={item.id}>
                      <Link to="/">
                        <img
                          src={config.logo}
                          className="logo"
                          alt={`${config.siteName} logo`}
                        />
                      </Link>
                      <Link
                        className="my-navbar-text  is-uppercase"
                        to={item.url}
                        activeClassName="active"
                      >
                        {item.name}
                      </Link>
                    </React.Fragment>
                  )
                }
                return (
                  <React.Fragment key={item.id}>
                    {item.name === "Collections" ? (
                      <Dropdown list={allSanityCategory.edges}>
                        <Link
                          to={item.url}
                          className="my-navbar-text is-uppercase"
                          activeClassName="active"
                        >
                          {item.name}
                        </Link>
                      </Dropdown>
                    ) : (
                      <Link
                        to={item.url}
                        key={item.id}
                        className="my-navbar-text is-uppercase"
                        activeClassName="active"
                      >
                        {item.name}
                      </Link>
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {cart}
          </nav>
        </header>
      </Container>

      {/* Mobile */}
      <ContainerMobile className="is-hidden-tablet">
        <header>
          <nav
            className="my-navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="menu-trigger">
              <button onClick={toggleMobileMenu}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="presentation"
                  className="icon icon-hamburger"
                  viewBox="0 0 64 64"
                >
                  <path d="M7 15h51M7 32h43M7 49h51"></path>
                </svg>
              </button>
            </div>
            <div className="logo-link">
              <Link to="/">
                <img
                  src={config.logo}
                  className="logo"
                  alt={`${config.siteName} logo`}
                />
              </Link>
            </div>
            <Cart>
              <Link to="/cart">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="presentation"
                  className="icon icon-bag"
                  viewBox="0 0 64 64"
                >
                  <g fill="none" stroke="#000" strokeWidth="2">
                    <path d="M25 26c0-15.79 3.57-20 8-20s8 4.21 8 20"></path>
                    <path d="M14.74 18h36.51l3.59 36.73h-43.7z"></path>
                  </g>
                </svg>
                {2 > 0 && <div className="count">2</div>}
                {/* {cartItems.length > 0 && (
          <div className="count">{cartItems.length}</div>
        )} */}
              </Link>
            </Cart>
          </nav>
        </header>

        <Spring
          native
          from={{
            transform: "translateX(-100%)",
            opacity: 0,
          }}
          to={{
            transform: mobileMenuActive
              ? "translateX(0%)"
              : "translateX(-100%)",
            opacity: mobileMenuActive ? 1 : 0,
            visibility: mobileMenuActive ? "visible" : "hidden",
          }}
        >
          {(styles) => (
            <>
              <MobileUnderlay
                style={{
                  visibility: mobileMenuActive ? "visible" : "hidden",
                  opacity: mobileMenuActive ? 1 : 0,
                }}
              />
              <MobileMenu style={styles}>
                <div className="menu-header">
                  <button onClick={toggleMobileMenu}>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-close"
                      viewBox="0 0 64 64"
                    >
                      <path d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path>
                    </svg>{" "}
                  </button>
                </div>
                <aside className="menu">
                  <ul>
                    <AccordionStyled accordion={false} className="menu-list">
                      {NavItems.map((item) => (
                        <AccordionItem key={item.id}>
                          <AccordionItemTitle>
                            {item.name.toLowerCase() === "collections" ? (
                              <h3>{item.name}</h3>
                            ) : (
                              <Link to={item.url} activeClassName="active">
                                {item.name}
                              </Link>
                            )}
                          </AccordionItemTitle>
                          {item.name.toLowerCase() === "collections" && (
                            <AccordionItemBody>
                              {allSanityCategory.edges.map(({ node }) => (
                                <Link
                                  key={node._id}
                                  to={node.slug.current}
                                  className="my-navbar-text is-uppercase"
                                  activeClassName="active"
                                >
                                  {node.title}
                                </Link>
                              ))}
                            </AccordionItemBody>
                          )}
                        </AccordionItem>
                      ))}
                    </AccordionStyled>

                    {/* {NavItems.map((item) => (
                      <li key={item.id} onClick={toggleMobileMenu}>
                        <Link to={item.url}>{item.name}</Link>
                      </li>
                    ))} */}
                    <div className="social">
                      <SocialIcons data={home} inverted />
                    </div>
                  </ul>
                </aside>
              </MobileMenu>
            </>
          )}
        </Spring>
      </ContainerMobile>
    </div>
  )
}

export default Header
