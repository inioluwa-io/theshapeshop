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
  transition: all 0.25s;

  // @media (max-width: 801px) {
  //   height: 40vw;
  // }

  // @media (max-width: 550px) {
  //   height: 60vw;
  // }
`

const ProductGallery: React.FC<any> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const images = product?.images
  let zoom

  const handleThumbnailClick = (idx: number): void => {
    setSelectedImageIndex(idx)
  }

  useEffect(() => {
    zoom = mediumZoom(document.querySelectorAll(".zoomable img"), {
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
            <ThumbnailImage
              fluid={{
                src: image.asset.fluid,
                aspectRatio: 2,
                srcSet: image.asset.fluid,
                sizes: "300px",
              }}
            />
          </button>
        ))}
      </Thumbnail>
      <Image
        data-zoomable
        className="zoomable"
        fluid={{
          src: images[selectedImageIndex].asset.fluid,
          aspectRatio: 2,
          srcSet: images[selectedImageIndex].asset.fluid,
          sizes: "300px",
        }}
      />
    </Container>
  )
}

export default ProductGallery
