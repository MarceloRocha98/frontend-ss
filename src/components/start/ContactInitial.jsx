import React from 'react'
import NavInitial from './NavInitial'
import Form from '../Contato/Form'
import Footer from '../templates/Footer'


export default function ContactInitial() {
    
    return (
            
        <div className='mt-4 pt-5'>
            <NavInitial />
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
