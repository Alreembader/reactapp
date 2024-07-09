import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';
import '../App.css';

function AdminPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [catId, setCatId] = useState(0);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  // const [file, setFile] = useState(null);

  const fetchProducts = () => {
    axios
      .get("https://alreem-app22-43220fd1292e.herokuapp.com/api/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseAdd = () => {
    setShowAdd(false);
    setValidated(false);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setValidated(false);
  };

  const handleShowAdd = () => { 
    setFile(null);  //newwwwwwwwwww
    setShowAdd(true); }

  const handleShowEdit = (product) => {
    setProductId(product.ProductId);
    setProductName(product.ProductName);
    setDescription(product.Description);
    setPrice(product.Price);
    setImage(product.Image);
    setCatId(product.CategoryId);
    setShowEdit(true);
    setFile(true); // newwwwwwwwwwwwww
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (showEdit) {
        ProductEdit(productId);
        setShowEdit(false);
      } else {
        ProductAdd();
      }
    }
    setValidated(true);
  };


    const ProductEdit =async (ProductId) => {
      if(file) {
      const url = 'https://alreemreact-app-755910eac1b1.herokuapp.com/images';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
      }
    try {
      const response = await 
      axios.put(`https://alreem-app22-43220fd1292e.herokuapp.com/api/product/${ProductId}`,
    {
      productName: productName, 
      description: description, 
      price:price,
      image:image,
      categoryId: catId
    });
    handleCloseEdit();
    fetchProducts();  
    } catch (error) {
      alert("error:" + error)    
    }
  };

    const ProductAdd = async () => {
    try {
      await axios.post("https://alreem-app22-43220fd1292e.herokuapp.com/api/product",  {
      productName: productName, 
      description: description, 
      price:price,
      image:image,
      categoryId: catId
      });

      const url = 'https://alreemreact-app-755910eac1b1.herokuapp.com/images';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });

      handleCloseAdd();
      fetchProducts();
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const DeleteProduct = async (ProductId) => {
    const product = products.find((product) => product.ProductId === ProductId);
    if (!product) return;

    swal({
      title: `Are you sure you want to delete this Product?`,
      text: `-Name: ${product.ProductName}
      -Description: ${product.Description}
      Once deleted, you will not be able to recover this Product!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            await axios.delete(`https://alreem-app22-43220fd1292e.herokuapp.com/api/product/${ProductId}`);
            fetchProducts();
            swal(`Poof! The Product:
            -Name: ${product.ProductName}
            -Description: ${product.Description}
            has been deleted!`, {
              icon: "success",
            });
          } catch (error) {
            alert("Error: " + error);
          }
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  };
 
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
    setImage(event.target.files[0].name)
  }


  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'auto';

    // Re-enable scrolling on cleanup
    return () => {
        document.body.style.overflow = 'auto';
    };
}, []);
 
  return (
   
    <div className="container">
      {/* <div style={backgroundStyle}></div> */}
      <h1>Admin Page</h1>
      <Button variant="success" type="submit" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
       onClick={handleShowAdd}>
        Add Product
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category Id</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.ProductId}>
              <td>{p.ProductId}</td>
              <td>{p.ProductName}</td>
              <td>{p.Description}</td>
              <td>{p.Price}</td>
              <td><img src={`images/${p.Image}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }} /></td>
              <td>{p.CategoryId}</td>
              <td onClick={() => handleShowEdit(p)}><i className="bi bi-pencil-fill"></i> Edit</td>
              <td onClick={() => DeleteProduct(p.ProductId)}><i className="bi bi-trash3-fill"></i> Delete</td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={productName}
                placeholder="Enter Product Name"
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a product name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a description.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="text"
                value={price}
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a price.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                required
                type="file"
                // onChange={(e) => setImage(e.target.value)}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please upload an image.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCatId">
              <Form.Label>Category </Form.Label>
              <Form.Control
                required
                type="text"
                value={catId}
                placeholder="Enter Category Id"
                onChange={(e) => setCatId(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a category id.</Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Close
              </Button>
              <Button variant="primary" onSubmit={handleSubmit} type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={productName}
                placeholder="Enter Product Name"
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a product name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a description.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="text"
                value={price}
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a price.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <div>
                <img src={`images/${image}`} style={{ width: '200px', height: '200px', objectFit: 'cover', marginBottom: '10px' }} />
              </div>
              <Form.Control
                
                type="file"
                // onChange={handleFile}
                // onChange={(e) => setImage(e.target.value)}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please upload an image.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCatId">
              <Form.Label>Category Id</Form.Label>
              <Form.Control
                required
                type="text"
                value={catId}
                placeholder="Enter Category Id"
                onChange={(e) => setCatId(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a category id.</Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button variant="primary" onSubmit={handleSubmit}  type="submit" >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminPage;
