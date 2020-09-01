import React from 'react'
import { userKey } from '../Signin/Signin'
import api from '../../services/api'
import { Link } from 'react-router-dom'


export default class ServiceArea extends React.Component {

    state = {
        chekingLocal1: 0,
        chekingLocal2: 0,
        finish1: 0,
        finish2: 0,
        token: 0,
        loading:true,


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






        const data = JSON.parse(localStorage.getItem('serviceAreaInfo'))
        console.log(data)
        console.log(data.userOwner)

        if (!data.userOwner) {
            const chekingLocal1 = 1
            this.setState({ chekingLocal1 })
            const id = data.userId1

            await api.put(`serviceArea/${id}/${chekingLocal1}`)
                .then(res => {
                    // console.log(res)
                    //    alert('sucesso')
                }).catch(err => {
                    alert(err)
                })

            const userId2 = data.userId2
            const serviceId = data.serviceId

            await api.get(`serviceArea/${id}/${serviceId}?userId2=${userId2}`)
                .then(res => {
                    console.log(res.data.data)
                    const check = res.data.data
                    console.log(check[0].chekingLocal2)
                    this.setState({ chekingLocal2: check[0].chekingLocal2 })
                }).catch(err => alert(err))


        } else {
            const chekingLocal2 = 1
            this.setState({ chekingLocal2 })
            const id = data.userId1

            await api.put(`serviceArea/${id}/${undefined}?chekingLocal2=${chekingLocal2}`)
                .then(res => {
                    // console.log(res)
                    // alert('sucesso')
                }).catch(err => {
                    alert(err)
                })

            const userId2 = data.userId2
            const serviceId = data.serviceId
            //  const owner=1
         
            

            await api.get(`serviceArea/${id}/${serviceId}?userId2=${userId2}`)
                .then(res => {
                    console.log(res.data.data)
                    const check = res.data.data
                    console.log(check[0].chekingLocal1) //// ta retornando undefined ->problemaaaa
                    this.setState({ chekingLocal1: check[0].chekingLocal1 })

                }).catch(err => alert(err))

        }


        const serviceId = data.serviceId
        await api.get(`serviceArea/${data.userId1}/${serviceId}?userId2=${data.userId2}`)
            .then(res => {
                console.log(res.data.data)
                this.setState({ finish1: res.data.data[0].finish1 })
                this.setState({ finish2: res.data.data[0].finish2 })
                this.setState({loading:false})
            })
            .catch(err => alert(err))





    }



    async handleFinish(value) { //pro dono do serviço
        const data = JSON.parse(localStorage.getItem('serviceAreaInfo'))
        const serviceId = data.serviceId

        if (value === 'finish2') {


            await api.put(`serviceArea/${serviceId}?finish2=1`)
                .then(res => {
                    this.setState({ finish2: 1 })
                    alert('Pronto! Falta apenas o usuario que realizou o serviço também marcar a caixa')
                })
                .catch(err => {
                    alert(err)
                })
        }
        if (value === 'finish1') {


            await api.put(`serviceArea/${serviceId}?finish1=1`)
                .then(res => {
                    this.setState({ finish1: 1 })
                    alert('Pronto! Falta apenas o dono do serviço também marcar a caixa')
                })
                .catch(err => {
                    alert(err)
                })

        }
        await api.get(`serviceArea/${data.userId1}/${serviceId}?userId2=${data.userId2}`)
            .then(res => {
                console.log(res.data)
                this.setState({ finish1: res.data.data[0].finish1 })
                this.setState({ finish2: res.data.data[0].finish2 })
                console.log(this.state.finish1, this.state.finish2)
            })
            .catch(err => alert(err))
    }

    token(){
                
        const data = JSON.parse(localStorage.getItem('serviceAreaInfo'))

        const serviceId = data.serviceId
        api.get(`serviceArea/${data.userId1}/${serviceId}?userId2=${data.userId2}`)
            .then(res => {
                console.log(res.data.data[0].id) 
                // console.log(res.data.data)  
                let token=res.data.data[0].id
                this.setState({ token })
                alert(`O código do serviço é ${token}`)

            })
            .catch(err => alert(err))
    }

