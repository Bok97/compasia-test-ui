import React, { useState, useEffect } from 'react';
import { ChakraProvider, Container, Spinner } from '@chakra-ui/react';
import SearchFilters from './components/SearchFilters';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import OrderReceipt from './components/OrderReceipt';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); 
  const productsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const params = {
        page: currentPage,
        limit: productsPerPage,
      };
      try {
        const response = await axios.get('/products', { params });
        const data = response.data;
        setProducts(data.data); 
        setTotalPages(Math.ceil(data.data.total / productsPerPage));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); 
  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      console.log(filters)
      const params = {
        page: 1, 
        limit: productsPerPage,
        ...filters,
      };
      const response = await axios.get('/products', { params });
      const data = response.data;
      setProducts(data.data);
      setTotalPages(Math.ceil(data.data.total / productsPerPage)); 
      setCurrentPage(1); // Reset to first page
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <ChakraProvider>
      <Container maxW="container.xl">
      <Router>
          <Routes>
            <Route path="/" element={
              <>
                <SearchFilters onSearch={handleSearch} />
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <ProductList products={products} />
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                  </>
                )}
              </>
            } />
            <Route path="/order-receipt" element={<OrderReceipt />} />
            {/* Add other routes as needed */}
          </Routes>
        </Router>
      </Container>
    </ChakraProvider>
  );
}

export default App;
