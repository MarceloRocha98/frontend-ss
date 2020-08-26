import React, { Component } from 'react'
import {Link } from 'react-router-dom'

import Nav from '../templates/Nav'
import { userKey } from '../Signin/Signin'
import api from '../../services/api'
import { post } from 'jquery'
import Footer from '../templates/Footer'

export default class MyServices extends Component {
    state = {
        services: [],
        loading: true,
        serviceName: '',
        serviceDescription: '',
        serviceContent: '',
        servicePrice:5,
        count: 0,
        page: 1, //page q to
        prevPage: 1,
        arrayPages: [],
        
    }

    async componentDidMount() {
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
                this.setState({ loading: false })

            })



        ////////////
        const { page } = this.state
        await api.get(`services/${user.id}?page=${page}`).then(resp => { //obs: o limit ta reduzindoo get da quantidade de serviços q o usuario tem
            console.log(`resposta: ${resp.data}`)
           // console.log(resp.data.data)
            //  console.log(user.id, resp.data.data[0].userId,resp.data.data[1].userId)
            // const services = resp.data.data.filter(service => {
            //     return service.userId === user.id
            // }) 
            this.setState({ services: resp.data.data })
            console.log(this.state.services)
            //console.log(resp.data.limit2)]
            const limit=resp.data.limit2
           // console.log(resp.data.count)
            const count = resp.data.count 
            this.setState({ count })
            console.log(this.state.count)

            const totalPages = Math.ceil(count / limit) 
            const pages = []
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
            //   console.log(pages)
            this.setState({ arrayPages: pages })


        }).catch(err => console.log(err))
        
    }

    async componentDidUpdate() { // vai ser chamado qnd o estado for mudado
        const user = JSON.parse(localStorage.getItem(userKey))
        const { page, prevPage } = this.state
        
        if (!(page === prevPage)) {
    
          const response = await api.get(`services/${user.id}?page=${page}`)
          //console.log(response.data.count)
          //  const response = await api.get(`services/:${page}?`)
          //  console.log('entrei')
          this.setState({ services: response.data.data })
          this.setState({ prevPage: page })
          return
        }
    
        
      }


    async handleCreate(data) {
        const user = JSON.parse(localStorage.getItem(userKey))
        const userId = user.id
        const content = 'criação teste'
        const description = 'descrição teste'
        const name = 'teste'
        // const data = {
        //     userId,
        //     content,
        //     description,
        //     name,
        // }

        await api.post('services', data)

            .then(e => {
                alert('Serviço criado com sucesso')
                api.get(`services?condit2=1`).then(resp => { //obs: o limit ta reduzindoo get da quantidade de serviços q o usuario tem
                    console.log(resp.data)
                    console.log(resp.data.data)
                    //  console.log(user.id, resp.data.data[0].userId,resp.data.data[1].userId)

                    let services = resp.data.data.filter(service => {
                        //  console.log(`laço:${service}`)
                        //  console.log(`laço:${service.userId}`)
                        //  console.log(`laço:${userId}`)
                        return service.userId === user.id
                    })
                    console.log(services)

                    this.setState({ services: services })
                //    this.setState({ loading: false })
                })
            })
            .catch(err => alert(err.response.data ))
    }

    async handleDelete(servic) {
        //console.log(servic)
        const id = servic.id
        const status=servic.status
        const userData = JSON.parse(localStorage.getItem(userKey))
        if (!status) {
            
            let { services } = this.state
            console.log(id)
            console.log(userData.id)

            let exists=false
            await api.get(`handleService?serviceId=${id}`)
                .then(res => {
                    
                    console.log(res.data.data)
                    let value=res.data.data
                    if (value.length === 0) {
                        exists=false
                    } else {
                        exists=true
                    }
                })

            if (exists) {
                
                await api.delete(`handleService/${id}`) 
            }
           
          //  console.log(id)
            await api.delete(`services/${id}`).then(resp => {
                services = services.filter(service => service.id !== id)
                //  this.setState({ services })
                alert('Serviço deletado com sucesso')
                this.setState({ services })
            }).catch(e => alert(e))
            this.setState({ loading: false })
        } else {
            alert('Serviço ja esta em progresso')
            this.setState({ loading: false })
        }
    }

    clearField() {
        this.setState({serviceName:''})
        this.setState({serviceDescription:''})
        this.setState({serviceContent:''})
        this.setState({servicePrice:''})
    }


    render() {
        const { loading } = this.state

        const { count } = this.state
        const { page } = this.state
        const { arrayPages } = this.state

        let { services } = this.state
        const { serviceName, serviceContent, serviceDescription, servicePrice } = this.state
        






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

            <div className='d-flex flex-column mt-5 pt-2'>
                <Nav />
                <h2 className='text-center'><i class="fa fa-user-circle" aria-hidden="true"></i> Meus serviços</h2>
            <div className='mt-3 pt-2 d-md-flex justify-content-around'>
                

                <div className="d-flex flex-column">


                        
            <nav aria-label="Page navigation example" className='m-3'>
              <ul className="pagination justify-content-end">

                <li className="page-item cursor">
                  <a className="page-link"
                    onClick={e => {
                      const prevPage = this.state.page
                      this.setState({ page: prevPage - 1 })
                      this.setState({ prevPage })
                    }}
                    tabindex="-1" aria-disabled="true">Anterior</a>
                </li>

                {
                  arrayPages.map(page => (
                    // <li key={page}>
                    //   <button onClick={e => {
                      //     const prevPage=this.state.page
                      //     this.setState({prevPage})
                    //     this.setState({ page: page })
                    
                    //   }}> {page}</button>
                    // </li>
                    <li className="page-item cursor"
                    onClick={e => {
                      const prevPage = this.state.page
                        this.setState({ prevPage })
                        this.setState({ page })
                        
                      }}
                      ><a className="page-link">{page}</a></li> 
                      ))
                    }

                <li className="page-item cursor">
                  <a className="page-link"
                    onClick={e => {
                      const prevPage = this.state.page
                      this.setState({ page: prevPage + 1 })
                      this.setState({ prevPage })
                    }}
                    >Próxima</a>
                </li>

              </ul>
            </nav>
                    {/* <button
                        onClick={() => {
                            this.setState({ loading: true })
                            this.handleCreate()
                            this.setState({ services })
                            console.log(services)
                        }}
                        className='btn btn-warning'>Criar novo serviço</button> */}
                    <h1 className='ml-5 pl-2'>Serviços criados</h1>
                    {services.map(service => (
                        <div className='d-flex flex-row'> 
                          
                        <div class="card text-white bg-info mb-3 mt-4 ml-2 mr-2" style={{ width: "18rem" }}>
                            <div class="card-header">{service.name}
                                <button
                                    onClick={e => {
                                        this.setState({ loading: true })
                                        this.handleDelete(service)
                                        this.setState({ services })
                                        console.log(services) 
                                    }}
                                    className='btn btn-secondary float-right'><i className="fa fa-trash float-right" aria-hidden="true"></i></button>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{service.description}</h5>
                                <p className="card-text">{service.content}</p>
                                <p className="card-text badge badge-warning text-wrap " style={{width:"6rem"}}> Valor : {service.price}R$</p>
                            </div>
                        </div>
                        
                       
                        <Link to='InterestedServices' className='align-self-center'>
                            <button type="button"
                                className="btn btn-dark align-self-center"
                                onClick={e=>{
                                    const serviceId = service.id 
                                    //alert(typeof(serviceId))
                                    // const exists = localStorage.getItem('InterestedInServiceId')
                                    // if (exists) {
                                    //     localStorage.removeItem('InterestedInServiceId')
                                    // }
                                    localStorage.setItem('InterestedInServiceId',serviceId)
                                }}
                                style={{height:"20%"}}
                                >Ver interessados</button>
                       </Link>
                       
                            
                        </div>
                    ))}

                </div>

                <div className='d-flex flex flex-column mt-3 align-items-center'>
                    <h3 className='text-center'>Cadastre um novo serviço!</h3>


                    <form style={{ width: '100%' }}
                        className='mt-4 '
                        onSubmit={() => {
                            const user = JSON.parse(localStorage.getItem(userKey))
                            const userId = user.id
                            
                            const data = {
                                userId,
                                content:serviceContent,
                                description:serviceDescription,
                                name: serviceName,
                                price:servicePrice,
                            }
                            console.log('a pia quebrou e molhou toda a sala preciso de ajuda para conserta-la e limpar a sala obrigadoa'.length)
                            let control = 0;
                            const minimumDescription = 150
                            if (serviceDescription.length > minimumDescription) {
                                control=1
                                // alert('A descrição deve ser curta (máximo de 100 caracteres)')
                            }
                            const minimumValue = 5
                            if ((servicePrice >= minimumValue) && control===0) {
                                  
                                this.handleCreate(data)
                            } else {
                                if (control == 0) {
                                    
                                    alert('Minimo valor de serviço é 5 R$')
                                } else {
                                     alert(`A descrição deve ser curta (máximo de ${minimumDescription} caracteres)`)
                                }
                            }
                            this.clearField()
                            this.setState({loading:false})
                        }}
                    >
                        <div class="form-group">
                            <label for="staticEmail" class="text-center font-weight-bold">Nome</label>
                            <div class="">
                                <input type="text"
                                    placeholder='Nome do serviço'
                                    className='form-control'
                                    value={serviceName}
                                    onChange={(e) => {
                                        this.setState({ serviceName: e.target.value })
                                    
                                    }}
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputDescription" class="text-center font-weight-bold">Descrição</label>
                            <div class="">
                                <input type="text"
                                    placeholder='Breve descrição'
                                    class="form-control"
                                    id="inputDescription"
                                    value={serviceDescription}
                                    onChange={(e) => {
                                        this.setState({ serviceDescription: e.target.value })
                                        console.log(serviceDescription)
                                    }}
                                
                                />
                            </div>
                        </div>
     
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1" className='text-center font-weight-bold'>Detalhes</label>
                            <div className=''>

                                <textarea class="form-control"
                                    id="exampleFormControlTextarea1"
                                    placeholder='O que precisa ser feito?'
                                    rows="4"
                                    value={serviceContent}
                                    onChange={(e) => {
                                        this.setState({ serviceContent: e.target.value })
                                        console.log(serviceContent)
                                    }}
                                
                                ></textarea>
                            </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPrice" class="text-center font-weight-bold">Valor (R$)</label>
                                <p className='text-center text-muted'>Valor mínimo de <span className='font-weight-bold'>5 R$</span> </p>
                            <div class="">
                                <input type="text"
                                    placeholder='Pagamento pelo serviço'
                                    class="form-control"
                                    id="inputDescription"
                                    value={servicePrice}
                                    onChange={(e) => {
                                        
                                        this.setState({ servicePrice: e.target.value })
                                        console.log(servicePrice)
                                    }}
                                
                                />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-outline-success align-self-center mb-3">Cadastrar</button>
                    </form>

                </div>


                </div>

                <Footer />
                </div>
        )
    }
}