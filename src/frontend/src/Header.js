import React, { useState } from 'react';
import Home from './Home.js';
import Test from './Test.js';
import Login from './Login.js';
import Register from './Register.js';
import Products from './Products.js';
import About from './About.js';
import ColorModeButton from './ColorModeButton.js';
import ProductDetails from "./ProductDetails.js";
import Settings from "./Settings.js";
import Cart from "./Cart.js";
import axios from 'axios';
import { Box, Button, useColorMode, Heading, Flex } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


class Header extends React.Component {

    logout = () => {
        axios.post('http://127.0.0.1:8000/rest-auth/logout/').then(() => {
            localStorage.removeItem('token');
        }).then(() => {
            this.setState({authenticated: false});
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        };
    }

    componentDidMount = () => {
        if (localStorage.getItem('token') != null) {
            this.setState({authenticated: true});
        }
        console.log(this.state.authenticated);
        this.render();
    }


    render() {
        return (
            <Router>
    		<Box bg="teal.100" color="gray.800" w="100%" p={16}>
                <Box>
                    <Link to="/products">
                    <Box p={3}>
                        <Heading size="2xl" style={{float: 'left'}}>
                            Alpaca Shop
                        </Heading>
                    </Box>
                    </Link>
                    <Box p={8}>
                    </Box>
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
                    <Login
                        reload={this.componentDidMount}
                        authenticated={this.state.authenticated}
                    />
                    <Register
                        reload={this.componentDidMount}
                        authenticated={this.state.authenticated}
                    />
                    <Button style={{float: 'right', display: this.state.authenticated ? 'block' : 'none'}} onClick={this.logout}>
                        Logout
                    </Button>
                    <Link to="/cart">
                    <Button style={{float: 'right', display: this.state.authenticated ? 'block' : 'none'}} onClick={this.showCart}>
                        Cart
                    </Button>
                    </Link>
                    <Link to="/settings">
                    <Button style={{float: 'right', display: this.state.authenticated ? 'block' : 'none'}} onClick={this.showSettings}>
                        Settings
                    </Button>
                    </Link>
                </Box>
    		</Box>

        	    <Switch>
                <Route exact path="/">
                    <Redirect to="/products" />
                </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/products">
                <Products />
            </Route>
            <Route path="/settings">
                <Settings />
            </Route>
            <Route path="/cart">
                <Cart />
            </Route>
           <Route path="/product/:id" component={ProductDetails} />
              </Switch>
        	</Router>
    	);
    }
}


export default Header;
