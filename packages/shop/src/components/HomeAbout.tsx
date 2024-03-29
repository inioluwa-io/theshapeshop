import React from 'react';
import styled from 'styled-components';

import { HTMLContent } from './Content';
import Heading from './Heading';

const Container: any = styled.section`
  position: relative;
`;

const HomeAbout = ({ data }) => (
  <Container className="section">
    <Heading>Who we are</Heading>
    <HTMLContent className="has-text-centered" content={data?.homeAboutUs} />
  </Container>
);

export default HomeAbout;
