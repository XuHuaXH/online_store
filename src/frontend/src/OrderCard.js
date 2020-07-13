import React from 'react';
import axios from 'axios';
import { Box, Image, Badge, Icon, Heading, Text, Button, Flex } from "@chakra-ui/core";

class OrderCard extends React.Component {

	constructor(props) {
		super(props);
	}


    render() {
		const order = this.props.order;
		const bgColor = this.props.index % 2 === 0 ? "gray.200" : "white";
		return (
			<Flex p={5} w="100%" bg={bgColor}>
				<Flex w="100%" justify="center" alignItems="center">
					<Box p={5} w="90%">
						Order info
					</Box>
				</Flex>
    		</Flex>
	    );
	}
}


export default OrderCard;
