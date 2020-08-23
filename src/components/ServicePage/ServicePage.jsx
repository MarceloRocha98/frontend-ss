import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Nav from '../templates/Nav'
import api from '../../services/api'
import { userKey } from '../Signin/Signin'
import './ServicePage.css'
import { timers } from 'jquery'

export default class ServicePage extends Component{

    state = {
        service:[],
        services:[],
        loading: true,
        why:'',
    }

    async componentDidMount() {
        // console.log(this)
        const user = JSON.parse(localStorage.getItem(userKey))

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
                
            })
            
            
            
        const count = parseInt(localStorage.getItem('count'))
        const serviceId = parseInt( localStorage.getItem('serviceId') )
            //    console.log(service,typeof(service))
            const response = await api.get(`services/?limit=${count}`).then(resp => {
                
                console.log(resp.data.data)
                this.setState({services:resp.data.data})
            })
            const { services } = this.state
            //   console.log(services)
            const service = services.filter(service => {
                return service.id ===serviceId
            })
            
            console.log('service')
            console.log(service)
            
            this.setState({ loading: false })
            this.setState({service})
       
      
        
        
           
          
    }

    async handleAcceptService(e) {
        e.preventDefault()
        const { why } = this.state
        // console.log(why)
        const serviceId = parseInt(localStorage.getItem('serviceId'))
        const userId = parseInt(JSON.parse(localStorage.getItem(userKey)).id)
        const data = {
                why,
                user_Id:userId,
                service_Id:serviceId,
            }
        //  console.log(userId,serviceId)
        const response = await api.post('handleService', data)
            .then(_ => {
                alert('Foi enviada uma solicitação para o dono do serviço, aguarde a confirmação na pagina "Serviços aceitos"')
                // this.props.history.goBack()
                this.props.history.push('/servicesAccepts')
            })
            .catch(err => { 
            alert('Erro!')
            }) 
        
        this.setState({why:''})
      }

    
    
    render() {
        
        const {loading,service } =this.state
        console.log(service)

        if (loading) {
            return (
                <h1>Carregando
                <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>

            </h1>
            )
        }

        return (
            <div className='conteiner-servicePage'>
                <Nav />
                <div className='conteinercont mt-5 pt-4 d-flex flex-column m-2 '>
                {
                        service.map(service => (
                            <div>
                                <div class="card">
                                    <div class="card-header text-center">
                                        <Link to='Home'>

                                    <i class="fa fa-arrow-left float-left" aria-hidden="true"></i>
                                        </Link>
                                        {service.name}
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title text-center">{service.description}</h5>
                                        <p class="card-text text-center">{service.content}</p>

                                    </div>
                                </div>


                            </div>

                        ))
                    }

                    <div
                         className='m-3 p-2 text-center'
                    >
                        <label
                            
                            for='why'>
                            <p
                            className='text-center font-weight-bold'
                            >Quais são suas habilidades na área ?</p>
                        </label>
                        <textarea
                            onChange={e => {
                                // console.log(e.target.value)
                                this.setState({why:e.target.value})
                            }}
                            id='why'
                            style={{
                                width: "100%"
                                
                            }}
                            placeholder='Informe suas habilidades para o serviço'
                        rows='5'
                        >
                        
                        </textarea>
</div>
<button
    style={{ width: '15%' }}
    type="button"
    onClick={e=>this.handleAcceptService(e)}
    class="control3 btn btn-info align-self-center ">
        Desejo realizar o serviço
    </button>

                
                </div>
               
            </div>
        )
    }
}
