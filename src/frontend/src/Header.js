import React, { useState } from 'react';
import Home from './Home.js';
import Test from './Test.js';
import Login from './Login.js';
import Register from './Register.js';
import Products from './Products.js';
import About from './About.js';
import ColorModeButton from './ColorModeButton.js';
import { Box, Button, useColorMode } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// const { colorMode, toggleColorMode } = useColorMode();
const bgColor = { light: "red.500", dark: "red.200" };
// const color = { light: "white", dark: "gray.800" };
const color = "white";

class Header extends React.Component {

    logout() {
        // TODO
    }

    showCart() {
        // TODO
    }

    showSettings() {
        // TODO
    }


    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            colorMode: "dark",
            bgColor: "red.200",
            color: "gray.800"
        };
    }

    componentDidMount() {
        if (localStorage.getItem('token') != null) {
            this.setState({authenticated: true});
        }
    }


    render() {
        return (
            <Router>
    		<Box bg="tomato" w="100%" p={20} bg={this.state.bgColor} color={this.state.color}>
                <Link to="/about">
                <Button style={{float: 'left'}}>
                    About
                </Button>
                </Link>
                <Link to="/products">
                <Button style={{float: 'left'}}>
                    Shop
                </Button>
                </Link>
                <ColorModeButton />
                <Login />
                <Register />
                <Button style={{float: 'right', display: this.state.authenticated ? 'block' : 'none'}} onClick={this.logout}>
                    Logout
                </Button>

                <Button style={{float: 'right', display: this.state.authenticated ? 'block' : 'none'}} onClick={this.showCart}>
                    Cart
                </Button>
                <Button style={{float: 'right', display: this.state.authenticated ? 'block' : 'none'}} onClick={this.showSettings}>
                    Settings
                </Button>
    		</Box>

        	    <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/products">
                <Products />
            </Route>
        	    </Switch>
        	</Router>
    	);
    }
}


export default Header;