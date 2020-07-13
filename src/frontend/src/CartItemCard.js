import React from 'react';
import axios from 'axios';
import { Box, Image, Badge, Icon, Heading, Text, Button, Flex } from "@chakra-ui/core";
import AddressEditor from "./AddressEditor.js";

class CartItemCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			item: this.props.item
		}
	}

	componentDidMount = () => {
	}

	handleDelete = () => {
		const url = "http://localhost:8000/cart-item/";
		const token = localStorage.getItem('token');
		const config = {
			headers: {
    			Authorization: "JWT " + token
  			},
  			data: {
				"id": this.props.item.id
			}
		}
		axios.delete(url, config).then(this.props.reload);
	}


    render() {
		const item = this.state.item;
		const bgColor = this.props.index % 2 === 0 ? "gray.200" : "white";
		return (
			<Flex p={5} w="100%" bg={bgColor}>
				<Heading fontSize="xl">{item.product.name}</Heading>
				<Flex w="100%" justify="center" alignItems="center">
					<Box p={5} w="90%">
						{item.product.price}
					</Box>
					<Box p={5} w="90%">
						Count: {item.count}
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
