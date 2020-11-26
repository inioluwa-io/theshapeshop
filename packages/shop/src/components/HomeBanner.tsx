import React from "react"
import { useEffect } from "react"
import { useCallback } from "react"
import { useRef } from "react"
import styled from "styled-components"
import { LinkButton } from "../ui-components"

import config from "../utils/config"

const ContainerImage = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  height: 110vh;
  position: relative;
  background: #101010;

  .img-container {
    transition: transform 0.05s ease;
    will-change: transform;
  }

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .img {
    min-width: 100%;
    min-height: 150vh;
    height: auto;
    position: relative;
    background-size: cover;
    background-attachment: fixed;
    background-position: top center;
    animation: zoomOut 2.55s cubic-bezier(0.26, 0.54, 0.32, 1) 0s forwards;
  }

  @keyframes zoomOut {
    from {
      transform: scale3d(1.1, 1.1, 1.1);
    }
    to {
      transform: scale3d(1, 1, 1);
    }
  }

  .hero {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60rem;
    text-align: center;
    grid-gap: 15px;

    p {
      color: #fff !important;
      font-size: 1.35rem;
    }

    h2 {
      font-size: 5rem;
      color: #fff !important;
      font-family: serif;
      text-transform: uppercase;
      font-family: Karla, Arial;
      // font-family: "Century Gothic";
      // font-weight: 600;
    }
  }
`

const StripMobile = styled.div`
  padding: 0.3rem 0;
  background-color: #100b0b;
  width: 100%;
  opacity: 0.9;
`

const HomeBanner = ({ data }) => {
  const refs = useRef<HTMLDivElement>()
  const parallaxEffect = useCallback(() => {
    const DOMNode = refs.current
    if (DOMNode) {
      const offset = DOMNode.getBoundingClientRect().top / 7
      DOMNode.style.transform = `translate3d(0px, ${offset}px, 0px)`
    }
  }, [refs])

  // useEffect(() => {
  //   parallaxEffect()
  //   window.addEventListener("scroll", parallaxEffect, { passive: true })
  //   return () => {
  //     window.removeEventListener("scroll", parallaxEffect)
  //   }
  // }, [parallaxEffect])
  return (
    <React.Fragment>
      <ContainerImage className="">
        <div className="img-container" ref={refs}>
          <div
            className="img"
            style={{ backgroundImage: "url(" + config.homeBannerImage + ")" }}
          ></div>
        </div>
        {/* <img src={config.homeBannerImage} alt="home banner" /> */}
        <div className="hero page-width">
          <h2>Fitter, healthier, happier.</h2>
          <p>Available in Nigeria.</p>
          <LinkButton to="">Shop Now</LinkButton>
        </div>
      </ContainerImage>
      <StripMobile className="is-hidden-tablet">
        <p className="is-size-6	is-uppercase has-text-white has-text-centered has-text-weight-semibold">
          {data?.homeHeroSubTitle}
        </p>
      </StripMobile>
    </React.Fragment>
  )
}

export default HomeBanner
