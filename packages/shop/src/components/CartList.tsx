import React from "react"
import styled from "styled-components"
import { formatCurrency } from "../utils/helpers"

const List = styled.div`
  height: calc(100vh - (80px + 172px));
`
const Item = styled.article`
  padding: 20px;
  margin: 0;

  .image {
    height: 111px;
    width: 74px;
    overflow: hidden;
  }
  img.cart-item-image {
    object-fit: cover;
    width: 128px;
    height: auto;
  }
  .remove {
    color: ${(props) => props.theme.primaryColor};
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-left: 1rem;
  }
`

type CartListComponent = {
  cartItems: any[]
  handleRemoveItem: (index: number) => void
}

const CartList: React.FC<CartListComponent> = ({
  cartItems,
  handleRemoveItem,
  ...props
}) => {
  return (
    <List {...props}>
      {cartItems.map(({ node: item }, index) => (
        <Item className="media" key={index}>
          {/* {item.image && (
              <figure className="media-left">
                <div className="image is-128x128">
                  <img
                    src={item.image}
                    className="cart-item-image"
                    alt={item.title}
                  />
                  <Img
                    sizes={item.image.sizes}
                    alt={item.image.title}
                    title={item.image.title}
                    backgroundColor="#f1f1f1"
                  />
                </div>
              </figure>
            )} */}
          {item.otherVariants[0].featuredImage && (
            <figure className="media-left">
              <div className="image">
                <img
                  src={item.otherVariants[0].featuredImage.asset.fluid.src}
                  className="cart-item-image"
                  alt={item.title}
                />
                {/* <Img
                    sizes={item.image.sizes}
                    alt={item.image.title}
                    title={item.image.title}
                    backgroundColor="#f1f1f1"
                  /> */}
              </div>
            </figure>
          )}
          <div className="media-content">
            <div className="content">
              <p>
                <strong className="is-size-5">{item.title}</strong>{" "}
                <small className="has-text-grey-light is-uppercase">
                  {item.sku}
                </small>
                <br />
                <span className="is-size-5 has-text-weight-bold has-text-grey-dark">
                  {formatCurrency(item.otherVariants[0].pricing[0].price)}
                  {/* {formatCurrency(item.price)} */}
                </span>
                <button
                  className="remove"
                  onClick={() => handleRemoveItem(index)}
                >
                  remove
                </button>
              </p>
            </div>
          </div>
        </Item>
      ))}
    </List>
  )
}

export default CartList