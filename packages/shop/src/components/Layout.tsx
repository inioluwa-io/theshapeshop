import React, { useEffect } from "react"
import Helmet from "react-helmet"
import styled, { ThemeProvider } from "styled-components"
import { ApolloProvider } from "@apollo/react-hooks"
import { graphql, StaticQuery } from "gatsby"

import GlobalStyle, { theme } from "../utils/theme"
import config from "../utils/config"
import apolloClient from "../utils/apolloClient"
import Header from "./Header"
import Footer from "./Footer"
import "../assets/@font-face/font.css"
import "../assets/karla.css"

const Container = styled.div`
  min-height: 70vh;
`

const query = graphql`
  query LayoutQuery {
    sanitySiteSettings {
      description
      telephone
      email
      address
      facebook
      twitter
      instagram
      pinterest
    }
  }
`

const IndexLayout: React.FC<any> = ({ children, hideHeader }) => {
  useEffect(() => {
    // const doc = document.append()
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <>
        <ApolloProvider client={apolloClient}>
          <Helmet>
            <title>{config.siteName}</title>
            <meta charSet="utf-8" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
            />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200&display=swap"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={config.description} />
          </Helmet>
          <GlobalStyle />
          <StaticQuery
            query={query}
            render={(data) => {
              const home = data.sanitySiteSettings
              return (
                <>
                  {!hideHeader && <Header home={home} />}
                  <Container>{children}</Container>
                  <Footer home={home} />
                </>
              )
            }}
          />
        </ApolloProvider>
      </>
    </ThemeProvider>
  )
}

export default IndexLayout
