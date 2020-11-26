/* eslint no-underscore-dangle: 0 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { navigate } from "gatsby"
import { useQuery, useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion"
import { Spring, animated } from "react-spring"
import { FacebookShareButton, TwitterShareButton } from "react-share"
import { Button } from "../ui-components"
import config from "../utils/config"
import { formatCurrency } from "../utils/helpers"
import { BlockContent, HTMLContent } from "./Content"
import Heading from "./Heading"

// const cartQuery = graphql`
//   query {
//     cart @client {
//       __typename
//       items
//       count
//     }
//   }
// `;

const Price = styled.div`
  span {
    font-weight: 700;
    font-size: 1.35rem;
    line-height: 1.8rem;
  }
`

const BuyBtn = styled.button`
  width: 100%;
  margin-top: 3rem;
`

const AccordionStyled = styled(Accordion)`
  .accordion__title {
    border-top: 1px solid #eee;
    padding: 0.9rem 0;
    cursor: pointer;
    :focus {
      outline: none;
    }
    h3 {
      text-transform: uppercase;
      font-weight: 700;
    }
  }
  .accordion__body {
    display: block;
    padding: 1rem 0;
  }
  .accordion__body--hidden {
    display: none;
  }
`

const Color = styled.div`
  input {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;

    &:checked + label {
      box-shadow: 0 0 0 1px ${config.primaryColor};
      border: 1px solid #202020;
    }
  }

  label {
    border: 1px solid transparent;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s;
    cursor: pointer;

    span {
      background: ${(props) => props.color};
      height: 22px;
      width: 22px;
      border-radius: 50%;
    }
  }
`

const ProductCode = styled.p`
  color: #b5b5b5 !important;
`

const ShareContainer = styled.div`
  padding: 0.9rem 0;
  border-top: 1px solid #eee;
  display: flex;
  text-align: center;
  justify-content: center;

  .share-icons {
    width: 110px;
    .level-item {
      margin-right: 1rem;
    }
  }
  .SocialMediaShareButton {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  svg {
    height: 18px;
    width: 18px;
    cursor: pointer;

    path {
      fill: inherit;
    }
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;

  button.add-to-cart {
    width: 100%;
    padding: 18px 38px;
  }

  .sub-panel {
    p {
      margin-bottom: 10px;
    }
  }

  h1 {
    text-align: left;
    letter-spacing: -0.5px;
    font-size: 1.8rem;
    line-height: 2rem;
    font-weight: 500;
    font-family: Karla, Arial;
  }
`

const cartQuery = gql`
  query CartItems {
    cartItems @client {
      id
    }
  }
`

const ProductInfo = ({ product, home }) => {
  const [isVisible, setIsVisible] = useState(false)
  const client = useApolloClient()
  const { data } = useQuery(cartQuery)
  const { cartItems } = data || {}
  // console.log('product', product);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 400)
  }, [])

  const metaUrl = `${config.siteUrl}/product/${product.slug.current}`
  const metaTitle = `Checkout ${product.title} at SejalSuits`

  const addToCart = () => {
    // console.log('cartItems', cartItems);
    const items = cartItems || []

    const itemData = {
      id: product._id,
      sku: product.sku,
      title: product.title,
      price: product.price,
      image: product.images[0].asset.fluid,
      quantity: 1,
      __typename: "CartItem",
    }
    // const itemData = {
    //   id: product._id,
    //   sku: product.variant.sku,
    //   title: product.title,
    //   price: product.variant.price,
    //   image: product.variant.featuredImage.asset.fluid.src,
    //   quantity: 1,
    //   __typename: "CartItem",
    // }
    items.push(itemData)

    client.writeData({ data: { cartItems: items } })

    setTimeout(() => navigate("/cart"), 600)
  }

  return (
    <Container>
      <h1 className="">{product.title}</h1>
      <Price className="has-text-weight-semibold">
        <span>{formatCurrency(product.price)}</span>
        {/* {formatCurrency(product.variant.discountPrice)}{' '}
        {product.variant.discountPrice < product.variant.price && (
          <span>{formatCurrency(product.variant.price)}</span>
        )} */}
      </Price>
      <div className="sub-panel">
        <p>Color:</p>
        <div className="flex">
          <Color color={product.color}>
            <input
              name="color"
              id="color1"
              type="radio"
              value={product.color}
              defaultChecked
            />
            <label htmlFor="color1">
              <span></span>
            </label>
          </Color>
        </div>
      </div>
      <div className="flex-column flex gap-30">
        <Button
          className="is-uppercase add-to-cart"
          onClick={() => addToCart()}
        >
          Add to cart
        </Button>
        <div className="flex-column flex gap-20">
          <p style={{ color: config.primaryColor }}>
            All prices include sales taxes.
          </p>
        </div>
      </div>
      <Spring native from={{ opacity: 0 }} to={{ opacity: isVisible ? 1 : 0 }}>
        {(stylesProps) => (
          <animated.div style={stylesProps}>
            <AccordionStyled>
              <AccordionItem expanded allowMultipleExpanded>
                <AccordionItemTitle>
                  <h3>Product Details</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  {product._rawBody && (
                    <>
                      {/* <BlockContent blocks={product._rawBody.en || []} /> */}
                      <HTMLContent
                        content={product.__rawBody.en}
                        className=""
                      />
                    </>
                  )}
                  {/* <HTMLContent
                    content={product.shortDetails.childMarkdownRemark.html}
                  /> */}
                  {/* <p>Color: {product.variant.color}</p> */}
                  {product.sku && (
                    <ProductCode>Product Code: {product.sku}</ProductCode>
                  )}
                  {/* <ProductCode>Product Code: {product.variant.sku}</ProductCode> */}
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem allowMultipleExpanded>
                <AccordionItemTitle>
                  <h3>Delivery & Returns</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  {home.productDeliveryInfo}
                  <br />
                  {home.productShippingReturns}
                </AccordionItemBody>
              </AccordionItem>
            </AccordionStyled>
            <ShareContainer>
              <div className="share-icons">
                <div className="level">
                  <div className="level-item">
                    <FacebookShareButton
                      url={metaUrl}
                      quote={metaTitle}
                      hashtag="#sejalsuits"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        className="icon icon-facebook"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="#444"
                          d="M18.56 31.36V17.28h4.48l.64-5.12h-5.12v-3.2c0-1.28.64-2.56 2.56-2.56h2.56V1.28H19.2c-3.84 0-7.04 2.56-7.04 7.04v3.84H7.68v5.12h4.48v14.08h6.4z"
                        ></path>
                      </svg>
                      Share
                    </FacebookShareButton>
                  </div>
                  <div className="level-item">
                    <TwitterShareButton
                      url={metaUrl}
                      title={metaTitle}
                      hashtags={["sejalsuits", "punjabisuits"]}
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        className="icon icon-twitter"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="#444"
                          d="M31.281 6.733q-1.304 1.924-3.13 3.26 0 .13.033.408t.033.408q0 2.543-.75 5.086t-2.282 4.858-3.635 4.108-5.053 2.869-6.341 1.076q-5.282 0-9.65-2.836.913.065 1.5.065 4.401 0 7.857-2.673-2.054-.033-3.668-1.255t-2.266-3.146q.554.13 1.206.13.88 0 1.663-.261-2.184-.456-3.619-2.184t-1.435-3.977v-.065q1.239.652 2.836.717-1.271-.848-2.021-2.233t-.75-2.983q0-1.63.815-3.195 2.38 2.967 5.754 4.678t7.319 1.907q-.228-.815-.228-1.434 0-2.608 1.858-4.45t4.532-1.842q1.304 0 2.51.522t2.054 1.467q2.152-.424 4.01-1.532-.685 2.217-2.771 3.488 1.989-.261 3.619-.978z"
                        ></path>
                      </svg>
                      Tweet
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            </ShareContainer>
          </animated.div>
        )}
      </Spring>
    </Container>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
}

export default ProductInfo
