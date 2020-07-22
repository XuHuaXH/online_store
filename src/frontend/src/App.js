import React from 'react';
import './App.css';
import Header from './Header.js';
import { ColorModeProvider, ThemeProvider, CSSReset } from '@chakra-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <ThemeProvider>
        <CSSReset />
        <Header />
    </ThemeProvider>
  );
}

export default App;
