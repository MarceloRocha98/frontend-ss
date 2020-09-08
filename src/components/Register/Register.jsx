import React from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './Register.css'
import servicesVideo from '../../assets/servicesVideo2.mp4'
import Footer from '../templates/Footer'
// import Footer from '../templates/Footer'
export default class Register extends React.Component { 

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: 'sp',
        sobrenome: "",
        termos:0,
    }

    
    async handleRegister() { 
        //  e.preventDefault();
        let { name, email, password, confirmPassword, location,sobrenome, termos } = this.state
     //   console.log(name)
        let k = 0
        if (termos === 1) {
            
        
            try {
                // if (sobrenome === '') {
                //     throw 'Sobrenome não informado'
                // }
                // if (name === '') {
                //     throw 'Nome não informado'
                // }
                // name = name + " " + sobrenome
                const data = {
                    name,
                    sobrenome,
                    email,
                    password,
                    confirmPassword,
                    location,
                
                }
        
                await api.post('signup', data)
                    .then(e => {

                    
                        alert('Cadastrado com sucesso')
                        this.props.history.push('/Signin')
                    }
                    )
            } catch (msg) {
                //   console.log(msg.response.data)
                alert(msg.response.data)
            
           
            }
            this.clear()
        } else {
            alert('É necessário aceitar os termos de uso para prosseguir')
        }


       // alert('kk')
    }

    clear() {
        this.setState({ name:'',email:'',password:'',confirmPassword:'',location:'',sobrenome:''})
    }

    // componentDidMount() {
    //     console.log(this.props)
    // }
    render() {
      const  {name,email,password, confirmPassword,location } =this.state
      const estados=[ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"]
      console.log(location) 
      
        return (
            <div>
        
            <div className="register-container d-md-flex flex-md-row textcolor2">
                <div className="content d-md-flex">
                    <section>
                        <h1 className='font-weight-bold'>Cadastro</h1>
                        <p className='text-muted font-weight-bold'>Faça seu cadastro</p>
                       
                         
                            <button
                                onClick={e=>this.props.history.goBack()}
                                type="button" style={{ borderRadius: '8px' }} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Voltar</span> </i></button>
                         
                        
                    </section>


                
                    <form className='mb-3 mr-3'
                        onSubmit={e => {

                            this.handleRegister()
                           // alert('teste')
                    }
                    }>

                        <div className="form-group">
                            <label for='name'><p className='text-center font-weight-bold'>Nome</p>
                            <p className='text-muted font-weight-bold text-center mt-0'>Somente letras</p>
                            </label>
                            <input placeholder='Digite seu nome'
                                value={this.state.name}
                                onChange={e => this.setState({name:e.target.value})}
                                id='name'
                                className='form-control form-control-md'
                                type='text'
                            />
                        </div>
                        <div className="form-group">
                            <label for='sobrenome'><p className='text-center font-weight-bold'>Sobrenome</p></label>
                            <input placeholder='Digite seu sobrenome'
                                value={this.state.sobrenome}
                                onChange={e => this.setState({sobrenome:e.target.value})}
                                id='sobrenome'
                                className='form-control form-control-md'
                                type='text'
                            />
                        </div>
        
                        {/* <div class="form-group">
                        <label for="exampleFormControlSelect1">Estado</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                                {estados.map(sigla => (
                                 
                                    <option value={location}>{sigla}</option>
                                 
        ))}          
    </select>
                        </div> */}
      
                        <div className="form-group">
                            <label for='name'><p className='text-center font-weight-bold'>Estado</p> <p className='text-muted font-weight-bold text-center'>No momento, só em SP</p></label>
                            <select className='form-control ml-2'>
                                <option value={location}>SP</option>
                           </select>
                            {/* <input placeholder='Digite a sigla do seu estado'
                                value={location}
                                onChange={e => this.setState({location:e.target.value})}
                                id='location '
                                className='form-control form-control-md'
                                type='text'
                            /> */}
                        </div>
                    
                        <div className="form-group">
                            <label for='email'><p className='text-center font-weight-bold'>Email</p>
                            <p className='text-muted font-weight-bold font-weight-bold text-center mt-0'>Digite um e-mail válido, entraremos em contato através dele</p>
                            </label>
                            <input placeholder='Digite seu email'
                                type='email'
                                value={email}
                                onChange={e => this.setState({email:e.target.value})}
                                id='email'
                                className='form-control form-control-md'
                            />
                        </div>

                        <div className="form-group">
                            <label for='password'><p className='text-center font-weight-bold'>Senha</p></label>
                            <input
                                type='password'
                                placeholder='Defina a sua senha'
                                value={password}
                                onChange={e => this.setState({password:e.target.value})}
                                id='password'
                                className='form-control form-control-md'
                            />

                        </div>

                        <div className="form-group">
                            <label for='confirmPassword'> <p className='text-center font-weight-bold'>Confirme sua senha</p></label>
                            <input
                                type='password'
                                placeholder='Confirme sua senha'
                                value={confirmPassword}
                                onChange={e => this.setState({confirmPassword:e.target.value})}
                                id='confirmPassword'
                                className='form-control form-control-md'
                            />
                        </div>

                        <div class="form-check mb-3">
  <input 
                                onClick={e => {
                                    this.setState({termos:1})
    }}
    className="form-check-input " type="checkbox" value="" id="defaultCheck1"/>
  <label className="form-check-label mt-1" for="defaultCheck1">
   Aceitar <a href="#Termos">termos de uso</a>
  </label>
</div>

                        <button
                            
                            className="btn btn-success align-self-center"
                            style={{ width: '100%' }}
                            type='submit'
                        >Cadastrar</button>
                    </form>


                </div>

                <div className='mt-3 video'>
                <video width='780' height='480' autoPlay>
                <source src={servicesVideo} type="video/mp4"/>
                
            </video>
                </div>
     
                </div>
                
                <Footer /> 
            </div> 
        )
    }

}