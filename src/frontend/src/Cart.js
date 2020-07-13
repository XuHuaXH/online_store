import React from 'react';
import { SimpleGrid, Box, Flex, Heading, Button, Select } from "@chakra-ui/core";
import CartItemCard from "./CartItemCard.js";
import axios from 'axios';



class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			addresses: [],
			selectedAddress: -1
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

	fetchAddresses = () => {
		const token = localStorage.getItem('token');
		const config = {
   			headers: {
      			Authorization: "JWT " + token
   			}
		};
		axios.get('http://127.0.0.1:8000/list-addresses/', config).then((response) => {
			this.setState({
				addresses: response.data,
			});
		}).then(() => {
			console.log(this.state.addresses);
		})
	}

	handleSelect = (e) => {
		this.setState({
			selectedAddress: e.target.value
		});
	}

	componentDidMount = () => {
		this.fetchCartItems();
		this.fetchAddresses();
	}

	handleCheckout = () => {
		if (this.state.selectedAddress == -1) {
			alert("Please select a valid address");
		}
		const token = localStorage.getItem('token');
		const header = {
			headers: {
      			Authorization: "JWT " + token
   			}
		};
		const data = {
			"address": this.state.selectedAddress
		};

		axios.post('http://127.0.0.1:8000/create-order/', data, header)
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
						<Select
							placeholder="Select option"
							color="black"
							borderColor="black"
							onChange={this.handleSelect}>
							{this.state.addresses.map((address, index) => (
								<option value={address.id}>{address.street_number} {address.street_name}, {address.city}, {address.state} {address.zipcode}</option>
							))}
						</Select>
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
