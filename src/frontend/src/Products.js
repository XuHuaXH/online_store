import React from 'react';
import { SimpleGrid, Box, Flex } from "@chakra-ui/core";
import axios from 'axios';
import ProductCard from './ProductCard.js';




class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productsPerPage : 12,
			productList: []
		}
	}

	componentDidMount() {
		let list = [];
		axios.get("http://localhost:8000/list-products/").then((response) => {
			list = response.data;
			this.setState({
				productList: list
			});
		});
	}

	render() {
		return (
			<Flex bg="blue.50" align="center" justify="center">
				<Box w="75%" p={16} alignItems="center">
					<SimpleGrid columns={3} spacing={35}>
						{this.state.productList.map((product, index) => (
							<ProductCard product={product} index={index}/>
						))}
					</SimpleGrid>
				</Box>
			</Flex>
		);
	}
}



export default Products;
