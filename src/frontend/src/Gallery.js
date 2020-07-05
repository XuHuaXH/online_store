import React from 'react';
import {withRouter} from 'react-router';
import { Box, Image, Badge, Icon, Flex } from "@chakra-ui/core";
import Carousel from 'react-bootstrap/Carousel';


class Gallery extends React.Component {

	constructor(props) {
		super(props);
	}



    render() {
		const source = "https://bit.ly/2Z4KKcF";


		return (
			<Carousel>
				<Carousel.Item>
					<img
					  className="d-block w-100"
					  src={source}
					  alt="First slide"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<img
					  className="d-block w-100"
					  src={source}
					  alt="Second slide"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<img
					  className="d-block w-100"
					  src={source}
					  alt="Third slide"
					/>
				</Carousel.Item>
			</Carousel>
	    );
	}
}


export default Gallery;
