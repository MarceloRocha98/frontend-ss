import React from 'react'
//import Form from './Form'
import {Link } from 'react-router-dom'
import Nav from '../templates/Nav'
import api from '../../services/api'
import { userKey } from '../Signin/Signin'
import Footer from '../templates/Footer'
export default class Contact extends React.Component{

    state = {
        info: {}, // info tem as informações do usuario q esta realizando o serviço -> userTo
        mensage: '',
        msgsFrom: [],
        msgsTo: [],
        loading: true,
        userOwner: 0,
        finish1:0,
        finish2:0,
        token:0,
    
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem(userKey))

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
        
        
        
        const info = JSON.parse(localStorage.getItem('contact'))
        this.setState({info})
        console.log(info)
     //   console.log(typeof(info.email))
        
        
        
       // const info = this.state.info // info
         
        let msgsFrom=[]
        let msgsTo = []
        let userTo=info.id
        let userFrom = user.id
        
        const serviceId =parseInt( localStorage.getItem('InterestedInServiceId'))
        await api.get(`contact/${userTo}/${userFrom}?serviceId=${serviceId}`)
            .then(res => {
                msgsFrom=res.data.data 
                console.log(msgsFrom)
            })
            .catch(err => alert(err))
        

        userTo = user.id 
        userFrom=info.id
        await api.get(`contact/${userTo}/${userFrom}?serviceId=${serviceId}`)
            .then(res => {
                msgsTo = res.data.data 
                console.log(msgsTo)
            })
        this.setState({msgsFrom})
        this.setState({ msgsTo })
        
     //   const serviceId = parseInt(localStorage.getItem('InterestedInServiceId'))
        let count=0
        await api.get(`services/${user.id}`)
            .then(res => {
               // console.log(res.data.count)
                count=res.data.count
            })
        let services=[]
        await api.get(`services/${user.id}?limit2=${count}`)
            .then(res => {
                console.log(res.data.data)
                services = res.data.data 
                services = services.filter(service => {
                    return service.id===serviceId
                })
                
                console.log(services.length)
                if (services.length !== 0) {
                    this.setState({userOwner:1})
                } else {
                    this.setState({userOwner:0})
                }
            })
        
