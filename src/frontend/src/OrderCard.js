import React from 'react';
import axios from 'axios';
import { Box, Image, Badge, Icon, Heading, Text, Button, Flex, Divider } from "@chakra-ui/core";

class OrderCard extends React.Component {

	constructor(props) {
		super(props);
	}


    render() {
		const order = this.props.order;
		const bgColor = this.props.index % 2 === 0 ? "gray.200" : "white";
		return (
			<Flex p={5} w="100%" bg={bgColor}>
				<Box w="100%" justify="center" alignItems="center">
					<Box>
						Order placed: {this.props.order.time}
					</Box>
					<Box>
						Shipping to: {this.props.order.shipping_address}
					</Box>
					<Divider />
					<Box>
						{order.order_items.map((orderItem, index) => (
							<>
							<Box>
								{orderItem.item.name}
							</Box>
							<Box>
								Price: ${orderItem.item.price}
							</Box>
							<Box>
								Count: {orderItem.count}
							</Box>
							<Divider />
							</>
						))}
					</Box>
					<Box>
						Total Price: ${this.props.order.total_price}
					</Box>
				</Box>
    		</Flex>
	    );
	}
}


export default OrderCard;
