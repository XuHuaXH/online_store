import React from 'react';
import axios from 'axios';
import { Box, Image, Badge, Icon, Heading, Text, Button, Flex } from "@chakra-ui/core";
import AddressEditor from "./AddressEditor.js";

class CartItemCard extends React.Component {

	constructor(props) {
		super(props);
	}

	handleDelete = () => {
		const url = "http://localhost:8000/address/";
		const token = localStorage.getItem('token');
		const config = {
			headers: {
    			Authorization: "JWT " + token
  			},
  			data: {
    			
			}
		}
		axios.delete(url, config).then(this.props.reload());
	}


    render() {

		const bgColor = this.props.index % 2 === 0 ? "gray.200" : "white";
		return (
			<Flex p={5} w="100%" bg={bgColor}>
				<Heading fontSize="xl">product name</Heading>
				<Flex w="100%" justify="center" alignItems="center">
					<Box p={5} w="90%">
						???
					</Box>
					<Flex w="20%">
						<Box p={2}>
							<Button onClick={this.handleDelete} variantColor="teal" size="md">
							Delete
							</Button>
						</Box>
					</Flex>
				</Flex>
    		</Flex>
	    );
	}
}


export default CartItemCard;
