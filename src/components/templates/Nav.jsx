import React, { Component } from 'react'
import {useHistory, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import NavDropdown from 'react-bootstrap/NavDropdown'
import FormControl from 'react-bootstrap/FormControl'
import { userKey } from '../Signin/Signin'
import api from '../../services/api'
import './Nav.css'
export default class Navig extends Component {

    state = {
        userId: '',
        userName: '',
        userEmail: '',
        search: '',
        actualUrl:' ',
    }
    
    async componentDidMount() {
        
        const data = JSON.parse(localStorage.getItem(userKey))
        const userId = data.id;
        const userName = data.name;
        const userEmail = data.email;
        
        // console.log(userId,userName,userEmail)
        this.setState({ userId, userName, userEmail })

        let picUploaded=0
        await api.get(`upload/${userId}`)
            .then(res => {
                
                picUploaded= res.data.data[0].picUploaded
            })
        if (picUploaded === 1) {
            const backendUrl='https://backend-ss-heroku.herokuapp.com/'
            const caminho_img=`/public/uploads/${userId}.jpg`
            
            // const img = require(`../../../public/uploads/${user.id}.jpg`)
            const img = backendUrl  + caminho_img 
            this.setState({ actualUrl: img })
        }
    }
    
//     handleLogout(){
//  //     e.preventDefault()
//      localStorage.removeItem(userKey)
    
//      //history.push('/signin')
//  }
    render() {
        
        //const history=useHistory()
        const { userName, userEmail, actualUrl } = this.state

        return (


            <div className='m-3 p-2'>

          
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed='top'>
                    <Navbar.Brand href="#home">
                        
                        <div className='brand-conteiner'>
                            
                    {actualUrl !== ' ' && <img width='5%' className='img-fluid rounded rounded-circle mr-1' src={actualUrl}/>}
                        
                   Olá {userName}
            </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto ml-2">
                        <NavDropdown title="Serviços" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#Home">Todos serviços</NavDropdown.Item>
                            <NavDropdown.Item href="#MyServices">Meus serviços</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#servicesAccepts">Serviços aceitos</NavDropdown.Item>
                        </NavDropdown>
                    <Nav.Link href="#Profile">Perfil</Nav.Link> 
                    <Nav.Link href="#About">Ajuda</Nav.Link> 
                    <Nav.Link href="#Contato">Contato</Nav.Link> 
                    </Nav>
                    <Nav>

                    </Nav>
                    <Link to='signin'>

                        <button type='button'
                            style={{width:'100%',borderRadius:'10px',border:'none'}}
                        className='btn btn-dark' 
                        onClick={e => {
                            
                            localStorage.removeItem(userKey)
                            // history.push('/signin')
                            alert('Deslogado com sucesso')
                            
                            
                        }}
                            >
                                <div className='d-flex flex-row'> 
                                <i class="fa fa-sign-out" aria-hidden="true"></i>Sair
                                </div>
                        </button>
                        </Link>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}