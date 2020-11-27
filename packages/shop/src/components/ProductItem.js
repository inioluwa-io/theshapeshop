import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { animated } from "react-spring"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { formatCurrency } from "../utils/helpers"

const Container = styled(animated.div)`
  .card {
    border: none;
    box-shadow: none;
    .image.is-4by5 {
      padding-top: 0;
    }
    .media-content {
      display: grid;
      grid-gap: 10px;

      .name {
      }
      .price {
        font-weight: 600;
        font-size: 18px;
        font-size: 1.35rem;
        line-height: 1.8rem;
        font-weight: 500;
      }
    }
    .card-content {
      padding-left: 0;
      padding-right: 0;
      padding-top: 0.8rem;
      position: relative;
      a {
        color: #363636;
      }
      .price-container {
        width: 150px;
        position: absolute;
        right: 0;
        top: 0.5rem;
      }
      .old-price {
        text-decoration: line-through;
      }
    }
  }
`

const Image = styled(Img)`
  object-fit: cover;
  height: 29vw;
  width: 100%;

  @media (max-width: 801px) {
    height: 40vw;
  }

  @media (max-width: 550px) {
    height: 60vw;
  }
`

const ProductItem = ({ item, styles }) => (
  <Container className="" style={styles} title={item.title}>
    <div className="card">
      {item.otherVariants && (
        <div className="card-image">
          <Link to={`/product/${item.slug.current}`}>
            <figure className="image is-4by5">
              <Image fluid={item.otherVariants[0].featuredImage.asset.fluid} />
              {/* <Image
                sizes={item.variant.featuredImage.asset.fluid.sizes}
                alt={item.variant.featuredImage.asset.fluid.title}
                title={item.variant.featuredImage.asset.fluid.title}
                backgroundColor="#f1f1f1"
              /> */}
            </figure>
          </Link>
        </div>
      )}
      {/*       
      {item.variant.featuredImage && (
        <div className="card-image">
          <Link to={`/product/${item.slug.current}`}>
            <figure className="image is-4by5">
              <Image fluid={item.variant.featuredImage.asset.fluid} />
              
            </figure>   
          </Link>
        </div>
      )} */}
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="name" style={{ maxWidth: "88%" }}>
              <Link to={`/product/${item.slug.current}`}>{item.title}</Link>
            </p>
            {item.otherVariants[0] && (
              <p className="price">
                {formatCurrency(item.otherVariants[0].pricing[0].price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </Container>
)

ProductItem.propTypes = {
  styles: PropTypes.object.isRequired,
}

export default ProductItem
