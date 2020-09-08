import React from 'react'
import NavInitial from './NavInitial'
import Footer from '../templates/Footer'
export default function AboutUs() {
    
    return (
        <div>
            <NavInitial />
            <div className='about-content d-flex flex-column mb-5 pb-5'>
                {/* <h3 className='text-center font-weight-bold'> Conheça mais sobre nós</h3> */}
                
                <h4
                style={{color:"#1B3B4D"}}
                    className=' mt-4 pt-3 text-center font-weight-bold'>Missão</h4>
                <h6 className='text-center font-weight-bold'>Unir nossos usuários que oferecem serviços aos que o saibam fazer</h6>
                <h4
                    style={{ color: "#1B3B4D" }}
                    className=' mt-4 pt-3 text-center font-weight-bold'>Visão</h4>
                 <h6 className='text-center font-weight-bold'>Ser uma plataforma completa que conecta a sociedade</h6>
                <h4
                     style={{color:"#1B3B4D"}}
                    className=' mt-4 pt-3 text-center font-weight-bold'>Valores</h4>
           <h6 className='text-center font-weight-bold'>Somos movidos pelos usuários, </h6>
           <h6 className='text-center font-weight-bold'>nosso foco é oferecer ajuda àqueles que precisam que algo seja feito e àqueles que precisam de renda extra </h6>
            </div>
            <Footer />
        </div>
    )
}