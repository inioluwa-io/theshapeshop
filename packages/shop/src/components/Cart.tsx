import React from "react"
import styled from "styled-components"
import { Spring, animated } from "react-spring"
import { graphql, useStaticQuery } from "gatsby"
import { theme } from "../utils/theme"
import CartItems from "./CartItems"

const CartContainer: any = styled(animated.div)`
  && {
    position: fixed;
    right: 0;
    top: 0px;
    height: 100%;
    width: 380px;
    transform: translateX(100%);
    background-color: #fff;
    z-index: 9999;
    overflow: hidden;
    border-left: 1px solid #eee;
    background: #fff;

    .menu-header {
      border-bottom: 1px solid #eee;
      height: 80px;
      margin: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h5 {
        font-size: 1.8rem;
        line-height: 2.2rem;
        font-weight: 500;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 10px;
      }

      .icon {
        height: 30px;
        width: 30px;
        fill: #303030;

        path {
          fill: none !important;
          stroke-width: 2px;
          stroke: ${theme.darkShades} !important;
          stroke-linecap: butt;
          stroke-linejoin: miter;
        }
      }
    }
  }
  .footer {
    background: none;
    padding: 20px;
    position: absolute;
    bottom: 0;
    z-index: 99;
    border-top: 1px solid #eee;

    .cart-total {
      display: flex;
      justify-content: space-between;
    }

    .cart_price_details {
      margin-bottom: 20px;
    }

    a {
      width: 100%;
      display: block;
    }
  }
`

type CartComponent = {
  onClose: () => void
  isOpen: boolean
}
const CartUnderlay: any = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #eeeeeeaa;
  transition: opacity 0.25s ease;
`

const Cart: React.FC<CartComponent> = ({ onClose, isOpen, ...props }) => {
  const data: any = useStaticQuery(graphql`
    query CartQuery {
      allSanityProduct {
        edges {
          node {
            _id
            title
            slug {
              current
            }
            otherVariants {
              pricing {
                price
                discountPrice
              }
              featuredImage {
                asset {
                  fluid(maxWidth: 700) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
              images {
                asset {
                  fluid(maxWidth: 700) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Spring
      native
      from={{
        transform: "translateX(100%)",
        opacity: 0,
      }}
      to={{
        transform: isOpen ? "translateX(0%)" : "translateX(100%)",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
      }}
    >
      {(styles) => (
        <>
          <CartUnderlay
            style={{
              visibility: isOpen ? "visible" : "hidden",
              opacity: isOpen ? 1 : 0,
            }}
          />
          <CartContainer {...props} style={styles}>
            <div className="menu-header">
              <h5>Cart</h5>
              <button onClick={onClose}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="presentation"
                  className="icon icon-close"
                  viewBox="0 0 64 64"
                >
                  <path d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path>
                </svg>
              </button>
            </div>
            <div className="cart-items">
              <CartItems
                cartItems={data.allSanityProduct.edges}
                handlePayment={({ items, total, discount, couponCode }) => {}}
                showCheckoutBtn
              />
            </div>
          </CartContainer>
        </>
      )}
    </Spring>
  )
}
export default Cart
