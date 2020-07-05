import React from 'react';
import { Box, Image, Badge, Icon } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductDetails from "./ProductDetails.js";

class ProductCard extends React.Component {

	constructor(props) {
		super(props);
		const product = this.props.product;
		this.state = {
			id: product.id,
			imageUrl: "https://bit.ly/2Z4KKcF",
			imageAlt: "Rear view of modern home with pool",
			name: product.name,
			formattedPrice: "$" + product.price,
			description: product.description,
			reviewCount: 34,
			rating: 4,
		}
	}

    render() {
		return (
		<Link to={"/product/" + this.state.id}>
	      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
	        <Image src={this.state.imageUrl} alt={this.state.imageAlt} />

	        <Box p="6">
	          <Box d="flex" alignItems="baseline">
	            <Badge rounded="full" px="2" variantColor="teal">
	              New
	            </Badge>
	          </Box>

	          <Box
	            mt="1"
	            fontWeight="semibold"
	            as="h4"
	            lineHeight="tight"
	            isTruncated
	          >
	            {this.state.name}
	          </Box>

	          <Box>
	            {this.state.formattedPrice}
	          </Box>
			  <Box>
	            {this.state.description}
	          </Box>

	          <Box d="flex" mt="2" alignItems="center">
	            {Array(5)
	              .fill("")
	              .map((_, i) => (
	                <Icon
					  name="star"
	                  key={i}
	                  color={i < this.state.rating ? "teal.500" : "gray.300"}
	                />
	              ))}
	            <Box as="span" ml="2" color="gray.600" fontSize="sm">
	              {this.state.reviewCount} reviews
	            </Box>
	          </Box>
	        </Box>
	      </Box>
		  </Link>

	    );
	}
}


export default ProductCard;
