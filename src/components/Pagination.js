import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    console.log(totalPages, currentPage, onPageChange)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <Box display="flex" justifyContent="center" p={4}>
      {pageNumbers.map(number => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          colorScheme={currentPage === number ? 'teal' : 'gray'}
          m={1}
        >
          {number}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
