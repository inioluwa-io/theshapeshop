import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import SocialIcons from "./SocialIcons"
import config from "../utils/config"
import { theme } from "../utils/theme"
import SubscribeForm from "./SubscribeForm"
import ScrollButton from "./ScrollButton"

const Container = styled.footer`
  position: relative;
  padding-top: 5.5rem;
  padding-bottom: 5.5rem;
  margin-top: 5rem;
  border-top: 1px solid #eee;

  .top-head {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    grid-row-gap: 4rem;

    h5 {
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 30px;
    }
    li:not(:last-child) {
      margin-bottom: 10px;
      font-size: 15px;
    }

    li a {
      transition: color 0.25s;
      color: ${theme.textColor};

      &:hover {
        color: ${config.primaryColor} !important;
      }
    }

    @media (max-width: 991px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`

const Heading = styled.p`
  margin-bottom: 1rem;
`

const Bottom = styled.div``

const NavItems = [
  { id: 1, name: "About Us", url: "/about" },
  { id: 3, name: "Contact Us", url: "/contact-us" },
  { id: 4, name: "Privacy Policy", url: "/page/privacy-policy" },
]
const collectionItems = [
  { img: "/images/wear3.jpg", title: "Full body shapers", slug: "" },
  { img: "/images/wear1.jpg", title: "Buttlifters", slug: "" },
  { img: "/images/wear5.jpg", title: "Waist trainers", slug: "" },
]

const Footer = ({ home, collections = [] }) => (
  <Container className="section page-width">
    <div className="top-head">
      <div>
        <h5>Collections</h5>
        <ul>
          {collectionItems.map((item, idx) => (
            <li key={idx}>
              <Link to={`collections/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Quick Links</h5>
        <ul>
          {NavItems.map((item) => (
            <li key={item.id}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <h5>Connect with us</h5>
        {/* <SubscribeForm /> */}
        <SocialIcons data={home} />
      </div>
      <div>
        <h5>Payment methods</h5>
        <img
          src="/images/payment-strip.png"
          style={{ height: "55px" }}
          alt="payments cards"
        />
      </div>
    </div>
    <ScrollButton scrollStepInPx="50" delayInMs="13.66" />
  </Container>
)

Footer.defaultProps = {
  home: {},
}

Footer.propTypes = {
  home: PropTypes.object,
}

export default Footer
