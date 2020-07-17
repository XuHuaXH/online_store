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
			<Flex align="center" justify="center">
				<Flex w="100%" p={16}>
					<Flex w="61.8%" p={16} alignItems="left">
						<Gallery id={this.props.id}/>
					</Flex>
					<Flex w="38.2%" p={16} alignItems="right">
						<ProductInfo id={this.props.id}/>
					</Flex>
				</Flex>
			</Flex>
	    );
	}
}


export default OrderPanel;
