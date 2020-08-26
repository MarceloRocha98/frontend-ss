import React from 'react'
import {Link } from 'react-router-dom'
import { userKey } from '../Signin/Signin'
import api from '../../services/api'
import Nav from '../templates/Nav'
import Payment from '../Payment/Payment'
import Footer from '../templates/Footer'

export default class InterestedServices extends React.Component {

    state = {
        loading: true,
        data: [],
        users: [],
        count: 0,
        hadNoInteresse:0,
        inProgress: 0,
        inProgressUser: 0,
        dataOfinProgressUser: {},
        finish1: 0,
        finish2: 0,
        token: 0,
        generatedBefore: 0,
        payed: 0,
        paymentLink: '',
        why: '',
        usersWithPic:[],

    }


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


        const serviceId =parseInt( localStorage.getItem('InterestedInServiceId'))
        console.log(serviceId, typeof (serviceId))
        await api.get(`handleService?serviceId=${serviceId}`)  ////////////////////////////// OBS: CRIAR ALGO PRA INFORMA SE N TIVER USUARIOS INTERESSADOS AINDA!!!!!
            .then(res => {
                // console.log(res.data.data)
                this.setState({ data: res.data.data })
            }).catch(err => alert(err))
        let data = this.state.data
        console.log(data)

        data = data.map(e => { // assumi q n tem usuarios repetidos em data, ou seja, ele só fez 1 requisição
            return e.user_Id
        })

        console.log(data) // data é um array de id's de usuarios que estão interessados no serviço
        console.log(user.id)
        let users = []

        // Promise.all()
        data = data.map(async function (userId) {

            await api.get(`users/${userId}`)
                .then(res => {
                    // console.log(`resp.data.data abaixo`)
                    // console.log(res.data.data)
                    // console.log(`resp.data.data acima`)
                    users.push(res.data.data)
                    console.log(users)
                    // console.log('tipo do res.data.data abaixo')
                    //  console.log(typeof(JSON.stringify(res.data.data)))
                    //  localStorage.setItem('usersInteresteds',users)
                })
            return users

        })
        let promise = new Promise(function (resolve, reject) {
            // the function is executed automatically when the promise is constructed

            // after 1 second signal that the job is done with the result "done"
            setTimeout(() => resolve("done"), 1000);
        });
        Promise.all([data, promise]).then((e) => {  // pra resolver o problema do tempo
            this.setState({ users: users })


        console.log(users)
        // alert('Entro aqui')
        let usersWithPic = users
        usersWithPic = usersWithPic.filter(user => {
           
            return user.picUploaded ===1
        })
            usersWithPic = usersWithPic.map(user => {
               

                return user.id
            })
            console.log(usersWithPic)
            this.setState({usersWithPic})
            
            

        })   // aqui acaba o Promise.all
        // console.log(users)
        //  const test = localStorage.getItem('usersInteresteds')
        //  console.log('teste abaixo')
        //  console.log(test)
        // console.log(typeof(test))

        this.setState({ users: users })

        // console.log(`test abaixo`)
        // console.log(this.state.users)
        // console.log(`test acima`)

        this.setState({ loading: false })
        
        // if (users.length === 0) {
        //     this.setState({hadNoInteresse:1})
        // } else {
        //     this.setState({hadNoInteresse:0})
        // }



        //abaixo verifica se o serviço ja esta sendo realizado ou não
        await api.get('services?condit=1')
            .then(res => {
                const count = res.data.count
                this.setState({count})
            })
        const count = this.state.count
       // alert(count)
        await api.get(`services?condit=1`)
            .then(res => {
                console.log(res.data.data)
                const data = res.data.data 
                const serviceId =parseInt( localStorage.getItem('InterestedInServiceId'))

            //    alert(serviceId)
                const service = data.filter(e => {
                    return e.id ===serviceId
                })
                //console.log(service[0].status)
                console.log(service)
                const status = service[0].status 
                this.setState({ inProgress: status })
                if (status) {
                    console.log(service[0].userInProgress)
                    const userInProgress = service[0].userInProgress 
                    this.setState({ inProgressUser: userInProgress })
                
                }

            })
        if (users.length === 0) {
            this.setState({hadNoInteresse:1})
        } else {
            this.setState({hadNoInteresse:0})
        }

        const { inProgressUser } = this.state
        //console.log(inProgressUser)
        await api.get(`users/${inProgressUser}`)
            .then(res => {
                const dataOfinProgressUser = res.data.data 
               // console.log(dataOfinProgressUser)

                this.setState({dataOfinProgressUser})
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
            }).catch(err => alert(err))
        
        
        
        
        
