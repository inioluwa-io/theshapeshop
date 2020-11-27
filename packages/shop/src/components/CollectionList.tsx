import React, { useState, useEffect } from "react"
import { Trail } from "react-spring"
import styled from "styled-components"
import Heading from "./Heading"
import CollectionItem from "./CollectionItem"

const Container = styled.section`
  position: relative;
  padding-top: 3rem;
  padding-bottom: 3rem;

  .grid {
    display: grid;
    padding-top: 3rem;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`

const CollectionList: React.FC<{ title: string; categories: any[] }> = ({
  title,
  categories,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 200)
  }, [])

  const keys = categories.map((item, idx) => idx)
  return (
    <Container className="page-width section" {...props}>
      <Heading>{title}</Heading>
      <div className="grid">
        <Trail
          native
          from={{ opacity: 0 }}
          to={{ opacity: isOpen ? 1 : 0.25 }}
          keys={keys}
        >
          {categories.map(({ node }) => (styles) => (
            <CollectionItem key={node._id} item={node} styles={styles} />
          ))}
        </Trail>
      </div>
    </Container>
  )
}

export default CollectionList
