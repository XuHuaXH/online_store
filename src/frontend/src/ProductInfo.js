import React from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import { Box, Image, Badge, Icon, Flex, Heading, Button, Divider } from "@chakra-ui/core";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core";

class ProductInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			product: {

			},
			orderSize: 0
		}
	}

	componentDidMount = () => {
		this.fetchProduct();
	}

	fetchProduct = () => {
		const data = {
			"id": this.props.id
		}
		axios.post("http://localhost:8000/product/", data).then((response) => {
			this.setState({
				product: response.data
			});
			console.log(response.data);
		});
	}

	handleAddToCart = () => {
		const url = "http://localhost:8000/add-item/";
		const token = localStorage.getItem('token');
		const data = {
			"product" : this.props.id,
			"count" : this.state.orderSize
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

	changeOrderSize = (size) => {
		this.setState({
			orderSize: size
		});
		console.log(this.state.orderSize);
	}



    render() {
		return (
		<Box mt="3" alignItems="center">
			<Heading as="h1" size="xl">
				{this.state.product.name}
			</Heading>
	        <Box mt="3" d="flex" alignItems="baseline">
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
					{this.state.product.short_description}
				</Box>
	        </Box>
	        <Box d="flex" mt="3" fontWeight="semibold" alignItems="center">
	        	${this.state.product.price}
	        </Box>
			<Box d="flex" mt="3" alignItems="center">
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


			<Divider />
			<Flex mt="4">
				<NumberInput w="30%" defaultValue={1} min={1} max={20} onChange={this.changeOrderSize}>
					<NumberInputField
						borderColor="gray.500" />
					<NumberInputStepper>
					<NumberIncrementStepper borderColor="gray.500" color="gray.500"/>
					<NumberDecrementStepper borderColor="gray.500" color="gray.500"/>
					</NumberInputStepper>
				</NumberInput>
				<Box w="10%"/>
				<Button onClick={this.handleAddToCart} variantColor="teal" size="md">
					Add to cart
				</Button>
			</Flex>

			<Flex mt="3"
			  fontSize="s"
	          lineHeight="tight"
	        >
	        	{this.state.product.long_description}
	        </Flex>
		</Box>
	    );
	}
}


export default ProductInfo;