        await api.get(`payment/${user.id}/${serviceId}`)
            .then(res => {
               // console.log(res.data.data)
                const dados = res.data.data[0]
                this.setState({ generatedBefore: dados.generatedBefore, payed: dados.payed, paymentLink: dados.paymentLink })
                //console.log(this.state)
            })
        
        
        
///////////////
        if (this.state.generatedBefore === 1) {
            
      
            let dueDate = []
            await api.get(`payment/${user.id}/${serviceId}`)
                .then(res => {
                    dueDate = res.data.data[0].dueDate
                 
                    //console.log(dueDate !== actualDate)
                    //console.log(res.data.data[0].dueDate) 
                })
            console.log(dueDate)
        
            let partesdueDate = dueDate.split("-");
            let dataa = new Date(partesdueDate[0], partesdueDate[1] - 1, partesdueDate[2]);
            console.log(dataa)
            console.log(new Date())
            console.log(dataa > new Date())
            if (dataa < new Date()) { //expirou
            
                await api.put(`payment/${user.id}/${serviceId}`)
                    .then(res => {
                        alert('Boleto expirado! Atualize a página para gerar outro')
                    })
                //   alert('maior')
            } else { //n expirou
                //alert('menor')
                // alert(serviceId)
            }
        }

 
    }

    async handleRefuse(dat) { 
        console.log(dat)
        const { userId } = dat
        const { serviceId } = dat
        // console.log(userId)
        // console.log(serviceId)
        const id=serviceId
        const response=await api.delete(`handleService/${id}?userId=${userId}`)
            .then(res => {
                alert('Sucesso! atualize a pagina para novas informações')
                
                
            })
            .catch(err => alert(err))
        
         //   this.setState({loading:false})
    }

    async handleAcept(userId) {
        const serviceId = parseInt(localStorage.getItem('InterestedInServiceId'))
        const user = JSON.parse(localStorage.getItem(userKey))

        const data = {
            serviceId
        }
        const id=userId //id do usuario interessado no serviço
        await api.put(`services/${id}`, data)
            .then(e => { 
                const dat = {
                    userId: userId,
                    serviceId:serviceId,
                }
                this.handleRefuse(dat)
             //   alert('sucesso')
            })
            .catch(err=>alert(err))

        /////////////////////////////  testando abaixo para serviceArea
        const dataForServiceArea = {
            userId1: id, //usuario q vai realizar o serviço
            userId2: user.id, //dono do serviço
            serviceId,
        }

        await api.post('serviceArea', dataForServiceArea)
            .then(e => {
             //   alert('ok')
            })
            .catch(err => {
                alert(err)
            })

    }

    async getWhy(userId) {
        const serviceId =parseInt( localStorage.getItem('InterestedInServiceId'))
        // const user = JSON.parse(localStorage.getItem(userKey))
       
        await api.get(`handleService/${userId}?serviceId=${serviceId}`)
            .then(res => {
                // console.log(res.data.data[0].why)
                this.setState({why:res.data.data[0].why})
                // console.log(!!this.state.why)

            })
            .catch(err => {
            console.log(err)
        })
        
    }

    render() {
        const { users, finish1, finish2, token, why, usersWithPic } = this.state
        let { loading } = this.state

        let { inProgress } = this.state
        const { dataOfinProgressUser } = this.state
        const { hadNoInteresse } = this.state

        const { generatedBefore, payed, paymentLink } = this.state
  
        let usersWithPicObject = []
        let data = usersWithPic.map(userId => {
            // const url = require(`../../../public/uploads/${userId}.jpg`)
            const backendUrl='https://backend-ss-heroku.herokuapp.com/'
            const caminho_img=`/public/uploads/${userId}.jpg`
            
            
            const url = backendUrl  + caminho_img 
            const data = {
                url,
                userId
            }
            usersWithPicObject.push(data)
            console.log(usersWithPicObject)
            
        })
        console.log(usersWithPic)
      

        if (loading) {
            return (
                <h1>Carregando

                    <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                    <span class="sr-only">Loading...</span>

                </h1>
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
        }

        if (inProgress) {
            return (
                <div className='d-flex flex-column'>
                    <Nav />
                    <div className='mt-5 pt-4'>
                    <Link to='MyServices'>

                    <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
    </Link>
                    </div>
                    <div class="alert alert-warning m-2 mt-4 pt-4" role="alert">
                        Serviço já está sendo realizado pelo usuário "{dataOfinProgressUser.name}"
                    </div>

                    <div className='align-self-center'>

                        <Link to='Contact'>
                            <button
                                className='btn btn-info'
                                onClick={e => {
                                    const info = {
                                        email: dataOfinProgressUser.email,
                                        name: dataOfinProgressUser.name,
                                        id:dataOfinProgressUser.id,
                                    }
                                    localStorage.setItem('contact',JSON.stringify(info)) 
                                }}
                            >
                                Contatar "{dataOfinProgressUser.name}"
                                </button>
                        </Link>
                    </div>
                                <Footer />
                </div>
            )
        }

        if (payed === 1) {  
            
        

            if (hadNoInteresse) {
                return (
                    <div className='d-flex flex-column'>
                        <Nav />
                        <div className='mt-5 pt-4'>
                            <Link to='MyServices'>

                            <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
                            </Link>
                            <div class="alert alert-warning" role="alert">
                                Serviço não tem usuários interessados no momento
                    </div>
                        </div>
                        <Footer />
                    </div>
                )
            } else {
            
      

  

                return (
                    <div className='mt-4 pt-4 d-flex flex-column'>
                    <Nav />
                        <h1 className='text-center font-weight-bold'>
                    
                            Usuarios interessados</h1>
                        <p className='text-muted text-center'> Para pedir reembolso do boleto, nos envie um email e as informações(nome,descrição, conteúdo e valor) do serviço</p>
    
                        <ul class="list-group">
                            <div>

                            <Link to='MyServices'>

                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            </Link>
                            </div>
                            {users.map(user => (
                                <li
                                    key={user.id}
                                    className='list-group-item m-1'>
                                    <div className='d-flex flex-row justify-content-center'>

                                       

                                     
                                        {/* <i className="fa fa-user" aria-hidden="true">
                                        </i> */}
                                            {user.picUploaded === 1 &&
                                                usersWithPicObject.map(e => (
                                                    <div>
                                                        {e.userId===user.id &&     <div>
                                                            <img src={e.url}
                                                                className='rounded rounded-circle img-ajust'
                                                                width='40%'
                                                 alt="img"/>
                                                </div>}
                                                        
                                                    </div>
                                                ))
                                            } 
                                        
                                        

                                        <div className='d-flex flex-column'>

                                        
                                        <div className='d-flex'>
                                            <span className='font-weight-bold mr-1'>Nome:</span>
                                            <p>{user.name}</p>
                                        </div>
                        
                                        <div className='d-flex'>
                                            <span className='font-weight-bold mr-1'>localização:</span>
                                            <p>{user.location}</p>
                                        </div>

                                        {!!why ? <div className='m-2'>{why}</div> :
                                                  <button
                                                  className='btn btn-info m-2'
                                                  onClick={e => {
                                                      this.getWhy(user.id)
                                                  }}
                                              >Motivo</button>
                                        }
                        
                                        <div className='d-flex'>
                                            <Link to="MyServices">
                                                <button type="button"
                                                    className="btn btn-success mr-1 m-2"
                                                    onClick={e => {
                             
                                                        this.handleAcept(user.id)
                                                    }}
                                                >Aceitar</button>
                                            </Link>
                                
                                            <button
                                                type="button"
                                                className="btn btn-danger m-2"
                                                onClick={e => {
                                                    const data = {}
                                                    const serviceId = parseInt(localStorage.getItem('InterestedInServiceId'))
                                                    //  this.setState({loading:true})
                                                    data.userId = user.id
                                                    data.serviceId = serviceId
                            
                                                    this.handleRefuse(data)
                                                }}
                                            >Recusar</button>
                                        </div>
                            
                                    </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Footer />
                    </div>
                )
            
            }
        } else {
            if (generatedBefore === 0) {       // se n  foi gerado boleto antes  
                return (
                    <div className='m-3 '>
                    <Link to='MyServices'>

                    <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
</Link>
                        <h3 className='text-center'>Para ver usuarios interessados no serviço e contratá-los para o realizar, o boleto deve estar pago</h3> 
                       <p className='text-muted text-center font-weight-bold'>Você pode pedir reembolso do boleto </p>
                       <p className='text-muted text-center'> Para pedir reembolso do boleto, nos envie um email e as informações(nome,descrição, conteúdo e valor) do serviço</p>
                        <Payment />
                         <Footer />
                    </div>
                )
            } else {
                return (
                    <div className='m-3 '>
                   
                           <Link to='MyServices'>

                           <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
                        </Link>
                        
                        
                        <h3 className='text-center m-4'>Para ver usuarios interessados no serviço e contratá-los para o realizar o boleto deve estar pago</h3>

                        
                        <h4 className='text-center m-2'>O Boleto ja foi gerado por você, pode acessa-lo clickando  <a href={paymentLink}> Aqui</a> </h4>
                        <h4 className='text-center m-2 text-muted'> A taxa de serviço é de 2.49 R$</h4>
                        <h4 className='text-center mt-3'>Se preferir, acesse pela URL: {paymentLink}</h4> 
                    <Footer />
                    </div>
                )
            }
        }
    }
}