import React,{useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import api from '../../services/api'
import { data } from 'jquery'
import servicesVideo from '../../assets/videoInitial.mp4'
// import loggin from '../../assets/loggin.mp4'
import './Signin.css'
import Footer from '../templates/Footer'

export const userKey = '__userService'

export default function Signin() {
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
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
 
    return (

        <div>

        
        <div className="signin-container d-flex flex-md-row bg justify-content-around">
        

           
            {/*         
        <video width='400' height='300' autoPlay>
                <source src={loggin} type="video/mp4"/>
            </video> */}

            <div className="content d-flex mt-3"
       
            >
            <section className='m-5'> 
                <h1 className='font-weight-bold'>Entrar</h1>
                <p className='text-muted font-weight-bold'>Acesse a plataforma!</p>
                <Link to='/Register'>
               
                <button type="button" style={{borderRadius:'8px'}} class="btn btn-warning"> <i class="fa fa-arrow-left " aria-hidden="true" size={16} color='#E02041'> <span className='text-decoration-none'> Não tem cadastro?</span> </i></button>
                </Link>
            </section>


            
            <form onSubmit={handleSignin} className='mt-4' >           
                    <div className="form-group">
                        <div className='d-flex'>

                            <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span>
                            <label for='email' className='font-weight-bold'>Email</label>
                        </div>
                        <input placeholder='Digite seu email'
                            type='email'
                            style={{width:'85%'}}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id='email'
                            className='form-control form-control-md'
                        />
                    </div>

                    <div className="form-group">
                        <div className='d-flex'>

                            <span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                            <label for='password' className='font-weight-bold'>Senha</label>
                        </div>
                <input
                    type='password'
                    placeholder='Digite a sua senha'
                    style={{width:'85%'}}
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    id='password'
                    className='form-control form-control-md'
                    />

                </div>       

                <button className="control btn btn-success ml-3" style={{width:'75%'}} type='submit'>Entrar</button> 
            </form>

            </div>
            {/* <img src={img} className="rounded float-right img-fluid" style={{width:'50%'}} alt="img" /> */}
            <div className=' mt-3 d-md-flex align-self-center'>

            <div className='d-md-flex flex-column' >
                
            <video width='500' height='480' autoPlay>
                <source src={servicesVideo} type="video/mp4"/>
            </video>
            <button 
                        onClick={e => {
                            history.push('/About')
                        }}
                        className='control2 btn btn-info align-self-center m-2'>
                        Saiba mais</button>
            </div>
           
                </div>
                
            
        
            </div>
            <Footer />
            </div>
    )
}