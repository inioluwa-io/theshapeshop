import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import config from "../utils/config"
import { formatCurrency } from "../utils/helpers"
import Seo from "../components/Seo"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"
import styled from "styled-components"
import PromotedBanner from "./PromotedBanner"
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion"
import ProductsList from "./ProductsList"

export const query = graphql`
  query CollectionView($slug: String!) {
    sanityCategory(slug: { current: { eq: $slug } }) {
      _id
      title
      description
      slug {
        current
      }
      title
      image {
        asset {
          fluid(maxWidth: 700) {
            ...GatsbySanityImageFluid
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

const AccordionStyled = styled(Accordion)`
  .accordion__item:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  .accordion__title {
    padding: 0.9rem 0;
    cursor: pointer;
    :focus {
      outline: none;
    }
    h3 {
      text-transform: uppercase;
      font-weight: 700;

      //   letter-spacing: 1px;
      //   font-size: 14px;
      //   font-weight: 400;
    }
  }
  .accordion__body {
    display: block;
    padding: 1rem 0;
  }
  .accordion__body--hidden {
    display: none;
  }
`

const CollectionPanel: any = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  grid-gap: 30px;

  .productList .card-image .gatsby-image-wrapper {
    height: 25vw;
  }

  @media (max-width: 881px) {
    .productList .card-image .gatsby-image-wrapper {
      height: 32vw;
    }
    .productList .grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .productList .card-image .gatsby-image-wrapper {
      height: 60vw;
    }
    .productList .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`

const ControlPanel: any = styled.div`
  position: sticky;
  top: 110px;

  .input-range__track--active {
    background: ${config.primaryColor};
  }
  .input-range__slider {
    background: ${config.primaryColor};
    border-color: ${config.primaryColor};
    box-shadow: 0 0 2px #000000aa;
  }
  .input-range__label--max,
  .input-range__label--min {
    visibility: hidden;
  }
`
const HeroTitle: any = styled.h1`
  font-size: 4rem;
  line-height: 4rem;
  text-transform: uppercase;
  font-family: Karla, Arial;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px 0;
    width: 95%;
  }
`

type RangeProps = { max: number; min: number }

const CollectionView: React.FC<any> = ({ data }) => {
  const { sanityCategory, allSanityProduct } = data
  const [value, setValue] = useState<RangeProps>({
    min: 0,
    max: 50,
  })

  return (
    <Layout>
      <Seo
        title={sanityCategory?.title}
        description={sanityCategory?.description || ""}
        url={config.siteUrl || ""}
      />
      <div className="section">
        <HeroTitle>{sanityCategory.title}</HeroTitle>
      </div>

      <CollectionPanel className="section small-page-width">
        <div>
          <ControlPanel>
            <AccordionStyled accordion={false}>
              <AccordionItem expanded>
                <AccordionItemTitle>
                  <h3>Price</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <InputRange
                    maxValue={50}
                    draggableTrack={true}
                    formatLabel={(value) => `${formatCurrency(value)}`}
                    minValue={0}
                    value={value}
                    onChange={(value: RangeProps) => setValue(value)}
                  />
                </AccordionItemBody>
              </AccordionItem>

              <AccordionItem expanded>
                <AccordionItemTitle>
                  <h3>Color</h3>
                </AccordionItemTitle>
                <AccordionItemBody>fhir</AccordionItemBody>
              </AccordionItem>
            </AccordionStyled>
          </ControlPanel>
        </div>
        <div>
          <PromotedBanner
            promotion={{
              fluid: "/images/mainbanner.jpg",
              slug: "collections/buttlifters",
              title: "Buttlifters Sale",
              description: "Up to 60% off on our selected products. ",
            }}
          />
          <ProductsList
            className="productList"
            title={`${allSanityProduct.edges.length} Product ${
              allSanityProduct.edges.length > 1 ? "s" : ""
            }`}
            products={allSanityProduct.edges}
          />
        </div>
      </CollectionPanel>
    </Layout>
  )
}

export default CollectionView
