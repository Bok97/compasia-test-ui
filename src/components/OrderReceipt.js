import React, { useState, useEffect } from 'react';
import { Box, Flex, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

const itemsPerPage = 5;

function OrderReceipt() {
  const [orderItems, setOrderItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  useEffect(() => {
    const fetchOrderItems = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: itemsPerPage,
        };
        const response = await axios.get('/orders', { params });
        setOrderItems(response.data.data.data || []);
        setTotalItems(response.data.data.total || 0);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [currentPage]);

  const maxPage = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  if (loading) return <Spinner size="xl" />;
  if (error) return <Box>Failed to load order items: {error}</Box>;

  const orderEntries = orderItems.map((order, index) => (
    <Tr key={order.documentNumber || index}>
      <Td>{order.orderDateTime}</Td>
      {order.products.map((product) => (
        <React.Fragment key={product.id}>
          <Td>{product.name}</Td>
          <Td>{product.color}</Td>
          <Td>{product.price}</Td>
        </React.Fragment>
      ))}
    </Tr>
  ));

  return (
    <Box p="6">
      <Button colorScheme="teal" onClick={goBack} mb="4">Back</Button>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Product ID</Th>
              <Th>Product Name</Th>
              <Th>Product Color</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderEntries}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination totalPages={maxPage} currentPage={currentPage} onPageChange={handlePageChange} />
    </Box>
  );
}

export default OrderReceipt;
