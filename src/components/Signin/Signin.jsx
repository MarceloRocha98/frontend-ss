import React,{useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import api from '../../services/api'
import * as emailjs from 'emailjs-com'
import { data } from 'jquery'
import servicesVideo from '../../assets/videoInitial.mp4'
// import loggin from '../../assets/loggin.mp4'
import './Signin.css'
import Footer from '../templates/Footer'
import logotipo from '../../assets/logotipo.png'


export const userKey = '__userService'

export default function Signin() {
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [recovery,setRecovery]=useState(0)
    const history=useHistory()
    
    async function handleSignin(e) {
        e.preventDefault()



        const Data = {
            email,
            password
        }


        const response = await api.post('signin', Data)
            .then(resp => {
                api.defaults.headers.common['Authorization'] = `Bearer ${resp.data.token}`
              //  this.$store.commit('setUser', resp.data)
                localStorage.setItem(userKey, JSON.stringify(resp.data))

                history.push('/Home')
             //   console.log(resp.data)
            })
            .catch(msg => alert(
                msg.response.data || msg
            ))
     
        
        //console.log(User)
        
      //  localStorage.setItem('token',token)
    }

    async function handleRecoverySubmit() {
      
        const body = {
            email,
        }
        await api.post('forgotPassword', body)
            .then(res => {
          
                // console.log(res.data)
                const token = res.data[0]
                // console.log(token)
                let templateParams = {
                    // from_email: email,
                    to_email:email,
                    from_name: 'Seu serviço',
                    // to_name: 'seuservico.suporte@gmail.com',
                    subject: 'Redefinição de senha',
                    message_html: `Clique no link para redefinir a senha :       <a href="http://localhost:3000/#/Nasdkoakkdsopwoalsndjawsds">http://localhost:3000/#/Nasdkoakkdsopwoalsndjawsds</a>`,
                   }
                   emailjs.send(
                    'gmail',
                    'template_lVSZEkOG',
                     templateParams,
                    'user_I9HMchinqeGSACZnS3DUo'
                )
                    localStorage.setItem('EmailReset',email)
                    alert(`Enviamos um email para ${email}`)
            })
            .catch(err => {
                alert(err.err)
            })
    }
 
    return (

        <div>

        
        <div className="signin-container d-flex flex-md-row justify-content-around">
     
   
            <div className="content d-flex flex-column mt-3"

            >
           
            <img className='logo-img m-2' src={logotipo} alt="logo"/>
            
                    <form
                        style={{borderRadius:"25px"}} 
                        onSubmit={e => {
                            if (recovery === 0) {
                                handleSignin(e)
                            } else {
                                handleRecoverySubmit()
                            }
                        }}
                        className='form mt-4 p-4'
                    >           
                    <div className="form-group">
                        <div className='d-flex'>

                                <span
                                    style={{color:"white"}}
                                    class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span>
                            <label for='email'  style={{color:"white"}} className='font-weight-bold'>Email</label>
                        </div>
                        <input placeholder='Digite seu email'
                            type='email'
                            // style={{width:'85%'}}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id='email'
                            className='form-control form-control-md'
                        />
                    </div>

                  
                        {recovery === 0 &&
                              <div className="form-group">
                              <div className='d-flex'>
      
                                  <span  style={{color:"white"}} class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                                  <label  style={{color:"white"}} for='password' className='font-weight-bold'>Senha</label>
                              </div>
                            <input
                    type='password'
                    placeholder='Digite a sua senha'
                    // style={{width:'85%'}}
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    id='password'
                    className='form-control form-control-md'/>
                </div>       
                    }


                        {recovery === 0 ? <button className="control btn btn-success" style={{ width: '100%' }} type='submit'>Entrar</button>
                            :
                            <button className="control btn btn-success" style={{ width: '100%' }} type='submit'>Recuperar senha</button>
            }
            
                    <div className='d-flex justify-content-around'>
                     {recovery === 0 &&  <Link onClick={e=>setRecovery(1)} style={{fontSize:"16px"}} className='text-center m-1'> Esqueceu a senha?</Link>}
                      <Link to='/Register' style={{fontSize:"16px"}} className='text-center m-1'> Não tem conta?</Link>
                    </div>
                    </form>
                    <button
                        onClick={e=>history.push('/Start')}
                        className='btn btn-warning m-5'>
                        <i class="fa fa-arrow-left mr-1" aria-hidden="true"></i>Voltar para a pagina inicial</button>
                </div>
            {/* <img src={img} className="rounded float-right img-fluid" style={{width:'50%'}} alt="img" /> */}
            <div className=' mt-3 d-md-flex align-self-center'>

            <div className='d-md-flex flex-column al' >
                
            <video width='500' height='480' autoPlay>
                <source src={servicesVideo} type="video/mp4"/>
            </video>
            <button 
                        onClick={e => {
                            history.push('/About')
                        }}
                        className='control2 btn btn-info align-self-center m-2 '>
                        Saiba mais</button>
            </div>
           
                </div>
                
            
        
            </div>
            <Footer />
            </div>
    )
}