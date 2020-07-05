import React from 'react';
import { Box, Image, Badge, Icon, Heading, Text, Button, Flex } from "@chakra-ui/core";

class AddressCard extends React.Component {

	constructor(props) {
		super(props);
	}

    render() {
		const address = this.props.address;
		const bgColor = this.props.index % 2 === 0 ? "gray.200" : "white";
		console.log(this.props.index);
		return (
			<Flex p={5} w="100%" bg={bgColor}>
				<Heading fontSize="xl">{address.name}</Heading>
				<Flex w="100%" justify="center" alignItems="center">
					<Box p={5} w="90%">{address.street_number} {address.street_name}, {address.city}, {address.state} {address.zipcode}
					</Box>
					<Box w="10%">
						<Button variantColor="teal" size="md">
							Edit
						</Button>
					</Box>
				</Flex>
    		</Flex>
	    );
	}
}


export default AddressCard;
