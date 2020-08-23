import './Footer.css'
import React from 'react'

export default props=>
    <footer className="footer mt-0">


        <div className='footdados'> 
            <div className='contatos'>
                <p className='hd font-weight-bold'>CONTATO</p>
        
      <div className='d-flex'>
          
       <p>
           <a className='tx' href="https://api.whatsapp.com/send?phone=5511954479511">      
           <i class="fa fa-whatsapp" aria-hidden="true"></i>(11)95447-9511
           </a>
       </p>
        {/* <p className='ml-2'>
            <a className='tx' href="tel:+5511954479511"><i class="fa fa-phone" aria-hidden="true"></i>(11)95447-9511</a>
        </p> */}
        
        <p className='ml-2'>
        <a className='tx' href="mailto:seuservico.suporte@gmail.com"><i class="fa fa-envelope" aria-hidden="true"></i> seuservico.suporte@gmail.com</a>
        </p> 
      </div>
            </div>
        
            <div className='breveap'>
                <p className='hd font-weight-bold'>Seu Serviço</p>
                <p className='tx mb-0 pb-0 ml-3'> Plataforma digital de serviços</p>
            </div>


        </div> 
        <div className='copy'>
        <p className='tx font-weight-lighter' >
        Copyright 2020 <i class="fa fa-copyright" aria-hidden="true"></i>Seu Serviço 
        </p>
             
        </div>

</footer> 