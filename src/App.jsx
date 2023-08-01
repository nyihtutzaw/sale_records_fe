import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { green, purple , red} from '@mui/material/colors';
import { DialogContainer } from './layouts/DialogContainer';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import LoginForm from './LoginForm';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import PrivateRoute from './routers/PrivateRoute';
import store from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: red[500],
    },
    success: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/*" element={<PrivateRoute />} />
          </Routes>
        </Router>
      </ThemeProvider>
      <DialogContainer />
    </Provider>
  );
}

export default App;
