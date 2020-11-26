import React, { useState } from "react"
import styled from "styled-components"
import { Spring, animated } from "react-spring"
import { Link } from "gatsby"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import config from "../utils/config"
import SocialIcons from "./SocialIcons"
import { theme } from "../utils/theme"
import { Dropdown, ListDropdown } from "../ui-components"

const cartQuery = gql`
  query CartItems {
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
  position: relative;
  img {
    width: 100px;
    margin-top: 1rem;
    margin-left: 1rem;
  }
  .menu-trigger {
    position: absolute;
    top: 4rem;
    right: 1rem;
    font-size: 1.4rem;
    color: #4a4a4a;
  }
`

const MobileMenu: any = styled(animated.div)`
  && {
    position: fixed;
    left: 0;
    top: 161px;
    height: 100%;
    width: 100%;
    background-color: #2f2f2f;
    z-index: 2;
    padding: 2rem;
    overflow: hidden;
    a {
      color: #fff;
    }
    .social {
      margin-left: 1.2rem;
      margin-top: 2rem;
      > section {
        width: 240px;
        .level-item {
          float: left;
        }
      }
    }
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
  // background: #333;
  z-index: 99;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  // transform: translateY(100%);

  .item {
    // color: ${theme.darkAccent} !important;
    color: #fff !important;
    text-transform: uppercase;
    font-weight: 500;
    font-weight: 600;
    font-size: 11px;
  }
`

const CartMobile = styled.div`
  width: 8rem;
  float: right;
  margin-top: 6rem;
  margin-right: 0.3rem;
  .count {
    left: 16px;
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
  const [mobileMenuActive, setMobileMenuActive] = useState(false)
  const { data } = useQuery(cartQuery)
  const cartItems = data ? data.cartItems || [] : []

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
        {/* {cartItems.length > 0 && (
          <div className="count">{cartItems.length}</div>
        )} */}
      </Link>
    </Cart>
  )

  const toggleMobileMenu = () => {
    // if (mobileMenuActive) {
    //   $('html').removeClass('disable-scroll');
    // } else {
    //   $('html').addClass('disable-scroll');
    // }
    setMobileMenuActive(!mobileMenuActive)
  }

  return (
    <div className="container" style={{ zIndex: 11 }}>
      <Container
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
                      <Dropdown list={collectionItems}>
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
      <ContainerMobile className="is-hidden-tablet">
        <div className="columns is-mobile">
          <div className="column">
            <Link to="/">
              <img src={config.logo} alt={`${config.siteName} logo`} />
            </Link>
          </div>
          <div className="column">
            {mobileMenuActive ? (
              <span>
                <a onClick={toggleMobileMenu}>
                  <i className="fas fa-times menu-trigger" />
                </a>
              </span>
            ) : (
              <a onClick={toggleMobileMenu}>
                <i className="fas fa-bars menu-trigger" />
              </a>
            )}
            <CartMobile>{cart}</CartMobile>
          </div>
        </div>
        <Spring
          native
          from={{ height: 0, opacity: 0, paddingTop: "-64px" }}
          to={{
            height: mobileMenuActive ? 800 : 0,
            opacity: mobileMenuActive ? 1 : 0,
            paddingTop: mobileMenuActive ? 0 : -64,
          }}
        >
          {(styles) => (
            <MobileMenu style={styles}>
              <aside className="menu">
                <ul className="menu-list is-uppercase has-text-weight-bold is-size-4">
                  {NavItems.map((item) => (
                    <li key={item.id} onClick={toggleMobileMenu}>
                      <Link to={item.url}>{item.name}</Link>
                    </li>
                  ))}
                  <li className="social">
                    <SocialIcons data={home} inverted />
                  </li>
                </ul>
              </aside>
            </MobileMenu>
          )}
        </Spring>
      </ContainerMobile>
    </div>
  )
}

export default Header
