import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { LinkButton} from "../ui-components"
import config from "../utils/config"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"
import ProductsList from "../components/ProductsList"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-gap: 60px;
  && {
  }
`

const ViewAllBtn = styled(Link)`
  padding-right: 2rem;
  padding-left: 2rem;
`

export const query = graphql`
  query productViewQuery {
    sanitySiteSettings {
      homeHeroTitle
      homeHeroSubTitle
      description
      email
      telephone
    }
  }
`

const ProductView = ({ data }) => {
  const home = data.sanitySiteSettings
  const product = {
    images: [
      {
        asset: {
          fluid: "/images/wear1.jpg",
        },
      },
      {
        asset: {
          fluid: "/images/wear2.jpg",
        },
      },
      {
        asset: {
          fluid: "/images/wear5.jpg",
        },
      },
      {
        asset: {
          fluid: "/images/mainbanner.jpg",
        },
      },
    ],
    slug: "products/gym-waist-trainer",
    title: "Gym waist trainer",
    color: "#222",
    productDeliveryInfo: "",
    productShippingReturns: "",
    sku: "23782uhi",
    price: "4200",
    __rawBody: { en: "<p>SOme bodayrjke gevklbjvb</p>" },
    discount: "1000",
  }
  const products = [
    {
      fluid: "/images/banner3.jpg",
      slug: "products/gym-waist-trainer",
      title: "Gym waist trainer",
      price: "4200",
      discount: "1000",
    },
    {
      fluid: "/images/img1.jpg",
      slug: "products/gym-waist-trainer",
      title: "Gym waist trainer",
      price: "4200",
      discount: "1000",
    },
    {
      fluid: "/images/img2.jpg",
      slug: "products/gym-waist-trainer",
      title: "Gym waist trainer",
      price: "4200",
      discount: undefined,
    },
  ]
  // console.log('products', products);

  // const metaImage = product.featuredImage
  //   ? product.featuredImage.sizes.src
  //   : `${config.url}${config.logo}`;

  return (
    <Layout>
      <Seo
        title={product.title}
        url={`${config.siteUrl}/product/${product.slug}`}
        // image={metaImage}
        // isProduct
      />
      <div className="section small-page-width">
        <Container>
          <ProductGallery product={product} />
          <ProductInfo home={home} product={product} />
        </Container>
      </div>
      <div className="section small-page-width">
        <ProductsList title="We think you'll like" products={products} />
        <div className="has-text-centered	">
          <LinkButton to="/">
            View all
          </LinkButton>
        </div>
      </div>
    </Layout>
  )
}

export default ProductView
