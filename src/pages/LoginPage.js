
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const adminEmail = 'admin@gmail.com'; 

  const handleClose = () => {
    setShow(false);
    setValidated(false);
    setEmail('');
    setPassword('')
   
  };

  const login = async(email, password) => {
    try {
      const response = await axios.get(`https://alreem-app-a1759fa6576e.herokuapp.com/api/users/${email}/${password}`);
      if(response.data.length > 0){
        alert('Login completed successfully!');
        setErrorMessage('');
        handleClose();
        if (email === adminEmail) {
          navigate('/AdminPage'); 
        } else {
          navigate('/ProductList'); 
        }
      } else {
        setErrorMessage('Invalid email or password.');
        setValidated(false);
      }
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    }
  };

  const handleShow = () => {
    setEmail('');
    setPassword('');
     setShow(true)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();


    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      login(email, password);
      event.preventDefault();
    }

    setValidated(true);
  
  };
  const style = {
    position: 'relative',
    height: '140vh',
    width: '100vw',
    color: 'white',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const backgroundStyle = {
    backgroundImage: 'url("/images/StockCake-Natural Skin Care_1720251363.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px) brightness(1.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
  };

  const h1Style = {
    marginTop: '-250px',
    fontFamily: '"Georgia", serif',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on cleanup
    return () => {
        document.body.style.overflow = 'auto';
    };
}, []);
  return (
    <>

<div style={style}>
      <div style={backgroundStyle}></div>
      <div style={contentStyle}>
      <h1 style={h1Style}>Welcome to Login Page</h1>
      <Button variant="success" type="submit" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
      onClick={handleShow}>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
        Login
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter a valid email.</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Please enter your password.</Form.Control.Feedback>
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type='submit'>
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      </div>
      </div>

    </>
  );
}

export default LoginPage;

