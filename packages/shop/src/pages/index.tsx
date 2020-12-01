import React from "react"
import { graphql } from "gatsby"
import config from "../utils/config"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import HomeBanner from "../components/HomeBanner"
import ProductsList from "../components/ProductsList"
import CollectionList from "../components/CollectionList"
import styled from "styled-components"
import PromotedCollection from "../components/PromotedCollection"

export const query = graphql`
  query HomePageQuery {
    sanitySiteSettings {
      homeHeroTitle
      homeHeroSubTitle
      description
      email
      telephone
    }
    allSanityCategory {
      edges {
        node {
          slug {
            current
          }
          title
          image {
            asset {
              fluid(maxWidth: 350) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
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
`
const HeroTitle: any = styled.h1`
  padding: 15px 13vw;
  font-size: 1.35rem;
  line-height: 1.8rem;
  font-weight: 500;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`

const HomePage = ({ data }) => {
  const {
    sanitySiteSettings: home,
    allSanityCategory: categories,
    allSanityProduct: products,
  } = data

  const mockPromotions = [
    {
      fluid: "/images/mainbanner.jpg",
      slug: "collections/buttlifters",
      title: "Buttlifters Sale",
      description: "Up to 60% off on our selected products. ",
    },
    {
      fluid: "/images/banner6.jpg",
      slug: "collections/waist-trainers",
      title: "Waist trainers Sale",
      description: "Up to 30% off on our selected products. ",
    },
  ]

  return (
    <Layout>
      <Seo
        title="Home"
        description={home?.description || ""}
        url={config.siteUrl || ""}
      />
      <div className="container">
        <HomeBanner data={home} />
      </div>
      <div className=" section page-width">
        <HeroTitle className="">
          Waist Trainers and Shapewear store in the Nigeria. Feel sexy and
          confident in our exceptional-quality Waist Trainers and Cinchers.
        </HeroTitle>
      </div>
      <PromotedCollection promotions={mockPromotions} />
      <CollectionList
        title="Shop by Collections"
        categories={categories.edges}
      />
      <ProductsList
        className="section page-width"
        title={"New Products"}
        products={products.edges.slice(0, 4)}
      />
    </Layout>
  )
}

export default HomePage
