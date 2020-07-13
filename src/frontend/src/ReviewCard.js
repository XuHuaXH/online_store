import React from 'react';
import { Box, Image, Badge, Icon, Divider, Flex } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductDetails from "./ProductDetails.js";

class ReviewCard extends React.Component {

	constructor(props) {
		super(props);
		const review = this.props.review;
		this.state = {
            id: review.id,
			author: review.author,
			time: review.time,
			title: review.title,
			review: review.review,
			rating: review.rating
		}
	}

    render() {
		return (
            <Flex>
				<Box p={10}>
					<Box>
					  {this.state.author}
					</Box>
					<Box as="span" color="gray.600" fontSize="sm">
	  				  {this.state.time}
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
	  	          	</Box>
				</Box>

				<Box p={10}>
					<Box
					fontWeight="semibold"
					as="h2"
					lineHeight="tight"
					fontSize="xl"
					isTruncated
					>
						{this.state.title}
					</Box>
					<Box>
						{this.state.review}
					</Box>
				</Box>
	    	</Flex>
	    );
	}
}


export default ReviewCard;
