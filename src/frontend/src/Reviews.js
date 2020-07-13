import React from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import { Box, Image, Badge, Icon, Flex, Heading, Divider, Input, Radio, RadioGroup } from "@chakra-ui/core";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";
import ReviewCard from "./ReviewCard.js";
import ReviewEditor from "./ReviewEditor.js";

class Review extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			reviews: []
		}
	}

	componentDidMount = () => {
		this.fetchReviews();
	}

	fetchReviews = () => {
		const token = localStorage.getItem('token');
		const header = {
			headers: {
				Authorization: "JWT " + token
			}
		};
		const data = {
			"id": this.props.id
		}

		axios.post('http://127.0.0.1:8000/list-reviews/', data, header).then( (response) => {
			this.setState({
				reviews: response.data,
			});
		});
	}




    render() {
		return (
			<Box bg="yellow.50" align="center" justify="center">
				<ReviewEditor id={this.props.id} reload={this.fetchReviews}/>
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
			</Box>
	    );
	}
}


export default Review;
