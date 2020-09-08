import React,{useState} from 'react'
import { useHistory } from 'react-router'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../assets/IMGTEST.png'
import guia1 from '../../assets/guia1.png'
import guia2 from '../../assets/guia2.png'
import guia3 from '../../assets/guia3.png'
import guia4 from '../../assets/guia4.png'
import guia5 from '../../assets/guia5.png'
import guia6 from '../../assets/guia6.png'
import './Start.css'
import Footer from '../templates/Footer'
import NavInitial from './NavInitial'
export default function Start() {
    const history = useHistory();
    const [click1,setClick1]=useState(0)
    const [click2,setClick2]=useState(0)
    const [toggleBar,setToggleBar]=useState(0)


    return (

        <div className='d-flex flex-column'>
            <NavInitial />
         
            <div
                // style={{
                //     border:"solid 5px"
                // }}
                className='start-content m-3 d-flex flex-column mt-5'>
                <h3 className='text-center font-weight-bold mb-2 mt-1'>
                    Plataforma digital de serviços </h3>
                
                <h4 className='text-center m-2 mt-4 pt-4'> Precisa que alguem faça algum trabalho por você ?</h4>
                <p className='text-center'>Ou</p>
                <h4 className='text-center'> Quer um dinheiro extra aproveitando suas habilidades ?</h4>
                <h4 className='text-center font-weight-bold mt-3'> Então essa plataforma é para você!</h4>
                
                <div
                    className='buttons-conteiner align-self-center d-flex flex-row mt-5'>

                    <button
                        onClick={e => {
                            if (click1 !== 0) {
                                
                                setClick1(0)
                            } else {
                                setClick1(1)
                            }
                            setClick2(0)
                        }
                            
                        }
                        className='btn btn-primary p-4 m-3'> Como criar um serviço?</button>
                    <button
                        onClick={e => {
                            if (click2 !== 0) {
                                
                                setClick2(0)
                            } else {
                                setClick2(1)
                            }
                            setClick1(0)
                        }
                            
                        }
                        className='btn btn-primary p-4 m-3'> Como realizer um serviço?</button>
               
                </div>


                <div className='infos-conteiner m-1 mt-5'>
                    {click1 === 1 &&
                        <div >
                       <div className='click1-conteiner d-flex flex-column'>
                                <h4
                            
                            className='text-center font-weight-bold mt-3 mb-2 pt-3'
                        >Vamos lá</h4>
                    <div className='d-flex flex-column align-self-center'>
                        
                    
                       <h5 className='text-center'>
                            O primeiro passo é ir na aba "Serviços Meus serviços"</h5>
                        <img
                            className='img-fluid  rounded-circle mx-auto d-block'
                            src={guia1}
                            alt="guia1" />
                     
                        <button
                            onClick={e => {
                                e.preventDefault()
                                setClick1(2)
        
                            }}
                            style={{height:"30%"}}
                            className='btn btn-info align-self-center mt-3'> 
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            Próximo passo
                    </button>
                            </div> 
                            </div>
                        </div>}
                    
                    {click1 === 2 &&
                        <div className='d-flex flex-column'>
                       
                       <h4 className='text-center'> O Próximo passo é preencher todas as informações do serviço</h4>
                       
    
                        <img src={guia2} className='mx-auto d-block' alt="guia2" />
                        <button
                            onClick={e => {
                                e.preventDefault()
                                setClick1(3)
        
                            }}
                            style={{height:"30%"}}
                            className='btn btn-info align-self-center mt-3'> 
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            Próximo passo
                    </button>
                       
                        </div>}
                    
                    {click1 === 3 &&
                        <div className='d-flex flex-column'>
                         <h4 className='text-center'> O Serviço criado, então, aparecerá para você no seguinte formato:</h4>
                       
    
                       <img src={guia3} className='mx-auto d-block' alt="guia2" />
                       <button
                           onClick={e => {
                               e.preventDefault()
                               setClick1(4)
       
                           }}
                           style={{height:"30%"}}
                           className='btn btn-info align-self-center mt-3'> 
                           <i class="fa fa-chevron-right" aria-hidden="true"></i>
                           Próximo passo
                   </button>
                        </div>}
                    
                    {click1 === 4 &&
                     <div className='d-flex flex-column'>
                        <h4 className='text-center'>
                        Por fim, as novas instruções estarão na mesma aba "ver interessados",assim, por lá será possível visualizar os usuários interessados e aceita-los ou não, também será possível conversar com o usuário contratado e dentre outras funções
                        </h4>
                   

                  
                   <button
                       onClick={e => {
                           e.preventDefault()
                           history.push('/About')
   
                       }}
                       style={{height:"30%"}}
                       className='btn btn-info align-self-center mt-3'> 
                       <i class="fa fa-info mr-1" aria-hidden="true"></i>
                       Para ver mais, clicke aqui
               </button>
                        </div>}
                    

                    {click2===1 &&  <div >
                       <div className='click2-conteiner d-flex flex-column'>
                                <h4
                            
                            className='text-center font-weight-bold mt-3 mb-2 pt-3'
                        >Vamos lá</h4>
                    <div className='d-flex flex-column align-self-center'>
                        
                    
                       <h5 className='text-center'>
                                    O primeiro passo é ir na página inicial e procurar um serviço que saiba fazer, clickando em "Ver mais"</h5>
                        <h5 className='text-center'>
                            Vamos pegar, por exemplo, este serviço
                        </h5>
                       
                        <img
                            className='img-fluid  mx-auto d-block'
                            src={guia4}
                            alt="guia4" />
                     
                        <button
                            onClick={e => {
                                e.preventDefault()
                                setClick2(2)
        
                            }}
                            style={{height:"30%"}}
                            className='btn btn-info align-self-center mt-3'> 
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            Próximo passo
                    </button>
                            </div> 
                            </div>
                    </div>}

                    {click2 === 2 &&
                       
                         <div className='click1-conteiner d-flex flex-column'>
                                <h4
                            
                            className='text-center mt-3 mb-2 pt-3'
                        > O próximo passo é ler os detalhes do serviço e, se for capaz de realiza-lo, informe suas habilidades para que o dono do serviço veja</h4>
    <h4 className='text-center'> No caso do exeplo:</h4>
                    <img
                            className='img-fluid  mx-auto d-block'
                            src={guia5}
                            alt="guia5" />
                        
                    <button
                            onClick={e => {
                                e.preventDefault()
                                setClick2(3)
        
                            }}
                            style={{height:"30%"}}
                            className='btn btn-info align-self-center mt-3'> 
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            Próximo passo
                    </button>
                        </div>}
                    
                    {click2 === 3 &&
                        <div className='d-flex flex-column  '>
                           <h4
                            
                            className='text-center mt-3 mb-2 pt-3'
                        > Por fim, o serviço na aba "Serviços {">"} meus serviços", será mostrado se o serviço está esperando aprovação do autor ou se ja foi aceito</h4>
                        <h4 className='text-center'> Nessa mesma aba será possível contatar o dono de serviço, dentre outras funcionalidades que nosso sistema dispõe</h4>
                        <button
                       onClick={e => {
                           e.preventDefault()
                           history.push('/About')
   
                       }}
                       style={{height:"30%"}}
                       className='btn btn-info align-self-center mt-3'> 
                       <i class="fa fa-info mr-1" aria-hidden="true"></i>
                       Para ver mais, clicke aqui
               </button>
                    </div>}

                   
                </div>


            </div>




            <Footer />
        </div>
    )
}