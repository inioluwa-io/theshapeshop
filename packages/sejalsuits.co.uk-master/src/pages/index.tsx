import React from "react"
import { graphql } from "gatsby"

import config from "../utils/config"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import HomeBanner from "../components/HomeBanner"
import ProductsList from "../components/ProductsList"
import HomeAbout from "../components/HomeAbout"

export const query = graphql`
  query HomePageQuery {
    sanitySiteSettings {
      homeHeroTitle
      homeHeroSubTitle
      description
      email
      telephone
    }
    allSanityProduct {
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
          }
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const home = data.sanitySiteSettings
  const products = data.allSanityProduct.edges

  return (
    <Layout>
      <Seo
        title="Latest punjabi suits collection"
        description={home?.description || ""}
        url={config.siteUrl || ""}
      />
      <div className="container">
        <HomeBanner data={home} />
        <ProductsList products={products} />
        <HomeAbout data={home} />
      </div>
    </Layout>
  )
}

export default HomePage
