import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container: any = styled.section`
  // width: 120px;
  // min-height: 26px;
  display: block !important;

  .level-item {
    margin-right: 1.2rem;
    display: inline-block;
    a {
      padding: 0 !important;
    }
  }
  svg {
    color: ${(props: any) => (!props.inverted ? "#000" : "#fff")};
    font-size: 1.3rem;
  }
`

const SocialIcons = ({ inverted, data }) => (
  <Container className="level" inverted={inverted}>
    <div className="level-item">
      <a href={data?.facebook} target="_blank">
        <i className="fab fa-facebook" />
      </a>
    </div>
    <div className="level-item">
      <a href={data?.twitter} target="_blank">
        <i className="fab fa-twitter" />
      </a>
    </div>
    <div className="level-item">
      <a href={data?.instagram} target="_blank">
        <i className="fab fa-instagram" />
      </a>
    </div>
    <div className="level-item">
      <a href={data?.pinterest} target="_blank">
        <i className="fab fa-pinterest" />
      </a>
    </div>
  </Container>
)

SocialIcons.defaultProps = {
  inverted: false,
  data: {},
}

SocialIcons.propTypes = {
  inverted: PropTypes.bool,
  data: PropTypes.object,
}

export default SocialIcons
