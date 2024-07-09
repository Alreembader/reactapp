import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { Card, Container, Row, Col, Form , InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProductList() {
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const[file, setFile] = useState('');

  const fetchProducts = () => {
    axios
      .get("http://localhost:3007/api/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  const fetchCategories = (categoryId) => {

if (categoryId==0){
  fetchProducts();
}
else{
    axios
      .get(`http://localhost:3007/api/productbycat/${categoryId}`)  
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

};
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const filteredProducts = products.filter((product) => {
    return (
      product.ProductName.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === '' || product.CategoryId === parseInt(selectedCategory))
    );
  });

  const backgroundStyle = {
    backgroundImage: 'url("/images/StockCake-Natural Skin Care_1720251363.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px) brightness(0.8)',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: -1,
  };
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'auto';

    // Re-enable scrolling on cleanup
    return () => {
        document.body.style.overflow = 'auto';
    };
}, []);

  return (
    <Container>

<div style={backgroundStyle}></div>
      <h1 className="my-4" >  </h1>

<Form className="mb-3">
        <Form.Group controlId="search">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by product name"
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="category" className="mt-3">
          {/* <Form.Label>Filter by Category</Form.Label> */}
          <Form.Select onChange= {(e) => {fetchCategories(e.target.value)}}>
            <option value="0">All Categories</option>
            <option value="1">Face Care</option>
            <option value="2">Body Care</option>
            <option value="3">Hair Care </option>

          </Form.Select>
        </Form.Group>
        
      </Form>


      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.ProductId}>
            
            <Card>
  <Card.Body className="d-flex flex-column align-items-center">
    <div className="d-flex justify-content-center" style={{ width: '100%', height: '200px' }}>
      <Card.Img 
        src={`images/${product.Image}`}
        style={{ width: 'auto', height: '100%', maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
      />
    </div>
    <Card.Title>{product.ProductName}</Card.Title>
    <Card.Text>
      {product.Description}
    </Card.Text>
    <Card.Text>
      Price: {product.Price} OMR
    </Card.Text>
    {/* <Card.Text>
      Category ID: {product.CategoryId}
    </Card.Text> */}
    {/* <Button variant="primary" type="submit">
      Add to Cart
    </Button> */}
    <Button variant="success" type="submit" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
  Add to Cart
</Button>
  </Card.Body>
</Card>

          </Col>
        ))}
      </Row>
   </Container>
  );
}

export default ProductList;
