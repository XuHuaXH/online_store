import React from 'react';
import { SimpleGrid, Box, Flex, Heading, Button } from "@chakra-ui/core";
import AddressCard from "./AddressCard.js";
import AddressForm from "./AddressForm.js";
import axios from 'axios';




class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addresses: [],
			orders: []
		}
	}

	componentDidMount() {
		// get user addresses
		const token = localStorage.getItem('token');
		const config = {
   			headers: {
      			Authorization: "JWT " + token
   			}
		}
		axios.get('http://127.0.0.1:8000/list-addresses/', config).then((response) => {
			this.setState({
				addresses: response.data,
			});
		});

		// get user past orders
		axios.get('http://127.0.0.1:8000/list-orders/', config).then( (response) => {
			this.setState({
				orders: response.data,
			});
		});
	}

	render() {
		return (
			<Flex bg="blue.50" w="100%" p={16} alignItems="center">
				<Box bg="red.50" w="100%" p={16} alignItems="center">
					<Heading p={5}>
						Address
					</Heading>
					<Box alignItems="center" justify="center">
						{this.state.addresses.map((address, index) =>
							<AddressCard address={address} index={index}/>
						)}
					</Box>
					<Box>
						<AddressForm reload={this.reload} />
					</Box>
				</Box>
			</Flex>
		);
	}

	reload() {
		// TODO
	}
}



export default Settings;
