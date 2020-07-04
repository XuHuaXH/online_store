import React from 'react';
import {withRouter} from 'react-router';
import { Box, Image, Badge, Icon } from "@chakra-ui/core";

class ProductDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id
		}
	}



    render() {
		return (
			<h1>
				This is product with id {this.state.id}.
			</h1>
	    );
	}
}


export default withRouter(ProductDetails);
