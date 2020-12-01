import React, { useRef, useState } from "react"
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
`

const Form: any = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  .form-control {
    display: grid;
    width: 45rem;
    grid-gap: 25px;
    grid-template-columns: 1fr 1fr;
  }

  button {
    margin-top: 25px;
  }

  @media (max-width: 830px) {
    width: 100%;

    button {
      width: 100%;
    }

    .form-control {
      grid-template-columns: 1fr;
      width: 100%;
    }
  }
`

const Container: any = styled.div`
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Register: React.FC = () => {
  const refs = useRef<HTMLDivElement>()
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = (e): void => {
    e.preventDefault()
    const DOMNode = refs.current
    const inputElements = DOMNode.querySelectorAll("input")
    const form = {}

    inputElements.forEach((element) => {
      form[element.name] = element.value
    })
  }
  return (
    <Layout>
      <Seo title="Register" url={config.siteUrl || ""} />
      <Container className="section page-width" ref={refs}>
        <HeroTitle className="is-uppercase">Register</HeroTitle>
        <div className="form-container">
          <Form action="" onSubmit={handleSubmit}>
            <div className="form-control">
              <Input
                aria-required="true"
                label="First Name"
                name="firstname"
                id="firstname-input"
              />
              <Input
                aria-required="true"
                label="Last Name"
                name="lastname"
                id="lastname-input"
              />
              <Input
                pattern="^([0-9]{11}|234([0-9]{10}))$"
                label="Phone Number"
                id="phone-input"
                name="phone"
                placeholder="E.G: 08138844594"
              />
              <Input
                aria-required="true"
                label="Email"
                name="email"
                id="email-input"
                type="email"
              />
              <Input
                aria-required="true"
                label="Password"
                name="password"
                id="password-input"
                type="password"
                onInputChange={(val: string) => {
                  setError("")
                  setPassword(val)
                }}
                onBlur={(e) => {
                  if (confirmPassword !== e.target.value)
                    setError("Passwords do not match")
                }}
              />
              <Input
                aria-required="true"
                name="password_confirm"
                label="Confirm Password"
                id="password-confirm"
                type="password"
                onInputChange={(val: string) => {
                  setError("")
                  setConfirmPassword(val)
                }}
                onBlur={(e) => {
                  if (password !== e.target.value)
                    setError("Passwords do not match")
                }}
              >
                {!!error.length && <p style={{ color: "red" }}>{error}</p>}
              </Input>
              <Input
                aria-required="true"
                label="Address Line"
                name="address"
                id="address-input"
              />
              <Input
                aria-required="true"
                name="city"
                label="City"
                id="city-input"
              />
              <Input
                aria-required="true"
                label="State/Province"
                name="state"
                id="state-input"
              />
              <Input
                aria-required="true"
                name="postcode"
                label="Zip/Postcode"
                id="postcode-input"
              />
            </div>
            <Button>Register</Button>
          </Form>
        </div>
      </Container>
    </Layout>
  )
}

export default Register
