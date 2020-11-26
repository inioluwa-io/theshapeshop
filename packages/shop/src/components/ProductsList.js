import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Trail } from "react-spring"
import ProductItem from "./ProductItem"
import Heading from "./Heading"

const Container = styled.section`
  position: relative;
  padding-top: 3rem;
  padding-bottom: 3rem;

  .grid {
    display: grid;
    padding-top: 3rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;

    @media (max-width: 801px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 550px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`

const ProductsList = ({ products, title, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 200)
  }, [])

  const toggleCategory = (category) => setActiveCategory(category)

  const keys = products.map((item, idx) => idx)
  // const keys = products.map((item) => item.node._id)

  return (
    <Container className="section page-width" {...props}>
      <Heading>{title}</Heading>
      <div className="grid">
        <Trail
          native
          from={{ opacity: 0 }}
          to={{ opacity: isOpen ? 1 : 0.25 }}
          keys={keys}
        >
          {products.map((item, idx) => (styles) => (
            <ProductItem key={idx} item={item} styles={styles} />
          ))}
          {/* {products.map(({ node }) => styles => (
              <ProductItem key={node._id} item={node} styles={styles} />
            ))} */}
        </Trail>
      </div>
    </Container>
  )
}

ProductsList.defaultProps = {
  title: "New arrivals",
  products: [],
}

ProductsList.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
}

export default ProductsList
