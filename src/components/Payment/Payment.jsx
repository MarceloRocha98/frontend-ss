import React from 'react'
import api from '../../services/api'
import { userKey } from '../Signin/Signin'
import { Link } from 'react-router-dom'
import './Payment.css'
//////////// OBS: pra produção, mudar de sandbox pro original, https://sandbox.pagseguro.uol.com.br/primeiros-passos.html
export default class Payment extends React.Component {

    state = {
        paymentLink: "",
        CPF: "",
        areaCode: "",
        number:"",
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
                //   this.setState({ loading: false })

            })
        
        
        

    
        //console.log(JSON.stringify(body))
    }


    async gerarBoleto(CPF,areaCode,number) {
        const user = JSON.parse(localStorage.getItem(userKey))
  
        const serviceId = parseInt(localStorage.getItem('InterestedInServiceId'))
        console.log(serviceId)
        let description = ''
        let count=0
        await api.get(`services/${user.id}`)
            .then(res => {
                count = res.data.count
               // console.log(count)
            })
        
        let services=[]
        await api.get(`services/${user.id}?limit2=${count}`)
            .then(res => {
               // console.log(res.data.data)
                services=res.data.data
            })
        services = services.filter(service => {
            return service.id===serviceId
        })
        console.log(services)
        description = services[0].description
        let price = services[0].price 
        
        console.log(description)
        console.log(price)

        let data = new Date()
        let dia = data.getDate()
        let mes = data.getMonth()
        let ano = data.getFullYear()
        if (mes < 10) {
            mes=`0${mes}`
        } else {
            mes=`${mes}`
        }
        //const actualDate=`${ano}-${mes}-${dia}`
        let actualDate=new Date(`${ano}-${mes}-${dia}`)
        let newDate=new Date();
        newDate.setDate(actualDate.getDate()+3)
        //console.log(`${actualDate}`)
     //   console.log(`${newDate}`)
         dia = newDate.getDate()
         mes = newDate.getMonth()+1
         ano = newDate.getFullYear()
         if (mes < 10) {
            mes=`0${mes}`
        } else {
            mes=`${mes}`
    }
         if (dia < 10) {
            dia=`0${dia}`
        } else {
            dia=`${dia}`
    }
    let firstDueDate=`${ano}-${mes}-${dia}`
        console.log(`${firstDueDate}`)

        let taxaPagseguro = 0.24
        let lucro = 1.25

        price=price+taxaPagseguro+lucro

        
        const body={ 
            reference: `${serviceId}`, // n obg
            firstDueDate: `${firstDueDate}`,
            numberOfPayments: "1",
            periodicity: "monthly",
            amount: `${price}`,                //////////////////////////////// retirar o +5
            description: `${description}`,
            customer: {
                document: {
                    type: "CPF",
                    value: CPF
                },
                name: `${user.name}`,
                email: `${user.email}`, //n obg
                phone: {
                    areaCode: areaCode,
                    number:number
                }
            }
        }
        api.defaults.headers['Content-Type']= `application/json;charset=ISO-8859-1`
        api.defaults.headers['Accept']= `application/json;charset=ISO-8859-1`
     

        api.defaults.headers['Access-Control-Allow-Origin'] = 'https://frontend-ss-heroku.herokuapp.com/'
        // api.defaults.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        api.defaults.headers['Access-Control-Allow-Methods'] = `POST`
        api.defaults.headers['Access-Control-Allow-Headers'] = `Content-Type, Accept, Origin`
        api.defaults.headers['Keep-Alive'] = `timeout=65`
      //  api.defaults.headers['Origin'] = `http://localhost:3000`
        api.defaults.headers.common['Access-Control-Allow-Credentials'] = `true`
        api.defaults.headers.common['Access-Control-Max-Age'] = 60
        console.log(JSON.stringify(body))
       
        api.post("https://ws.pagseguro.uol.com.br/recurring-payment/boletos?email=marceloteixeirar2014@gmail.com&token=d5e0f8f6-0e88-46cb-ad94-017e7fb210eb09ca31494dd686af69e0e16198f5cfa2e313-f257-4a30-baa5-d0d8422807ef", JSON.stringify(body))
            .then(async res => {
                console.log(res.data.boletos)  //barcode,code,dueDate,paymentLink
               
               
                const barcode = res.data.boletos[0].barcode 
                const code = res.data.boletos[0].code 
                const dueDate = res.data.boletos[0].dueDate 
                const paymentLink = res.data.boletos[0].paymentLink
                

                const dados = {
                    userId: user.id,
                    serviceId: serviceId,
                    generatedBefore:1,
                    barcode,
                    code,
                    dueDate,
                    paymentLink,
                }

                await api.post('payment', dados)
                    .then(res => {
                        console.log(res)
                        this.setState({ CPF: '', areaCode: '', number: '' }) 
                        alert('Boleto gerado com sucesso! Atualize a página para acessa-lo')
                        // this.props.history.push('/MyServices')
                    })
                    .catch(err => {
                        alert('Erro')
                        console.log(err.response.data)
                      
                    })
                
                
                
            }).catch(err => {
                // this.props.history.push('/MyServices')
                // console.log(this.props)
                alert('Erro!')
                // console.log(err.response.data)
            })
        
    }
  



    render() {
        const { CPF,areaCode,number } = this.state



        
        return (
            <div className='d-flex m-3 flex-column'>
             
              
                <h3 className='text-center m-3'>Preencha todas as informações abaixo para gerar o boleto</h3>
              
                <div className='d-md-flex flex-column m-3'>
    
    

                <input
                  
                  className='form-control'
                    // style={{width:'25%'}}
                    value={CPF}
                    placeholder='Digite seu CPF'
                    onChange={e => {
                        this.setState({ CPF: e.target.value })
                    }}
                    />
                    
              
                        
              
                <input
                    className='form-control'
                    // style={{width:'13%'}}
                    value={areaCode}
                    placeholder='código de area (DDD)'
                    onChange={e => {
                        this.setState({ areaCode: e.target.value })
                    }}
                    />
                
                <input
                    className='form-control'
                    // style={{width:'25%'}}
                    value={number}
                    placeholder='Número do telefone'
                    onChange={e => {
                        this.setState({ number: e.target.value })
                    }}
                    />
                   
                <button className='btn btn-success ml-2 align-self-center'
                        onClick={e => {
                            alert('Aguarde...')
                            this.gerarBoleto(this.state.CPF,this.state.areaCode,this.state.number)
                        }}
                        >
                    Gerar boleto
                </button>
                        </div>
             
                    
            </div>
        )
    }
}