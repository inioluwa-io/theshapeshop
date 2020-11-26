import React from "react"
import { animated } from "react-spring"
import styled from "styled-components"
import { Link } from "gatsby"
import config from "../utils/config"
import Img from "gatsby-image"

export type CollectionItemComponent = {
  item: any
  styles?: any
}

const Container = styled(animated.div)`
  .card {
    border: none;
    box-shadow: none;
    position: relative;

    &:hover {
      .gatsby-image-wrapper {
        transform: scale3d(1.05, 1.05, 1.05);
      }
      .image {
        &::after {
          background: rgba(0, 0, 0, 0.4);
        }
      }
      figcaption {
        // border: 1px solid #fff;
        // color: #fff;
        // background: ${config.primaryColor};
      }
    }

    .image {
      position: relative;
      overflow: hidden;

      // &::before{
      //   position: absolute;
      //   content: "";
      //   z-index: 3;
      //   width: calc(100% - 20px);
      //   height: calc(100% - 20px);
      //   border:1px solid #fff;
      //   top: 50%;
      //   left: 50%;
      //   transform: translate(-50%,-50%);
      // }

      &::after {
        position: absolute;
        content: "";
        z-index: 1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.25);
        transition: background 1s cubic-bezier(0.26, 0.54, 0.32, 1);
      }
    }

    figcaption {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
      // font-size: 15px;
      // line-height: 1rem;
      // font-size: 1rem;
      // letter-spacing: 2px;

      font-weight:500;      
      letter-spacing: 1px;
      line-height: 1rem;
      padding: 13px 35px;
      font-size: 13px;

      z-index: 1;
      padding: 9px 15px;
      white-space: normal;
      width: fit-content;
      max-width: 80%;
      background: rgba(255,255,255,1);
      text-align: center;
      color: #333;
      border: 1px solid #fff;
      transition: all .25s cubic-bezier(0.26, 0.54, 0.32, 1);
    }
  }
  // @media (max-width: 801px) {
  //   .card {
  //     width: 35vw;
  //   }
  // }
`
const Image: any = styled(Img)`
  object-fit: cover;
  transition: transform 1s cubic-bezier(0.26, 0.54, 0.32, 1);
  height: 35vw;
  width: 100%;

  @media (max-width: 801px) {
    height: 60vw;
  }
`

const CollectionItem: React.FC<CollectionItemComponent> = ({
  item,
  styles,
}) => {
  return (
    <Container style={styles} title={item.title}>
      <div className="card">
        <Link to={`/collections/${item.slug}`}>
          <figure className="image">
            <Image
              fluid={{
                src: item.fluid,
                aspectRatio: 2,
                srcSet: item.img,
                sizes: "300px",
              }}
            />
          </figure>
          <figcaption className="is-uppercase">{item.title}</figcaption>
        </Link>
      </div>
    </Container>
  )
}

export default CollectionItem
