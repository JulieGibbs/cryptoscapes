import React from 'react';
import Gilroy from './assets/fonts/Gilroy-ExtraBold.woff';
import { createMuiTheme, CssBaseline, Theme, ThemeOptions, ThemeProvider } from '@material-ui/core';
import { useAppSelector } from './app/hooks';
import { selectAppState } from './features/appStateSlice';
import Main from './pages/Main';

const App: React.FC = () => {
  const appState = useAppSelector(selectAppState);

  const gilroy = {
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontDisplay: 'swap' as 'swap',
    fontWeight: 400,
    src: `
      local('Gilroy'),
      local('Gilroy-ExtraBold'),
      url(${Gilroy}) format('woff')
    `,
  };

  const common: ThemeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      }
    },
    typography: {
      fontFamily: "'Gilroy', sans-serif !important",
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [gilroy],
        },
      },
    },
  };

  const dark: Theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#7C4DFF',
      },
      secondary: {
        main: '#2196F3',
      },
      background: {
        default: '#030614', //12172F
        paper: '#0a0f23', // 051327
      },
      text: {
        primary: '#D7DCEC',
        secondary: '#8492c4'
      },
      card: {
        default: '#12172F', // 12172F
        paper: '#29314F'
      },
      success: {
        main: '#00C853'
      },
      error: {
        main: '#D9534F' // D84315
      },
      warning: {
        main: '#FFC107'
      }
    },
    ...common
  });

  const light: Theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#7C4DFF',
      },
      secondary: {
        main: '#2196F3',
      },
      background: {
        default: '#121937',
        paper: '#1a223f',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#8492c4'
      },
      card: {
        default: '#212946', // #202940
        paper: '#29314F'
      }
    },
    ...common
  });

  return (
    <ThemeProvider theme={appState.darkMode ? dark : light}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}

export default App;
