import React from 'react';
import styled from 'styled-components';

export function VStack({ children, spacing = 1 }) {
  return <Container $spacing={spacing}>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${({ $spacing }) => $spacing * 10}px;
  text-align: center;
`;
