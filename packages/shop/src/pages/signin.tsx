import React from "react"
import { Button, Input } from "../ui-components"
import config from "../utils/config"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import styled from "styled-components"

const HeroTitle: any = styled.h1`
  padding: 15px 13vw;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: -0.5px;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`

const Form: any = styled.form`
  display: flex;
  width: 25rem;
  flex-direction: column;
  grid-gap: 25px;
  > * {
    width: 100%;
  }
`

const Container: any = styled.div`
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const SignIn: React.FC = () => {
  return (
    <Layout>
      <Seo title="Sign in" url={config.siteUrl || ""} />
      <Container className="section page-width">
        <HeroTitle className="is-uppercase">Sign in</HeroTitle>
        <div className="form-container">
          <Form action="">
            <Input
              aria-required="true"
              label="Email"
              id="email-input"
              type="email"
            />
            <Input
              aria-required="true"
              label="Password"
              id="password-input"
              type="password"
            />

            <Button>Sign in</Button>
          </Form>
        </div>
      </Container>
    </Layout>
  )
}

export default SignIn
