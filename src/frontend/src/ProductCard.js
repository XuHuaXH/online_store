import React from 'react';
import { Box, Image, Badge, Icon } from "@chakra-ui/core";

function ProductCard(props) {
	const product = {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      name: props.product.name,
      formattedPrice: "$" + props.product.price,
	  description: props.product.description,
      reviewCount: 34,
      rating: 4,
    };

    return (
      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
        <Image src={product.imageUrl} alt={product.imageAlt} />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="teal">
              New
            </Badge>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {product.name}
          </Box>

          <Box>
            {product.formattedPrice}
          </Box>
		  <Box>
            {product.description}
          </Box>

          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
				  name="star"
                  key={i}
                  color={i < product.rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {product.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    );
}


export default ProductCard;
