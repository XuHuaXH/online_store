import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import * as Constants from "./Constants.js";


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
		const data = {
			"id": this.props.id
		}
		axios.post(Constants.BASE_URL + ":" + Constants.PORT + "/list-images/", data).then((response) => {
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