    render() {
        const info = JSON.parse(localStorage.getItem('contact'))
        const { chekingLocal2 } = this.state
        const { chekingLocal1 } = this.state

        const data = JSON.parse(localStorage.getItem('serviceAreaInfo'))
        //console.log(this.state.chekingLocal1)
        //console.log(this.state.chekingLocal2)

        const { finish1, finish2, token,loading } = this.state

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
       

        if (!chekingLocal2) {
            return (
                <div>
                    <div className='m-3'>

                        <Link to='Contact'>

                        <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
                        </Link>
                    </div>
                    <div className="alert alert-warning m-3" role="alert">
                        O usuario {info.name} ainda não confirmou sua chegada, por favor o avise
                </div>
                    <p className='text-muted text-center'>Atualize a pagina para verificar novas modificações</p>

                </div>
            )
        }
        if (!chekingLocal1) {
            return (
                <div>
                    <div className='m-3'>

                        <Link to='Contact'>

                        <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
                        </Link>
                    </div>
                    <div className="alert alert-warning m-3" role="alert">
                        O usuario que ira realizar o serviço ainda não confirmou sua chegada, por favor o avise se o mesmo estiver chegado,ou aguarde caso não tenha
                </div>
                    <p className='text-muted text-center'>Atualize a pagina para verificar novas modificações</p>
                </div>
            )
        }

        if (data.userOwner === 1 && (chekingLocal1 !== false && chekingLocal2 !== false) && (finish1 === 0 || finish2 === 0)) { //dono do serviço
            // console.log(finish1,finish2)
           
            return (
                <div className='d-flex flex-column'>


                    
                    <div class="alert alert-info text-center" role="alert">
                        Quando o serviço for realizado selecione a caixa abaixo "Serviço finalizado"
</div>
                    <div class="form-check align-self-center">
                        <input
                            class="form-check-input" type="checkbox"
                            value="finish2" id="defaultCheck1"

                            onClick={e => {
                                console.log(e.target.value)
                                this.handleFinish(e.target.value)
                                //console.log(e.target.value==='finish2')
                            }}
                        />
                        <label class="form-check-label" for="defaultCheck1">
                            Serviço finalizado
  </label>


                    </div>
                </div>
            )
        }
        if (data.userOwner === 0 && (chekingLocal1 !== 0 && chekingLocal2 !== 0) && (finish1 === 0 || finish2 === 0)) { // qm vai realizar o serviço

            return (
                <div className='d-flex flex-column'>
               
                    <div class="alert alert-info text-center" role="alert">
                        Quando o serviço for realizado selecione a caixa abaixo "Serviço finalizado"
</div>
                    <div class="form-check align-self-center">
                        <input
                            class="form-check-input" type="checkbox"
                            value="finish1" id="defaultCheck1"
                            onClick={e => {
                                this.handleFinish(e.target.value)
                            }}
                        />
                        <label class="form-check-label" for="defaultCheck1">
                            Serviço finalizado
  </label>
                    </div>
                </div>
            )
        }

        if (finish1 !==0  && finish2 !== 0) {
            console.log(finish1,finish2)
               
            return (
                <div className='mt-4 d-flex flex-column'>
                    
                    <div className="float-left">

                    <Link to='Home'>

                    <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
    </Link>
                    </div>
                    <p className='text-center font-weight-bold'> Serviço realizado, clique no botão para ver o código do serviço </p>
                    <p className='text-center'> O pagamento será efetuado em até 3 dias úteis, caso tenha problemas nos contate e informe o código do serviço</p>
                    <button
                        className='btn btn-info align-self-center'
                        onClick={e => {
                            this.token()
                        }}
                    >Código do serviço</button>
                </div>
            )
        }
        // console.log(finish1,finish2)
     

            // const serviceId = data.serviceId
            // api.get(`serviceArea/${data.userId1}/${serviceId}?userId2=${data.userId2}`)
            //     .then(res => {
            //         //         console.log(res.data.data[0].id)
            //         this.setState({ token: res.data.data[0].id })

            //     })
            //     .catch(err => alert(err))
            
       
        // if (finish1 !== 0) {
        //     console.log(finish1)
        //     return (
        //         <div>test</div>
        //     )
        // }
        return (
            <div>
                serviço finalizado
                 {/* token {token} */}
            </div>
        )
    }
}