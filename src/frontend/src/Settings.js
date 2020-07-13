import React from 'react';
import { SimpleGrid, Box, Flex, Heading, Button } from "@chakra-ui/core";
import AddressCard from "./AddressCard.js";
import AddressForm from "./AddressForm.js";
import OrderCard from "./OrderCard.js";
import axios from 'axios';



class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addresses: [],
			orders: []
		}
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
		});
	}

	fetchOrders = () => {

		const token = localStorage.getItem('token');
		const config = {
   			headers: {
      			Authorization: "JWT " + token
   			}
		}

		axios.get('http://127.0.0.1:8000/list-orders/', config).then( (response) => {
			this.setState({
				orders: response.data,
			});
		}).then(() => {
			console.log(this.state.orders);
		});
	}

	componentDidMount = () => {
		this.fetchAddresses();
		this.fetchOrders();
	}

	render() {
		return (
			<Box bg="blue.50" w="100%" p={16} alignItems="center">
				<Box bg="red.50" w="100%" p={16} alignItems="center">
					<Heading p={5}>
						Address
					</Heading>
					<Box alignItems="center" justify="center">
						{this.state.addresses.map((address, index) =>
							<AddressCard
								address={address}
								reload={this.fetchAddresses}
								index={index}/>
						)}
					</Box>
					<Box p={4}>
						<AddressForm reload={this.fetchAddresses} />
					</Box>
				</Box>

				<Box bg="red.50" w="100%" p={16} alignItems="center">
					<Heading p={5}>
						Orders
					</Heading>
					<Box alignItems="center" justify="center">
						{this.state.orders.map((order, index) =>
							<OrderCard
								order={order}
								reload={this.fetchOrder}
								index={index}/>
						)}
					</Box>
				</Box>
			</Box>
		);
	}

}



export default Settings;
