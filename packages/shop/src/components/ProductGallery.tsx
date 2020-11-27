import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import { isUndefined } from "lodash"
import { Spring, animated } from "react-spring"
import styled from "styled-components"
import { theme } from "../utils/theme"
import mediumZoom from "medium-zoom"

const Container = styled.div`
  position: sticky;
  top: 20px;
  grid-gap: 20px;
  display: grid;
  grid-template-columns: 4.75rem 1fr;

  .image-gallery-thumbnails-wrapper {
    margin-top: 10px;
  }
  .image-gallery-thumbnail-inner img {
    width: auto;
    height: 70px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    top: unset;
  }
`

const Thumbnail = styled.div`
  display: block;

  button {
    &:focus,
    &.active {
      outline: 2px solid ${theme.lightShades};
    }
    cursor: pointer;
    width: 100%;
    height: 6.4rem;

    &:not(:last-child) {
      margin-bottom: 18px;
    }
  }

  @media (max-width: 768px) {
    button {
      margin-bottom: 0;
      width: 12vw;
      height: 19vw;

      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
`
const ThumbnailImage: any = styled(Img)`
  object-fit: cover;
  width: 100%;
  height: 100%;

  // @media (max-width: 801px) {
  //   height: 40vw;
  // }

  // @media (max-width: 550px) {
  //   height: 60vw;
  // }
`
const Image: any = styled(Img)`
  object-fit: cover;
  height: 53vw;
  width: 100%;
  background: #fff;
  transition: background 0.25s;

  // @media (max-width: 801px) {
  //   height: 40vw;
  // }

  // @media (max-width: 550px) {
  //   height: 60vw;
  // }

  @media (max-width: 768px) {
    height: 90vw;
  }
`

const ProductGallery: React.FC<any> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const images = product?.otherVariants[0].images

  const handleThumbnailClick = (idx: number): void => {
    setSelectedImageIndex(idx)
  }

  useEffect(() => {
    const zoom = mediumZoom(document.querySelectorAll(".zoomable img"), {
      margin: 0,
      background: "#fff",
      scrollOffset: 20,
      // container: "#zoom-container",
      // template: "#zoom-template",
    })
  }, [selectedImageIndex])

  return (
    <Container>
      <Thumbnail>
        {images.map((image, idx: number) => (
          <button
            key={idx}
            onClick={() => {
              handleThumbnailClick(idx)
            }}
            className={selectedImageIndex === idx ? "active" : ""}
          >
            <ThumbnailImage fluid={image.asset.fluid} />
          </button>
        ))}
      </Thumbnail>
      <Image
        data-zoomable
        className="zoomable"
        fluid={images[selectedImageIndex].asset.fluid}
      />
    </Container>
  )
}

export default ProductGallery
