import { Box } from '@mui/material';
import styled, { css } from 'styled-components';

export const drawerWidth = 240;


export const AdminLayout = styled(Box)`
  && {
    z-index: 1;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding:20px;
    margin-top: 10vh;

    ${({ open }) => open
      && css`
        margin-left: ${drawerWidth}px;
        width: calc(100% - ${drawerWidth}px);
        padding-left:calc(15% - ${drawerWidth}px);
        transition: theme.transitions.create(
          [ "width",
          "margin" ],
          {easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
          }
        );
      `}
      @media (max-width: 576px) {
        padding: 20px 0px;
        margin-left: 0px;
        width: 100%;
        padding-left: 0px;
        transition: none;
      }
  }
`;
