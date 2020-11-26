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
const HeroTitle: any = styled.h1`
  padding: 15px 13vw;
  font-size: 1.35rem;
  line-height: 1.8rem;
  font-weight: 500;
  text-align: center;
`

const HomePage = ({ data }) => {
  const home = data.sanitySiteSettings
  const products = data.allSanityProduct.edges

  const mockCategory = [
    {
      fluid: "/images/wear3.jpg",
      title: "Full body shapers",
      slug: "full-body-shapers",
    },
    {
      fluid: "/images/wear1.jpg",
      slug: "buttlifters",
      title: "Buttlifters",
    },
    {
      fluid: "/images/wear5.jpg",
      slug: "waist-trainers",
      title: "Waist trainers",
    },
  ]
  const mockProducts = [
    {
      fluid: "/images/wear2.jpg",
      slug: "products/gym-waist-trainer",
      title: "Gym waist trainer",
      price: "4200",
      discount: "1000",
    },
    {
      fluid: "/images/wear1.jpg",
      slug: "products/gym-waist-trainer",
      title: "Gym waist trainer",
      price: "4200",
      discount: "1000",
    },
    {
      fluid: "/images/mainbanner.jpg",
      slug: "products/gym-waist-trainer",
      title: "Gym waist trainer",
      price: "4200",
      discount: undefined,
    },
  ]

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
        title="The Shape Shop"
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
      <CollectionList title="Shop by Collections" categories={mockCategory} />
      <ProductsList
        title={"New Products"}
        products={mockProducts.slice(0, 4)}
      />
    </Layout>
  )
}

export default HomePage
