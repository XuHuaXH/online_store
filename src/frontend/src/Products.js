import React from 'react';
import { SimpleGrid, Box, Flex } from "@chakra-ui/core";




function Products() {
	return (
		<Flex bg="blue.50" align="center" justify="center">
			<Box w="75%" p={16} alignItems="center">
				<SimpleGrid columns={3} spacing={35}>
					<Box bg="tomato" height="350px"></Box>
					<Box bg="tomato" height="350px"></Box>
					<Box bg="tomato" height="350px"></Box>
					<Box bg="tomato" height="350px"></Box>
					<Box bg="tomato" height="350px"></Box>
				</SimpleGrid>
			</Box>
		</Flex>
	);
}



export default Products;
