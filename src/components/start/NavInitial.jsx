import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useHistory } from 'react-router'
import logotipo from '../../assets/logotipo.png'


export default function NavInitial() {
    const history = useHistory();

    return (
        <div className='mb-5 pb-4'>
        <Navbar collapseOnSelect='true' fixed='top' bg="white" expand="md"> 

<div className='navbar container-fluid'>
    
<div className='Logo '> 
     
                    <Navbar.Brand href="#Start">
                <img
                  width="50%"
                
                  src={logotipo} alt="logo" />
                    </Navbar.Brand>

</div>

<div className='links'>
    
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse  id="basic-navbar-nav">
<Nav className="mr-auto">
  <Nav.Link href="#/">Home</Nav.Link>
  <Nav.Link href="#AboutUs">Sobre nós</Nav.Link>
    
  <Nav.Link href="#ContactInitial">Contato</Nav.Link>
  <button
  onClick={e=>history.push('/Signin')}
   className='btn btn-info mr-1 mb-1'
   ><i class="fa fa-sign-in mr-1" aria-hidden="true"></i>Entrar</button>
  <button 
    onClick={e=>history.push('/Register')}
  className='btn btn-info mb-1'><i class="fa fa-user-plus mr-1" aria-hidden="true"></i>Registrar</button>
  
</Nav>
</Navbar.Collapse>
    </div>
    
    </div>
</Navbar>
</div>
    )
}