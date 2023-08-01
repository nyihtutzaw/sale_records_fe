import styled from 'styled-components';

import { COLORS } from './color';

const FlexAlignCenter = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${({ $direction }) => ($direction || 'row')};
    min-height: ${({ $height }) => ($height || 'auto')};
`;

const ErrorContaienr = styled.div`
    margin:0;
    padding:0;
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
    span {
        color: ${COLORS.DANGER};
        font-family: "Roboto","Helvetica","Arial",sans-serif;
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.66;
        letter-spacing: 0.03333em;
        margin-left: 20px;
    }
`;

export {
  FlexAlignCenter,
  ErrorContaienr,
};
