import React from 'react';
import {withRouter} from 'react-router';
import { Box, Image, Badge, Icon, Flex } from "@chakra-ui/core";
import Gallery from "./Gallery.js";
import ProductInfo from "./ProductInfo.js";

class OrderPanel extends React.Component {

	constructor(props) {
		super(props);
	}



    render() {
		return (
			<Flex bg="green.50" align="center" justify="center">
				<Flex bg="blue.50" w="100%" p={16}>
					<Flex bg="red.50" w="61.8%" p={16} alignItems="left">
						<Gallery />
					</Flex>
					<Flex bg="purple.50" w="38.2%" p={16} alignItems="right">
						<ProductInfo id={this.props.id}/>
					</Flex>
				</Flex>
			</Flex>
	    );
	}
}


export default OrderPanel;
