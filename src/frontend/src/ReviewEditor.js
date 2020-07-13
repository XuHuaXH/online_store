import React from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import { Box, Image, Badge, Icon, Flex, Heading, Divider, Input, Button, Textarea } from "@chakra-ui/core";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";
import ReviewCard from "./ReviewCard.js";

class ReviewEditor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			title: '',
			review: ''
		}
	}


	setRating = (i) => {
		this.setState({
			rating: i
		})
	}

	setTitle = (e) => {
		this.setState({
			title: e.target.value
		});
	}

	setReview = (e) => {
		this.setState({
			review: e.target.value
		});
	}

	handleSubmit = () => {
		let d = new Date();
		const time = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
		const data = {
			"product": this.props.id,
			"time": time,
			"title": this.state.title,
			"review": this.state.review,
			"rating": this.state.rating
		};
		const token = localStorage.getItem('token');
		const header = {
			headers: {
      			Authorization: "JWT " + token
   			}
		};
		axios.post('http://127.0.0.1:8000/add-review/', data, header).then(function (response) {
            console.log(response.data);
		}).then(() => {
            this.setState({
                rating: 0,
    			title: '',
    			review: ''
            });
        }).then(this.props.reload);
	}

    render() {
		return (
			<Box bg="yellow.50" align="center" justify="center">
				<Box bg="orange.50" w="90%" p={16} alignItems="center">
					<Box p={10} justify="center">
						<Heading as="h1" size="xl" color="gray.600">
							Write a review
						</Heading>
					</Box>
					<Box bg="yellow.50" align="center" justify="center">
						<FormControl p={3}>
							<Box p={3}>
								<FormLabel htmlFor="title">Title</FormLabel>
								<Input
									onChange={this.setTitle}
									borderColor="gray.500"
									placeholder="Give your review a short title."/>
							</Box>
							<Box p={3}>
								<FormLabel htmlFor="review">Review</FormLabel>
								<Textarea
									onChange={this.setReview}
									borderColor="gray.500"
									placeholder="What do you think of this product?"/>
							</Box>
							<Flex>
								<Box p={3} w="30%" fontWeight="semibold" alignItems="center">
				  	            Rating: {Array(5)
				  	              .fill("")
				  	              .map((_, i) => (
				  	                <Button
										width="10px"
										size="lg"
										onClick={() => this.setRating(i)}>
										<Icon
										  size="26px"
										  name="star"
										  key={i}
										  color={i <= this.state.rating ? "teal.500" : "gray.300"}
										/>
									</Button>
				  	              ))}
				  	          	</Box>
								<Box p={3}>
									<Button variantColor="teal" size="md" onClick={this.handleSubmit}>
										Submit
									</Button>
								</Box>
							</Flex>
						</FormControl>
					</Box>
				</Box>
			</Box>
	    );
	}
}


export default ReviewEditor;
