import React from 'react'
import Nav from '../templates/Nav'
import api from '../../services/api'
import { userKey } from '../Signin/Signin'
import Footer from '../templates/Footer'

// import ReactFileReader from 'react-file-reader';
// const { spawn } = require('child_process');
// const pyProg = spawn('python', ['../../teste/moveFile.py']);
// import {PythonShell} from 'python-shell';
// let pyshell = new PythonShell('../../teste/moveFile.py');




export default class Profile extends React.Component{
    state = {
        file: '',
        actualUrl: '',
        preview:'',
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
    
        // await api.get(`upload/${user.id}`)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // await api.get('users')
        //     .then(res => {
        //         // console.log(res.data)
        //         let users = res.data 
        //         let userIn = users.filter(item => {
        //             return item.id===user.id
        //         })
        //          console.log(userIn[0].url)
        //         this.setState({actualUrl:userIn[0].url})
        //     })

        let picUploaded=0
        await api.get(`upload/${user.id}`)
            .then(res => {
                
                picUploaded= res.data.data[0].picUploaded
            })
        if (picUploaded === 1) {
            const backendUrl='http://localhost:8080'
            const caminho_img=`/public/uploads/${user.id}.jpg`
            
            // const img = require(`../../../public/uploads/${user.id}.jpg`)
            const img = backendUrl  + caminho_img 
            this.setState({ actualUrl: img })
        }
       
        
    }



    handleFile(e) {
        this.setState({ file: e })
        console.log(e)

        const file = e
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)  
            fileReader.onloadend = () =>{
                this.setState({preview:fileReader.result})
            }
    }

    async handleSubmit(e) {
        e.preventDefault()
        let file = this.state.file
        
        const formData = new FormData()
        formData.append("pic", file)
        // console.log(formData)
        const user = JSON.parse(localStorage.getItem(userKey))
        // console.log(this.state.file)
        // console.log(file)
        await api.post(`upload/${user.id}`,formData)
            .then(res => {

                // pyProg.stdout.on('data', (data) => {
                //     // Do something with the data returned from python script
                //     console.log(data,'sucesso')
                // });

                // PythonShell.run('../../teste/moveFile.py',  null, function (err) {
                //     if (err) throw err;
                //     console.log('finished');
                // });

                // pyshell.end(function (err,code,signal) {
                //     if (err) throw err;
                //     console.log('The exit code was: ' + code);
                //     console.log('The exit signal was: ' + signal);
                //     console.log('finished');
                //   });
                alert('Foto alterada com sucesso !')
            })
            .catch(err => { 
                console.log(err)
                alert(err)
            })
    }
    render() {
        const { file,actualUrl, preview } =this.state

         
        return (
            <div
            //   className='m-3'
            >
                <Nav />
                <div className='mt-5 pt-2'>
                    
                 
              
             <h4 className='text-center mb-4'> Uma foto de perfil que mostre seu rosto aumenta suas chances de conseguir serviços</h4>
                          
                    <form
                        encType="multipart/form-data"
                        onSubmit={e => {
                            this.handleSubmit(e)
                        }}
                       
                    >
                        
                        <div className="input-group mb-3 align-self-center"
                        style={{width:'85%'}}
                        >
  <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
  </div>
  <div className="custom-file">
  <input 
                            
                            name="pic"
                              type="file"    
                              accept="image/*"
                  onChange={e=>this.handleFile(e.target.files[0])} //e.target.value, e.target.files[0]
                              className="custom-file-input"
                              id="inputGroupFile01"
                              aria-describedby="inputGroupFileAddon01"
                          />
    <label className="custom-file-label" for="inputGroupFile01">Escolha a foto</label>
  </div>
</div>
             
                            {/* <input 
                            
                          name="pic"
                            type="file"    
                            accept="image/*"
                onChange={e=>this.handleFile(e.target.files[0])} //e.target.value, e.target.files[0]
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                        /> */}
           
                        
                            
                        <button
                            type='submit'
                            className='btn btn-primary align-self-center'
                            style={{width:'20%'}}
                            // onClick={e => {
                            //     this.handleSubmit()
                            //     // e.click()
                            // }}
                            >
                            Alterar
                        </button>

                        <p className='text-muted text-center font-weight-bold'>Atualize a pagina para verificar modificações</p>
                    </form>  
                        
                    
                  

                </div>
                {file !== '' && <div
                className='font-weight-bold text-center'
                >
                    Foto selecionada, clicke em "alterar" para salvar
                    
                    </div>}

                {/* {actualUrl !== '' && <div>
                {actualUrl}
                   <img src={actualUrl} alt="user"/> 
                </div>} */}

                {preview !== '' && <div
                    style={{
                    // height:"30%",
                    //     width: "30%",
                        margin:3,
                }}
                >
                    <img
                        
                        class="img-fluid rounded mx-auto d-block rounded-circle"
                        //   height="18%"
                          width="25%"
                        src={preview} alt="preview" />
                </div>}
                {actualUrl !== '' && <div>
                
                    <div>
                    <p className='font-weight-bold text-center m-3 mt-5'>Foto de perfil atual:</p>
                    <img
                        width='30%'
                        className='img-fluid rounded mx-auto d-block rounded-circle mb-3'
                        src={actualUrl} 
                         alt="actualImg" />
                        
                    </div>
                </div>}

                <Footer />

            </div>
        )
    }
}