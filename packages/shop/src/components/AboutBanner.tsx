import React, { useRef }  from "react"
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

const AboutBanner = ({ data }) => {
  const refs = useRef<HTMLDivElement>()
  return (
    <React.Fragment>
      <ContainerImage className="">
        <div className="img-container" ref={refs}>
          <div
            className="img"
            style={{ backgroundImage: "url(" + config.aboutBannerImage + ")" }}
          ></div>
        </div>
        {/* <img src={config.aboutBannerImage} alt="about banner" /> */}
        <div className="hero page-width">
          <h2>{data?.aboutHeroTitle}</h2>
          <p>{data?.aboutHeroSubTitle}</p>
        </div>
      </ContainerImage>
    </React.Fragment>
  )
}

export default AboutBanner
