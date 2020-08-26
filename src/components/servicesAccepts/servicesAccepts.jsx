import React,{Component} from 'react'
import { userKey } from '../Signin/Signin'
import api from '../../services/api'
import { data, inArray, get } from 'jquery'
import { Link } from 'react-router-dom'
import Nav from '../templates/Nav'
import Footer from '../templates/Footer'
export default class servicesAccepts extends Component {
    state = {
        loading:true,
        data: [],
        response: [],
        services: [],
        count: 0,
        servicesInProgress:[],
        
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
           this.setState({ loading: false })

       })

        
        await api.get(`handleService?userId=${user.id}`)
            .then(res => {
                console.log(res)
                console.log(res.data.data)
                this.setState({data:res.data.data})
            })
        
        const data = this.state.data
       // console.log(data)
        let services = []
        let servicesId=[]
        services = data.map(e => e.service_Id)
        console.log(services)

        for (let i = 0; i < services.length; i++) {
              
            if (!! inArray(services[i], servicesId)) {
                              servicesId.push(services[i])
            }
            
        }
        console.log(servicesId)
       // console.log(!!-1)
         await api.get('services?condit=true').then(res => { 
          //  console.log(res.data.data)
             this.setState({response:res.data.data})
        })
        const response=this.state.response
        console.log(response)
        let servicesForResponse = []
        
        servicesForResponse = response.filter(function (e) {
    
            return inArray(e.id,servicesId) !==-1
        })
        console.log(servicesForResponse)
        servicesForResponse = servicesForResponse.filter(e => {
            return e.status ===0
        })
        console.log(servicesForResponse)
        this.setState({ services: servicesForResponse })
        this.setState({ loading: false })

    

        
        await api.get('services')
        .then(res => {
            const count = res.data.count
            this.setState({count})
        })

        const count = this.state.count
       //  alert(count)
        await api.get(`services?limit=${count}`)
            .then(res => {
              //  console.log(res.data.data)
                let data=res.data.data
                const user = JSON.parse(localStorage.getItem(userKey))
                const userId = user.id
               // console.log(user.id)
                
                data = data.filter(service => {
                    return service.status !==0
                })   
                //console.log(data)

                data = data.filter(service => {
                    return service.userInProgress ===userId
                })

               // console.log(!!data.length)
                if (!!data.length) {
                    
                    this.setState({servicesInProgress:data})
                } else {
                    const noObj = {
                        name: 'Não há serviços em progresso',
                        description: '',
                        content:'',
                    }
                    const noContent = [noObj]
                    this.setState({servicesInProgress:noContent})
                }
                
                
                
            })
        
    }
    async handleDelete(serviceid) {
        //console.log(serviceid)
        let { services } = this.state
        
        await api.delete(`handleService/${serviceid}`)
            .then(resp => {
                services = services.filter(e => {
                    return e.id !==serviceid
                })
                alert("sucesso")
                this.setState({services:services})
            }).catch(err => alert(err))
        
            this.setState({ loading: false })
    }
    
    async handleContact(service) {
        let services = []
        console.log(service)
        // await api.get('services')
        //     .then(res => {
        //         console.log(res.data)
        //         services=res.data.data
        //     })
        // services = services.filter(e => {
        //     return e.id ==service.id
        // })
        // console.log(services)
        const userMakeId = service.userId
        console.log(userMakeId) 

        let info={}
        await api.get(`users/${userMakeId}`)
            .then(res => {
                //console.log(res.data.data)
                info=res.data.data
            })
        console.log(info) 
        info = {
            email:info.email,
            name: info.name,
            id: info.id,
            
        }
        console.log(info)
        localStorage.setItem('contact',JSON.stringify(info)) 
    }

    render() {
        const { services } = this.state
        
        const { loading } = this.state
        
        const {servicesInProgress }=this.state

        console.log(servicesInProgress)

        if (loading) {
            return (
              <div className='m-3 p-3 d-flex flex-column'>
      
      
              <h1 className='text-center font-weight-bold'>Carregando
              </h1>
                <h5 className='text-center font-weight-bold'>Um momento, estamos preparando tudo para você</h5>
                <p className='text-muted text-center'> Caso esteja nessa página a muito tempo tente atualiza-la</p>
                <i class="fa fa-spinner fa-spin fa-3x fa-fw align-self-center m-3" style={{fontSize:'300px'}}></i>
                <span class="sr-only">Loading...</span>
      
              </div>
      
            )
          }
       
        return (
            
            <div className='conteiner-accepts d-md-flex flex-md-column'>
                <Nav />
                <h2 className='text-center mt-5 pt-4'><i class="fa fa-handshake-o" aria-hidden="true"></i>Serviços aceitos</h2>
                <div className='d-md-flex justify-content-around'>

                
                <div className='m-4'>
             
              
                <h3>Serviços esperando aprovação do autor:</h3>
                
                {services.map(service => (
                         <div class="card text-white bg-warning mb-3 mt-4 ml-2 mr-2" style={{ width: "18rem" }}>
                         <div class="card-header">{service.name}
                             <button
                                 onClick={e => {
                                     this.setState({ loading: true })
                                     this.handleDelete(service.id)
                                    //  this.setState({ services })
                                    //  console.log(services) 
                                 }}
                                 className='btn btn-danger float-right'><i className="fa fa-times float-right" aria-hidden="true"></i></button>
                         </div>
                         <div className="card-body">
                             <h5 className="card-title">{service.description}</h5>
                             <p className ="card-text">{service.content}</p>
                             <p className="card-text badge badge-warning text-wrap " style={{width:"6rem"}}> Valor : {service.price}R$</p>
                         </div>
                     </div>
                ))
                 }
                </div>
                
                <div className=' m-4'>
                    <h3>Serviços que estão em progresso:</h3>
                    {servicesInProgress.map(service => (
                        <div className='d-flex'>
                            <div class="card text-white bg-success mb-3 mt-4 ml-2 mr-2" style={{width:"18rem"}}>
                                <div class="card-header"> {service.name}</div>
                                <div class="card-body">
                                    <h5 class="card-title">{service.description}</h5>
                                    <p class="card-text">{service.content}</p>
                                    <p className="card-text badge badge-warning text-wrap " style={{width:"6rem"}}> Valor : {service.price}R$</p>
                                </div>
                            </div>
                                {servicesInProgress[0].name!=='Não há serviços em progresso' &&   <Link to='Contact' className='align-self-center'>
                            <button className='btn btn-secondary align-self-center '
                                style={{ height: '20%' }}
                                    onClick={e => {
                                        const serviceId = service.id 
                                        localStorage.setItem('InterestedInServiceId', serviceId)
                                        this.handleContact(service)
                                }}
                                >Contatar dono do serviço</button>
                                </Link>}
                          
                         
                        </div>
                    ))}
                </div>
                
                </div>
                <Footer />
            </div>
        )
    }
}