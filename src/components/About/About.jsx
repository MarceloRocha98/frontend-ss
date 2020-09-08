import React from 'react'
import { Link } from 'react-router-dom'
import './About.css'
import Footer from '../templates/Footer'
import { userKey } from '../Signin/Signin'
import Nav from '../templates/Nav'
import { timers } from 'jquery'


export default class About extends React.Component {
  state = {
    loggedIn:false,
  }
  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem(userKey))

    

    if (!!user) {
      this.setState({loggedIn:true})
    }

    // let date = new Date() 
    // let dia = date.getDate()
    // let mes = date.getMonth()
    // let ano=date.getFullYear()
    // // console.log(`${dia}/${mes+1}/${ano}`)
    // let dateNow = `${dia}/${mes + 1}/${ano}`
    
   
    // let hours = date.getHours()
    // let minutes = date.getMinutes()
    // let seconds=date.getSeconds()
    // // console.log(`${hours}:${minutes}:${seconds}`)
    // let hour = `${hours}:${minutes}:${seconds}`

    // console.log(`${dateNow}, ${hour}`)


    }
    render() {
      const {loggedIn } = this.state

        return (
          <div className='d-flex flex-column m-3 backcolor'>

            {!!loggedIn? <div> <Nav /> </div> : <div className='m-2'>

              


              <button
                onClick={e=>this.props.history.goBack()}
                type="button" style={{ borderRadius: '8px' }} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
        
</div> }
           
 
<h3 className='text-center m-3 backcolortext font-weight-bold'>Como funcionamos ? </h3>
                

                          <p className='text-center backcolortext'> Na nossa plataforma, você pode criar e/ou realizar um serviço</p>
                            
            
            <div class="card backcolor">
  <div class="card-body ">
                <h4 className='text-center backcolortext font-weight-bold'> Criando um serviço</h4>
                
                <div class="card">
  <div class="card-body backcolor" > 
                    <ol>
                      <li className='backcolortext'> Na pagina "Meus serviços", cadastre o serviço, inserindo nome, descrição, detalhes e o valor</li>
                      <li className='backcolortext'> Ainda em "Meus serviços", ao clickar no botão "ver interessados", será direcionado ao pagamento do boleto</li>
                      <li className='backcolortext'> Após pagar o boleto, ao clickar no mesmo botão("Ver interessados"), será direcionado a uma pagina com os usuários que demonstrarem interesse no serviço, você poderá aceitar ou recusar qualquer usuário interessado</li>
                      <li className='backcolortext'> Ao aceitar um usuário, e clickar no botão "Ver interessados" em meus serviços, será exibida uma pagina de contato com quem estiver realizando o serviço, podendo ser trocadas mensagens entre você e o usuário que aceitou o serviço, por onde pode enviar seu endereço ou o endereço de onde será feito o mesmo</li>
                      <li className='backcolortext'> Somente quando o usário que for realizar o serviço chegar, na mesma pagina de contato, clicke no botão "Sim, ele chegou". Essa opção também aparece para ele, assim, ambos tem que informarem que estão no local do serviço </li>
                      <li className='backcolortext'> Quando ambos usuários informarem a chegada, na mesma pagina será exibida uma caixa para selecionar "serviço finalizado". Quando o serviço terminar, ambos devem selecionar essa caixa </li>
                      <li className='backcolortext'> Transferiremos o dinheiro  para o realizador do serviço através da plataforma  </li>
                </ol>
                
  </div>
            </div>
                <h4 className='text-center backcolortext font-weight-bold'> Fazendo um serviço </h4>
                <div class="card ">
  <div class="card-body backcolor">
                    <ol>
                      <li className='backcolortext'> Na pagina "Todos serviços" (inicial), será exibido o nome,a descrição e o valor de todos os serviços, ao se interessar por um, clicke no botão "Ver mais"</li>
                      <li className='backcolortext'> Após clickar em "Ver mais", será mostrado os detalhes do serviço, se desejar realiza-lo clicke em "Desejo realizar o serviço"</li>
                      <li className='backcolortext'> Ao clickar em "Desejo realizar o serviço", sua intenção será enviada para o dono do serviço, você pode monitorar isso na pagina "Serviços Aceitos"</li>
                      <li className='backcolortext'> Se o dono do serviço te aprovar para realizar o serviço, na pagina "Serviços aceitos" ira mostrar o serviço e, ao clickar no botão "Contatar o dono do serviço", irá abrir um chat entre ambos, por onde poderá obter, por exemplo, o endereço de onde será realizado o serviço</li>
                      <li className='backcolortext'> Somente quando você chegar no local que irá realizar o serviço, clicke no botão "Sim, estou aqui" (ainda na pagina de contato). Quando o dono do serviço confirmar sua chegada, ambos serão direcionados para a pagina final</li>
                      <li className='backcolortext'> Por fim, ao terminar de realizar o serviço, você o o dono do serviço devem clickar na caixa "Serviço finalizado"</li>
                      <li className='backcolortext'> Transferiremos o dinheiro  do serviço através da plataforma  </li>
                </ol>
                
  </div>
            </div>
                
  </div>
            </div>
                <Footer />
            </div>
        )
    }
}