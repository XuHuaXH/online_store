import React from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import { Box, Image, Badge, Icon, Flex, Heading, Button } from "@chakra-ui/core";

class ProductInfo extends React.Component {

	constructor(props) {
		super(props);
	}

	handleAddToCart = () => {
		const url = "http://localhost:8000/add-item/";
		const token = localStorage.getItem('token');
		const data = {
			"product" : this.props.id,
			"count" : 1
		}
		const header = {
			headers: {
      			Authorization: "JWT " + token
   			}
		};
		axios.post(url, data, header)
		.then((response) => {
			console.log(response.data);
		});
	}



    render() {
		return (
		<Box mt="2" alignItems="center">
			<Heading as="h1" size="xl">
				Product Name
			</Heading>
			<Box
	          mt="1"
	          fontWeight="semibold"
	          as="h4"
	          lineHeight="tight"
	          isTruncated
	        >
	        	short description
	        </Box>
	        <Box d="flex" alignItems="baseline">
				<Badge rounded="full" px="2" variantColor="teal">
					New
				</Badge>
				<Box
				color="gray.500"
				fontWeight="semibold"
				letterSpacing="wide"
				fontSize="xs"
				textTransform="uppercase"
				ml="2"
				>
					23 beds &bull; 56 baths
				</Box>
	        </Box>

	        <Box d="flex" mt="2" alignItems="center">
	        	$35.65
	        </Box>

	        <Box d="flex" mt="2" alignItems="center">
	          {Array(5)
	            .fill("")
	            .map((_, i) => (
	              <Icon
				  	name="star"
	                key={i}
	                color={i < 5 ? "teal.500" : "gray.300"}
	              />
	            ))}
	          <Box as="span" ml="2" color="gray.600" fontSize="sm">
	            56 reviews
	          </Box>
	        </Box>
			<Box p={3}>
				<Button onClick={this.handleAddToCart} variantColor="teal" size="md">
					Add to cart
				</Button>
			</Box>
			<Flex
			  fontSize="s"
	          lineHeight="tight"
	        >
	        	long description long description long description long description long description long description long description long description long description long description long description long description long description long description long description long description long description long description long description
	        </Flex>
		</Box>
	    );
	}
}


export default ProductInfo;
