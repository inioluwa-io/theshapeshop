import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { LinkButton } from "../ui-components"
import config from "../utils/config"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"
import ProductsList from "../components/ProductsList"

export const query = graphql`
  query productViewQueryAndProductViewQuery($slug: String!) {
    sanitySiteSettings {
      homeHeroTitle
      homeHeroSubTitle
      description
      email
      productDeliveryInfo
      productShippingReturns
      telephone
    }
    sanityProduct(slug: { current: { eq: $slug } }) {
      _id
      title
      slug {
        current
      }
      _rawBody

      otherVariants {
        color {
          hex
        }

        pricing {
          price
          discountPrice
        }
        sku
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
    allSanityProduct(
      filter: { status: { eq: "active" }, slug: { current: { ne: $slug } } }
      limit: 9
      sort: { fields: [_createdAt], order: DESC }
    ) {
      edges {
        node {
          _id
          title
          slug {
            current
          }
          otherVariants {
            color {
              hex
            }

            pricing {
              price
              discountPrice
            }
            sku
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
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProductView = ({ data }) => {
  const {
    sanitySiteSettings: home,
    sanityProduct: product,
    allSanityProduct: products,
  } = data

  // console.log('products', products);

  // const metaImage = product.featuredImage
  //   ? product.featuredImage.sizes.src
  //   : `${config.url}${config.logo}`;

  return (
    <Layout>
      <Seo
        title={product.title}
        url={`${config.siteUrl}/product/${product.slug.current}`}
        // image={metaImage}
        // isProduct
      />
      <div className="section small-page-width">
        <Container>
          <ProductGallery product={product} />
          <ProductInfo home={home} product={product} />
        </Container>
      </div>
      {!!products.edges.length && (
        <div className="section small-page-width">
          <ProductsList
            className="section page-width"
            title="We think you'll like"
            products={products.edges}
          />
          <div className="has-text-centered	">
            <LinkButton to="/">View all</LinkButton>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ProductView
