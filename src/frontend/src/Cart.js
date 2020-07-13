import React from 'react';
import { SimpleGrid, Box, Flex, Heading, Button } from "@chakra-ui/core";
import CartItemCard from "./CartItemCard.js";
import axios from 'axios';



class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		}
	}

	fetchCartItems = () => {
		const token = localStorage.getItem('token');
		const config = {
   			headers: {
      			Authorization: "JWT " + token
   			}
		}

		axios.get('http://127.0.0.1:8000/view-cart/', config)
		.then((response) => {
			console.log(response.data);
			this.setState({
				items: response.data,
			});
		});
	}

	componentDidMount = () => {
		this.fetchCartItems();
	}

	handleCheckout = () => {
		const token = localStorage.getItem('token');
		const config = {
   			headers: {
      			Authorization: "JWT " + token
   			},
			data: {
				"address": 3
			}
		};

		axios.post('http://127.0.0.1:8000/create-order/', config)
		.then((response) => {
			console.log(response.data);
			this.setState({
				items: []
			});
		});
	}

	render() {
		return (
			<Flex bg="blue.50" w="100%" p={16} alignItems="center">
				<Box bg="red.50" w="100%" p={16} alignItems="center">
					<Heading p={5}>
						Cart
					</Heading>
					<Box alignItems="center" justify="center">
						{this.state.items.map((item, index) =>
							<CartItemCard
								item={item}
								reload={this.fetchCartItems}
								index={index}/>
						)}
					</Box>
					<Box p={4}>
						<Button onClick={this.handleCheckout} variantColor="teal" size="md">
							Checkout
						</Button>
					</Box>
				</Box>
			</Flex>
		);
	}

}



export default Cart;
