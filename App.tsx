import React from 'react';
import Navigation from './src/Navigation';
import { Provider } from './src/Hooks';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from './src/Config';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Provider>
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
