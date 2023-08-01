import React from "react";
import styled from "styled-components";

export function HStack({ children, spacing = 1 }) {
  return <Container $spacing={spacing}>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  gap: ${({ $spacing }) => $spacing * 10}px;
  text-align: center;
 align-items: center;
`;
