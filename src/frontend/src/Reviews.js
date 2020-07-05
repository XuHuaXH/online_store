import React from 'react';
import {withRouter} from 'react-router';
import { Box, Image, Badge, Icon, Flex, Heading, Divider } from "@chakra-ui/core";
import ReviewCard from "./ReviewCard.js";

class Review extends React.Component {

	constructor(props) {
		super(props);
		const reviews = [
			{
				author: "Ada Ada",
				date: "06/08/20",
				title: "very satisfied",
				review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				rating: 5
			},
			{
				author: "joe Joe",
				date: "06/01/19",
				title: "very satisfied",
				review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				rating: 4
			},
			{
				author: "Iris Iris",
				date: "13/04/20",
				title: "very satisfied",
				review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				rating: 3
			}
		];
		this.state = {
			reviews: reviews
		}
	}



    render() {
		return (
			<Flex bg="yellow.50" align="center" justify="center">
				<Box bg="orange.50" w="90%" p={16} alignItems="center">
					<Box p={10} justify="center">
						<Heading as="h1" size="xl" color="gray.600">
							Customer Reviews
						</Heading>
					</Box>
					<Box bg="yellow.50" align="center" justify="center">
						{this.state.reviews.map((review, index) =>
							<ReviewCard review={review} index={index}/>
						)}
					</Box>
				</Box>
			</Flex>
	    );
	}
}


export default Review;
