import React from 'react';
import Nav from '../templates/Nav'
import Footer from '../templates/Footer'
import Form from './Form'
import api from '../../services/api';
import { userKey } from '../Signin/Signin';

import './Contato.css'
export default class Contato extends React.Component{


    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem(userKey))

        // console.log(this.props)
        // console.log(user,typeof(user))
        const res = await api.post('validateToken', user)
            .then(resp => {
                // console.log(resp.data)
                if (!resp.data) {

                    //   history.push('/Signin')
                    localStorage.removeItem(userKey)
                    alert('Sua sessão expirou, entre novamente para continuar')
                    this.props.history.push('/Signin')

                }
                if (resp.data) {
                    console.log(user.token)
                    const token = (user.token)
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                }
                //   this.setState({ loading: false })

            })
    }
    render() {
        

        return (
            
            <div className='mt-4 pt-5'>
                <Nav />
                <div className='mt-3 d-flex flex-column'>
                <div className='d-md-flex justify-content-around  m-3'>
                    <div className=''>

                <a  href="mailto:seuservico.suporte@gmail.com"><i style={{fontSize:'18px'}} class="fa fa-envelope text-decoration-none" aria-hidden="true">seuservico.suporte@gmail.com</i></a>
                    </div>
                    {/* <i class="fa fa-envelope" aria-hidden="true">seuservico.suporte@gmail.com</i> */}
                    {/* <i class="fa fa-whatsapp" aria-hidden="true">11954479511</i> */}
                    <p>
       <a style={{fontSize:'18px'}} className='' href="https://api.whatsapp.com/send?phone=5511954479511">      
       <i class="fa fa-whatsapp text-decoration-none" aria-hidden="true">(11)95447-9511</i>
       </a>
   </p>
                </div>

                <div
                    className='contato-conteiner m-1'
              
                >
                    <h3 className='text-center font-weight-bold'
                        style={{
                            color: 'white',
                            margin: '3px',
                            padding:'4px'
                    }}
                    >Fale conosco !</h3>
                <Form />
                </div>

            </div>

                <Footer />
            </div>
        )
    }
} 