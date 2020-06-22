import React from 'react';
import './App.css';
import Home from './Home.js';
import Header from './Header.js';
import Products from './Products.js';
import { ColorModeProvider, ThemeProvider, CSSReset } from '@chakra-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <ThemeProvider>
        <CSSReset />
        <ColorModeProvider>
            <Header />
        </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
