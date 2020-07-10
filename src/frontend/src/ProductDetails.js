import React from 'react';
import {withRouter} from 'react-router';
import { Box, Image, Badge, Icon } from "@chakra-ui/core";
import OrderPanel from "./OrderPanel.js";
import Reviews from "./Reviews.js";

class ProductDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id
		}
	}

	componentDidMount = () => {

	}


    render() {
		return (
			<>
				<OrderPanel id={this.state.id}/>
				<Reviews />
			</>
	    );
	}
}


export default withRouter(ProductDetails);
