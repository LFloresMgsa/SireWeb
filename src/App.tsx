import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppToolbar from './components/layout/AppToolbar';
import AppMenu from './components/layout/AppMenu';
import AppRoutes from './components/routes/AppRoutes'
import { ThemeProvider } from '@mui/material/styles'; // Importa ThemeProvider
import theme from './components/theme/Apptheme';


const App: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>

      <BrowserRouter>

        <AppToolbar />
        <div style={{ display: "flex" }}>

          <div>

            <AppMenu />
          </div>
          <div style={{ flex: 1, padding: "0px" }}>
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider >
  );
};

export default App;
