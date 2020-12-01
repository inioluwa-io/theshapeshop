import React from "react"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import config from "../utils/config"
import CheckoutProgress from "../components/CheckoutProgress"
import styled from "styled-components"
import { Input, Button } from "../ui-components"

const Form: any = styled.form``

const CheckoutContainer: any = styled.div`
  display: grid;
  min-height: 70vh;
  grid-template-columns: 1fr 0.7fr;

  .cont {
    width: 100%;
    height: auto;
    padding: 0 40px;

    h1 {
      margin-bottom: 30px;
    }

    &:first-child {
      border-right: 1px solid #ddd;
    }
  }

  .form-container {
    .space {
      display: flex;
      justify-content: space-between;
      grid-gap: 10px;
      > * {
        flex: 1 1;
      }
    }
    .form-control {
      display: grid;
      grid-gap: 25px;
    }
  }

  button,
  a {
    margin-top: 30px;
    float: right;
    height: 4rem;
  }

  @media (max-width: 848px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    .cont {
      padding: 0 30px;

      &:first-child {
        border-right: none;
      }
    }
  }
`

const Checkout: React.FC = () => {
  const handleSubmit = (e): void => {
    e.preventDefault()
  }
  return (
    <Layout>
      <Seo title="Checkout" url={config.siteUrl || ""} />
      <CheckoutContainer>
        <div className="cont">
          <CheckoutProgress activeStep={3} />
          <h1>Shipping address</h1>
          <div className="form-container">
            <Form action="" onSubmit={handleSubmit}>
              <div className="form-control">
                <div className="space">
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
                </div>
                <Input
                  pattern="^([0-9]{11}|234([0-9]{10}))$"
                  label="Phone Number"
                  id="phone-input"
                  name="phone"
                  placeholder="E.G: 08138844594"
                />
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
                <div className="space">
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
              </div>
            </Form>
          </div>

          <Button onClick={handleSubmit}>Continue to payment</Button>
        </div>
        <div className="cont"></div>
      </CheckoutContainer>
    </Layout>
  )
}

export default Checkout
