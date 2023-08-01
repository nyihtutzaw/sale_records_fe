import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/color';

export function FormItem({ label, children, required = false }) {
  return (
    <Container>
      <span>
        {label} {required && <span style={{ color: COLORS.DANGER }}>*</span>}
      </span>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 5px;
`;
