import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import config from "../utils/config"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-right: 1.5rem;
    flex: 1 1 auto;
    border-top: 1px dotted #999;
    height: 1px;

    &.span-r {
      margin-left: 1.5rem;
      margin-right: 0;
    }
  }
  h4 {
    flex: 0 1 auto;
    margin: 0 !important;
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    letter-spacing: -0.5px;
    z-index: 1;
    position: relative;
  }
`

const Heading = ({ children }) => (
  <Container>
    <span></span>
    <h4 className=" has-text-centered is-uppercase ">{children}</h4>
    {/* <Line /> */}
    <span className="span-r"></span>
  </Container>
)

Heading.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Heading
