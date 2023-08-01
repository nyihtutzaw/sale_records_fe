import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../routes';
import { COLORS } from "../../styles/color";

export function MenuListItems() {
  const location = useLocation();


  return (
    <>
      {routes.map((route) =>
       {
        if (route.invisible) return null
        if(route.layout === '/') {
         return route.collapse ? (
            <CollapseMenuItem
              key={route.name}
              name={route.name}
              icon={route.icon}
              view={route.view}
            />
          ) : (
            <MenuListItemButton
              key={`menu-link-${route.name}`}
              component={Link}
              to={route.layout + route.path}
              active={location.pathname === route.path}
            >
              {route.icon}
              <ListItemText primary={route.name} />
            </MenuListItemButton>
          )
        }
        return null;
       }
      )}
    </>
  );
}

function CollapseMenuItem({ icon, name, view }) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <MenuListItemButton onClick={handleClick}>
       {icon}
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </MenuListItemButton>
      <Collapse in={open} unmountOnExit>
        {view?.map((route) => (
          <React.Fragment key={route.name}>
            <MenuListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to={route.layout + route.path}
              active={location.pathname === route.path}
            >
                {route.icon}
              <ListItemText primary={route.name} />
            </MenuListItemButton>
          </React.Fragment>
        ))}
      </Collapse>
    </>
  );
}

const MenuListItemButton = styled(ListItemButton)`
  && {
    display: flex;
    gap: 30px;
    background-color: ${({ active }) => active && COLORS.LIGHT_PRIMARY};
  }
  && {
    &:hover {
      background-color: ${COLORS.LIGHT_PRIMARY};
    }
  }
`;
