import React from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import { Box, Image, Badge, Icon, Flex } from "@chakra-ui/core";
import Carousel from 'react-bootstrap/Carousel';


class Gallery extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			images: []
		}
	}


	componentDidMount = () => {
		this.fetchImages();
	}

	fetchImages = () => {
		const imageList = [];
		const data = {
			"id": this.props.id
		}
		axios.post("http://127.0.0.1:8000/list-images/", data).then((response) => {
			this.setState({
				images: response.data
			});
		});
	}



    render() {
		// const source = "https://bit.ly/2Z4KKcF";


		return (
			<Carousel>
				{this.state.images.map((image, index) => (
					<Carousel.Item>
						<img
						  className="d-block w-100"
						  src={image.path}
						  alt={"Slide No. " + index}
						/>
					</Carousel.Item>
				))}
			</Carousel>
	    );

	}
}


export default Gallery;