            await api.get(`serviceArea/${0}/${serviceId}?userId2=${0}`)
            .then(res => {
               // console.log(res.data.data)
                if (res.data.data.length !== 0) {
                    
                    this.setState({ finish1: res.data.data[0].finish1 })
                    this.setState({ finish2: res.data.data[0].finish2 })
                    this.setState({ token: res.data.data[0].id })
                }
              //  console.log(this.state.finish1, this.state.finish2)
            }).catch(err=>alert(err))
    }

 

    clearForm() {
        this.setState({mensage:''})
    }

    async handleSubmit() {
        //serviceId
        const serviceId =parseInt( localStorage.getItem('InterestedInServiceId'))
        const info = this.state.info // info
        const user = JSON.parse(localStorage.getItem(userKey))
        console.log(info)
        
        let userTo=info.id
        let userFrom = user.id
        const msg = {
            mensage: this.state.mensage,
            serviceId,
        }
        console.log(msg)
        
        await api.post(`contact/${userTo}/${userFrom}`,msg)
            .then(res => console.log(res))
            .catch(err => alert(err))
        
        let msgsFrom=[]
        let msgsTo = []
        
        await api.get(`contact/${userTo}/${userFrom}?serviceId=${serviceId}`)
            .then(res => {
                msgsFrom=res.data.data 
                console.log(msgsFrom)
            })
            .catch(err => alert(err))
        

        userTo = user.id 
        userFrom=info.id
        await api.get(`contact/${userTo}/${userFrom}?serviceId=${serviceId}`)
            .then(res => {
                msgsTo = res.data.data 
                console.log(msgsTo)
            })
        this.setState({msgsFrom})
        this.setState({msgsTo})
      //  this.setState({loading:false})
 
        
    }

    handleServiceArea() { //  handleServiceArea pra quem esta fazendo o serviço
        const serviceId = parseInt(localStorage.getItem('InterestedInServiceId'))
        const user = JSON.parse(localStorage.getItem(userKey))
        const userId1 = user.id 
        const info = JSON.parse(localStorage.getItem('contact'))
        const userId2 = info.id 
        const userOwner=this.state.userOwner

        const serviceAreaInfo = {
            userId1,
            userId2,
            serviceId,
            userOwner, // 0 pra quem esta fazendo e 1 pra quem é dono do serviço
        }

        localStorage.setItem('serviceAreaInfo',JSON.stringify(serviceAreaInfo))

        
    }
    
    handleServiceArea2() { //  handleServiceArea pra quem é dono do serviço
        const serviceId = parseInt(localStorage.getItem('InterestedInServiceId'))
        const user = JSON.parse(localStorage.getItem(userKey))
        const info = JSON.parse(localStorage.getItem('contact'))
        const userId1 = info.id //qm realizao serviço
        const userId2 = user.id  //dono do serviço
        const userOwner=this.state.userOwner

        const serviceAreaInfo = {
            userId1,
            userId2,
            serviceId,
            userOwner, // 0 pra quem esta fazendo e 1 pra quem é dono do serviço
        }

        localStorage.setItem('serviceAreaInfo',JSON.stringify(serviceAreaInfo))

        
    }


     render() {
        const {info } =this.state
        const { loading,finish1,finish2,token } = this.state
        const { msgsFrom } = this.state
        const { msgsTo } = this.state
        const { userOwner } = this.state
  
        console.log(msgsFrom)
         console.log(msgsTo)
        // const info = JSON.parse(localStorage.getItem('contact'))



        ///////////////////// pro usuario que é dono do serviço
//         const serviceId = parseInt(localStorage.getItem('InterestedInServiceId'))
//         const userData = JSON.parse(localStorage.getItem(userKey))

//          api.get(`services/${userData.id}`)
//             .then(res => {
//                 console.log(res)
//             })
        
        if (userOwner===1) { // colocar aqui se o usuário é dono do serviço
            return (
                <div className='m-3'>
                
                <Nav />

                
                    <h2 className='text-center mt-5 pt-4'>Envie uma mensagem para {info.name} </h2>
                    <h3 className='text-center text-muted mt-2 mb-3'> Infome o endereço para a realização do serviço e outras informações importantes</h3>
                
                <Link to='interestedServices'>

                <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
    </Link>
                <div>
                    {/* <Form /> */}
                    <form className='mt-3'
                        onSubmit={e => {
                         //   this.setState({loading:true})
                            this.handleSubmit()
                            this.clearForm()
                        }}
                    >
                        <div className="form-group">
                                <label for='input1'>Mensagem</label>
                                <p className='text-muted'>Atualize a pagina para novas informações</p>
                            <input
                                name='input1'
                                className='form-control'
                                placeholder='Digite a mensagem'
                                value={this.state.mensage}
                                onChange={e => {
                                    const mensage=e.target.value
                                    this.setState({ mensage })
                                  //  console.log(this.state.mensage)
                                }}
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn btn-success align-self-center m-3'
                            style={{width:'25%'}}
                        > Enviar </button>
                
                
                    </form>
                </div>

               
                <div className='d-flex justify-content-around'>

                <div>

                <p className='font-weight-bold'>Mensagens enviadas</p>
                
                <ul className='list-group'>
                    
                {msgsFrom.map(msg => (
                    <li className='list-group-item'>{msg.mensage}</li>
                    ))}
                    </ul>
                </div>
                
                <div>

                <p className='font-weight-bold'>Mensagens recebidas</p>
                
                <ul className='list-group'>
                    
                {msgsTo.map(msg => (
                    <li className='list-group-item'>{msg.mensage}</li>
                    ))}
                    </ul>
                    </div>

                    </div>

                    <div className='d-flex flex-column mt-4'>
                        <p className='text-center font-weight-bold'>O usuário {info.name} ja chegou para realizar o serviço ?</p>
                        <div class="alert alert-danger align-self-center" role="alert" style={{width:'70%'}}>
  <p className='text-center'>Atenção !</p>
  <p className='text-center'>Somente clicke no botão "Sim,ele chegou" se o usuario ja estiver no local onde irá realizar o serviço</p>
</div>
                        <Link to='serviceArea' className='align-self-center'>
                        <button
                            className='btn btn-success'
                            onClick={e => {
                                this.handleServiceArea2()
                            }}

                        >Sim,ele chegou</button>
                        </Link>
                    </div>
<Footer />
                    </div>
            )
         }
         if (!!finish1 && !!finish2) {
            
             return (
                 <div className='d-flex flex-column'>
                     <div className="float-left m-2">

                         <Link to='Home'>

                         <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
                         </Link>
                     </div>
                     <div class="alert alert-success m-3" role="alert">
                         Serviço ja foi realizado! Caso tenha problemas ou dúvidas entre em contato conosco e nos informe o código do serviço
                          
                    </div>
                    
                     <button
                         className='btn btn-info align-self-center'
                         onClick={e => {
                             alert(`O código do serviço é: ${token}`)
                         }}
                     >Código do serviço</button>

                     <Footer />
                 </div>
             )
         } else {
             
        

             return ( //se n for o dono do serviço
                 <div className='m-3'>
                
                     <Nav />

                
                     <h2 className='text-center mt-5 pt-4'>Envie uma mensagem para {info.name} </h2>
                     <h3 className='text-center text-muted mt-2 mb-3'> Obtenha o endereço para a realização do serviço e outras informações importantes</h3>
                    
                     <Link to='interestedServices'>

                     <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
                     </Link>
                     <div className='m-4 mt-3'>
                         {/* <Form /> */}
                         <form
                             onSubmit={e => {
                                 //   this.setState({loading:true})
                                 this.handleSubmit()
                                 this.clearForm()
                             }}
                         >
                             <div className="form-group">
                                 <label for='input1'>Mensagem</label>
                                 <p className='text-muted'>Atualize a pagina para novas informações</p>
                                 <input
                                     name='input1'
                                     className='form-control'
                                     placeholder='Digite a mensagem'
                                     value={this.state.mensage}
                                     onChange={e => {
                                         const mensage = e.target.value
                                         this.setState({ mensage })
                                         //  console.log(this.state.mensage)
                                     }}
                                 />
                             </div>
                             <button
                                 type='submit'
                                 className='btn btn-success align-self-center m-3'
                                 style={{ width: '25%' }}
                             > Enviar </button>
                
                
                         </form>
                     </div>

               
                     <div className='d-flex justify-content-around'>

                         <div>

                             <p className='font-weight-bold'>Mensagens enviadas</p>
                
                             <ul className='list-group'>
                    
                                 {msgsFrom.map(msg => (
                                     <li className='list-group-item'>{msg.mensage}</li>
                                 ))}
                             </ul>
                         </div>
                
                         <div>

                             <p className='font-weight-bold'>Mensagens recebidas</p>
                
                             <ul className='list-group'>
                    
                                 {msgsTo.map(msg => (
                                     <li className='list-group-item'>{msg.mensage}</li>
                                 ))}
                             </ul>
                         </div>

                     </div>
                    
                
                     <div className='d-flex flex-column'>
                         <h5 className='text-center mt-4 pt-4'> Ja chegou no local de serviço ?</h5>
                         <div class="alert alert-danger align-self-center" role="alert" style={{ width: '70%' }}>
                             <p className='text-center'>Atenção !</p>
                             <p className='text-center'>Somente clicke no botão "Sim,estou aqui" se estiver no local onde irá realizar o serviço</p>
                         </div>
                         <Link to='ServiceArea' className='align-self-center'>
                             <button
                                 className='btn btn-success mt-4 align-self-center'
                                 onClick={e => {
                                     this.handleServiceArea()
                                
                                 }}
                        
                             >Sim, estou aqui</button>
                         </Link>
                     </div>
                     <Footer />
                 </div>
             )
         }
    }
}