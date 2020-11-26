import React, { useState, useEffect } from "react"
import { animated } from "react-spring"
import { Trail } from "react-spring"
import Img from "gatsby-image"
import styled from "styled-components"
import { LinkButton } from "../ui-components"

const Container = styled.section`
  padding-left: 0;
  padding-right: 0;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;

    @media (max-width: 801px) {
      grid-template-columns: 1fr;
    }
  }
`

const PromotionItem: any = styled(animated.div)`
  .card {
    border: none;
    box-shadow: none;
    position: relative;

    .image {
      position: relative;
      overflow: hidden;

      &::after {
        position: absolute;
        content: "";
        z-index: 1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.25);
      }
    }

    figcaption {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
      height: fit-content;
      z-index: 9;
      width: 85%;
      transition: all 0.25s cubic-bezier(0.26, 0.54, 0.32, 1);

      .inner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-gap: 15px;
        padding: 20px;

        color: #fff;
        p {
          color: #fff !important;
        }

        h5 {
          font-size: 1rem;
          letter-spacing: 2px;
          font-weight: 500;
          text-align: center;
        }
        p {
          font-size: 1.8rem;
          line-height: 2.2rem;
          font-weight: 500;
          text-align: center;
        }
      }
    }
  }
  &:first-child {
    .image {
      &::before {
        position: absolute;
        content: "";
        z-index: 3;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        border: 2px solid #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &::after {
        background: rgba(0, 0, 0, 0.3);
      }
    }

    figcaption {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
      transition: all 0.25s cubic-bezier(0.26, 0.54, 0.32, 1);

      .inner-container {
        background: none;
      }
    }
  }
`
const Image: any = styled(Img)`
  object-fit: cover;
  transition: transform 1s cubic-bezier(0.26, 0.54, 0.32, 1);
  height: 45vw;
  width: 100%;
`
export type PromotedCollectionComponent = {
  promotions: any[]
}

const PromotedCollection: React.FC<PromotedCollectionComponent> = ({
  promotions,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 200)
  }, [])

  const keys = promotions.map((item, idx) => idx)

  return (
    <Container className="section small-page-width" {...props}>
      <div className="grid">
        <Trail
          native
          from={{ opacity: 0 }}
          to={{ opacity: isOpen ? 1 : 0.25 }}
          keys={keys}
        >
          {promotions.slice(0, 2).map((item, idx) => (styles) => (
            <PromotionItem key={idx} styles={styles}>
              <div className="card">
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
                <figcaption>
                  <div className="inner-container">
                    <h5 className="is-uppercase">{item.title}</h5>
                    <p>{item.description}</p>
                    <LinkButton
                      to={`/product/${item.slug}`}
                      className="is-uppercase"
                      color={idx === 1 ? "primary" : "secondary"}
                    >
                      Shop Now
                    </LinkButton>
                  </div>
                </figcaption>
              </div>
            </PromotionItem>
          ))}
        </Trail>
      </div>
    </Container>
  )
}

export default PromotedCollection
