import React, { useState, useCallback, useEffect } from "react"
import { useApolloClient } from "@apollo/react-hooks"
import { LinkButton } from "../ui-components"
import { formatCurrency } from "../utils/helpers"
import CouponForm from "./CouponForm"
import CartList from "./CartList"

const CartItems = ({ showCheckoutBtn, handlePayment, cartItems: cart }) => {
  const [total, setTotal] = useState(0)
  const [cartItems, setCartItems] = useState(cart)
  const [discount, setDiscount] = useState(0)
  const [couponCode, setCouponCode] = useState(null)
  const client = useApolloClient()
  // console.log('cartItems', cartItems);

  if (cartItems.length === 0) {
    return <p className="has-text-centered	is-size-4">No items in your cart.</p>
  }

  const handleRemoveItem = (index) => {
    const tmp = [...cartItems]
    tmp.splice(index, 1)
    console.log(tmp)
    setCartItems(tmp)
    calculateTotal()
    // client.writeData({ data: { cartItems } })
  }

  const handleApplyDiscount = ({ discountPercentage, code }) => {
    const discountNew = (discountPercentage / 100) * total
    setDiscount(discountNew)
    setCouponCode(code)
  }

  const calculateTotal = () => {
    let newTotal = 0
    cartItems.forEach(({ node: item }) => {
      newTotal += +item.otherVariants[0].pricing[0].price
      // newTotal += item.price
    })
    if (total !== newTotal) {
      setTimeout(() => {
        setTotal(newTotal)
      }, 300)
    }
  }

  // run everytime cart item updates
  // useEffect(() => {
  //   calculateTotal()
  // }, [calculateTotal])

  return (
    <>
      <CartList handleRemoveItem={handleRemoveItem} cartItems={cartItems} />
      <div className="footer">
        {!showCheckoutBtn && (
          <div>
            <CouponForm
              handleSubmit={(values) => handleApplyDiscount(values)}
            />
            <hr />
          </div>
        )}
        <div className="cart_price_details">
          <p className="cart-total">
            <strong className="is-uppercase">Total</strong>
            <span>{formatCurrency(total)}</span>
          </p>
          <p>
            <small>
              Shipping, taxes, and discount codes calculated at checkout.
            </small>
          </p>
        </div>
        {showCheckoutBtn && <LinkButton to="/checkout">Checkout</LinkButton>}
      </div>
    </>
  )
}

// onClick={() => {
//   handlePayment({
//     items: cartItems,
//     total,
//     discount,
//     couponCode,
//   })
// }}

export default CartItems
