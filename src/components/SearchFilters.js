// SearchFilters.js
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Input,
  Select,
  Button,
  Heading
} from '@chakra-ui/react';
import axios from 'axios';

export default function SearchFilters({ onSearch }) {
  const [name, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const categoriesData = await axios.get('/categories');
        const colorsData = await axios.get('/colors');
        const brandsData = await axios.get('/brands');
        setCategories(categoriesData.data.data);
        setColors(colorsData.data.data);
        setBrands(brandsData.data.data);
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };
    
    fetchFilterData();
  }, []);

  const handleSearch = () => {
    onSearch({
      name,
      brand: selectedBrand,
      category: selectedCategory,
      color: selectedColor
    });
  };

  return (
    <Flex direction="column" mb="4">
      <Heading size="md" mb="4">Search Filters</Heading>
      <Input
        placeholder="Search by name"
        value={name}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb="2"
      />
      <Select placeholder="Select Brand" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} mb="2">
        {brands.map(brand => <option key={brand.id} value={brand.name}>{brand.name}</option>)}
      </Select>
      <Select placeholder="Select Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} mb="2">
        {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
      </Select>
      <Select placeholder="Select Color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} mb="4">
        {colors.map(color => <option key={color.id} value={color.name}>{color.name}</option>)}
      </Select>
      <Button colorScheme="teal" onClick={handleSearch}>Search</Button>
    </Flex>
  );
}
