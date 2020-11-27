import React from "react"
import { graphql } from "gatsby"
import AboutBanner from "../components/AboutBanner"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import config from "../utils/config"
import styled from "styled-components"
import Img from "gatsby-image"
import ProductsList from "../components/ProductsList"

// export const query = graphql`
//   query AboutPageQuery {
//     sanitySiteSettings {
//       aboutHeroTitle
//       aboutHeroSubTitle
//     }
//   }
// `

const HeroTitle: any = styled.h1`
  padding: 15px 13vw;
  font-size: 1.35rem;
  line-height: 1.8rem;
  font-weight: 500;
  text-align: center;
`

const Image = styled(Img)`
  object-fit: cover;
  height: 17vw;
  width: 100%;

  @media (max-width: 801px) {
    height: 40vw;
  }

  @media (max-width: 550px) {
    height: 60vw;
  }
`
const mockProducts = [
  {
    _id:"123",
    fluid: "/images/wear2.jpg",
    slug: "products/gym-waist-trainer",
    title: "Gym waist trainer",
    price: "4200",
    discount: "1000",
  },
  {
    _id:"ruh8i",
    fluid: "/images/wear1.jpg",
    slug: "products/gym-waist-trainer",
    title: "Gym waist trainer",
    price: "4200",
    discount: "1000",
  },
  {
    _id:"2oifh2",
    fluid: "/images/mainbanner.jpg",
    slug: "products/gym-waist-trainer",
    title: "Gym waist trainer",
    price: "4200",
    discount: undefined,
  },
]

const AboutPage: React.FC<any> = ({ data }) => {
  //   const about = data.sanitySiteSettings
  const about = {
    description: "About us title",
    aboutHeroTitle: "Founded with a mission.",
    aboutHeroSubTitle: "Fitter, healthier, happier.",
  }

  return (
    <Layout>
      <Seo title="About Us - The Shape Shop" url={config.siteUrl || ""} />
      <div className="container">
        <AboutBanner data={about} />
      </div>
      <div className="section page-width">
        <HeroTitle className="">
          Waist Trainers and Shapewear store in the Nigeria. Feel sexy and
          confident in our exceptional-quality Waist Trainers and Cinchers.
        </HeroTitle>
      </div>
      <Image
        fluid={{
          src: "/images/banner5.jpg",
          aspectRatio: 2,
          srcSet: "/images/banner5.jpg",
          sizes: "100px",
        }}
      />
      {/* <ProductsList
        style={{ marginTop: "6rem" }}
        title={"Visit our Store"}
        products={mockProducts.slice(0, 4)}
      /> */}
    </Layout>
  )
}

export default AboutPage
