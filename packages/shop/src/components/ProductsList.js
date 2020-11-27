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

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 200)
  }, [])

  const keys = products.map((_, idx) => idx)

  return (
    <Container {...props}>
      {title && <Heading>{title}</Heading>}
      <div className="grid">
        <Trail
          native
          from={{ opacity: 0 }}
          to={{ opacity: isOpen ? 1 : 0.25 }}
          keys={keys}
        >
          {products.map(({ node }) => (styles) => (
            <ProductItem key={node._id} item={node} styles={styles} />
          ))}
        </Trail>
      </div>
    </Container>
  )
}

ProductsList.defaultProps = {
  title: undefined,
  products: [],
}

ProductsList.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
}

export default ProductsList
