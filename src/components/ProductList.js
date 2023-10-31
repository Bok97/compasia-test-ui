import React, { useState } from 'react';
import { Box, SimpleGrid, Image, Text, HStack, Badge, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductList({ products }) {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState({});

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  const handleColorSelection = (productId, colorId) => {
    setSelectedColor({
      ...selectedColor,
      [productId]: colorId,
    });
  };

  const handlePurchase = async (product) => {
    const colorId = selectedColor[product.productId];
    if (!colorId) {
      console.error('No color selected for product', product.productId);
      return;
    }

    const orderDetails = {
      product: {
        productId: product.productId,
        price: product.price,
        colorId: colorId,
      },
      total: product.price
    };

    try {
      await axios.post('/orders', orderDetails);
      navigate('/order-receipt');
    } catch (error) {
      console.error('Purchase failed', error);
    }
  };

  return (
    <Box>
      <SimpleGrid columns={3} spacing={10}>
        {products.data.map((product) => (
          <Box key={product.productId} boxShadow="sm" p="6" rounded="md" bg="white">
            <Image src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} borderRadius="md" />
            <Text fontWeight="bold" mt="3">{product.name}</Text>
            <Text>{product.brand}</Text>
            <HStack spacing={1} mt="2">
              {product.colors.map((color) => (
                <Badge
                  key={color.id}
                  colorScheme="gray"
                  borderRadius="full"
                  px="2"
                  cursor="pointer"
                  onClick={() => handleColorSelection(product.productId, color.id)}
                  bg={selectedColor[product.productId] === color.id ? "teal.100" : undefined}
                >
                  {color.name}
                </Badge>
              ))}
            </HStack>
            <Button colorScheme="blue" mt="4" onClick={() => handlePurchase(product)}>
              Purchase
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
