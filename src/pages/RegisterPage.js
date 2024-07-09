import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


function RegisterPage({onCreatedUser}) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();


  const createUser = async() => {
    try {
        const response = await axios.post("http://localhost:3005/api/users",{
            name: name,
            email: email, 
            password: password
        });
        alert('Registration completed successfully!');
        onCreatedUser(); 
        setConfirm(''); 
        setValidated(false); 
        setShow(false);
        navigate('/LoginPage');
    } catch (error) {
        alert("Error:" +error);    
    }
  };
  const handleClose = () => {
    setShow(false)
    setValidated(false);
    };

  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || check === 'block') {
      event.preventDefault();
      event.stopPropagation();
    }else{
    createUser(); //insert into database  
    event.preventDefault();
    event.stopPropagation();
    handleClose();

    }
    setValidated(true);
  };
  const [check, setCheck] = useState('none');
  const [isValid, setIsValid] = useState(false);

  const checkMatch = () => {
    if (confirm !== password) {
      setCheck("block"); 
      setIsValid(true); 
    }
    else{
      setCheck("none"); 
      setIsValid(false); 
    }  
  }; //end checkMatch 

      useEffect(() => {
      }, []);

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
        <h1 style={h1Style}>Welcome to Register Page</h1>
  <Button variant="success" type="submit" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
   onClick={handleShow}> 
  <FontAwesomeIcon icon= {faUser} style={{ marginRight: '0.5rem' }} />
  Create an Account
</Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
               required
                type="text"
                placeholder="enter your name"
                autoFocus
                onChange={(e) => {setName(e.target.value)}}
              />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Please choose a username</Form.Control.Feedback>
            </Form.Group>
         
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              required
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => {setEmail(e.target.value)}}
              />
               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
               <Form.Control.Feedback type='invalid'>Please choose an email</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
              required
                type="password"
                placeholder="enter password"
                autoFocus
                onChange={(e) => {setPassword(e.target.value)}}
              />
               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
               <Form.Control.Feedback type='invalid'>Please choose a password</Form.Control.Feedback>
              </Form.Group>
         
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
              required
                type="password"
                value={confirm}
                isInvalid={isValid}
                onBlur={() => checkMatch()}
                onChange= {(e) => { setConfirm(e.target.value)}}
                placeholder="confirm password"
                autoFocus
              />  
           
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback style= {{display:check}} type='invalid'>Please confirm the password</Form.Control.Feedback>
            </Form.Group>

            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
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

export default RegisterPage;

