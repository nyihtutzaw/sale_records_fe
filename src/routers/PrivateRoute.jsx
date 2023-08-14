// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { useTheme } from '@mui/material';
import AdminNavBar from '../components/NavBar/AdminNavBar';
import { AdminLayout } from '../styles/AdminLayout';
import { getCache } from '../utils/cache';
import { routes } from '../routes';

function PrivateRoute() {
  const theme = useTheme();
  const TOKEN = getCache('access_token');
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const getRoutes = (adminRoutes) =>
    adminRoutes?.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.view);
      }

      if (prop.layout === '/') {
        const Component = prop.component;
        return (
          <Route
            path={prop.layout + prop.path}
            exact
            element={<Component />}
            // eslint-disable-next-line react/no-array-index-key
            key={key}
          />
        );
      }
      return null;
    });

  return TOKEN ? (
    <div>
      <header>
        <AdminNavBar open={open} toggleDrawer={toggleDrawer} />
      </header>
      <AdminLayout
        open={open}
        theme={theme}
        onClick={() => {
          if (window.innerWidth < 600 && open) {
            setOpen(false);
          }
        }}
      >
        <Routes>
          {getRoutes(routes)}
          <Route
            path="/"
            element={<Navigate to="/sale-record-create" replace />}
          />
        </Routes>
      </AdminLayout>
    </div>
  ) : (
    <Navigate to="/auth/login" replace />
  );
}
export default PrivateRoute;
