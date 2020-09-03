import React from 'react'
import Nav from '../templates/Nav'
import Footer from '../templates/Footer'
import api from '../../services/api'
import { userKey } from '../Signin/Signin'

export default class PublicProfile extends React.Component{
    state = {
        img: '',
        target: {},
        avaliationsPoints: 0,
        totalAvaliations: 0,
        aboutTarget: '',
        
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
        
            const targetId=parseInt (localStorage.getItem('PublicProfile'))
            // console.log(typeof(targetId))
        
            let picUploaded=0
            await api.get(`upload/${targetId}`)
                .then(res => {
                    
                    picUploaded= res.data.data[0].picUploaded
                })
            if (picUploaded === 1) {
                // const backendUrl='http://localhost:8080'
                const backendUrl='https://backend-ss-heroku.herokuapp.com/'
                const caminho_img=`/public/uploads/${targetId}.jpg`
                
                // const img = require(`../../../public/uploads/${user.id}.jpg`)
                const img = backendUrl  + caminho_img 
                this.setState({ img })
        }
        
        await api.get(`users/${targetId}`)
            .then(res => {
                // console.log(res.data.data)
                this.setState({target:res.data.data})
            }).catch(err => {
                alert('Erro')
            })
        
        await api.get(`profile/${targetId}`)
            .then(res => {
                // console.log(res.data.data[0])
                if (res.data.data[0]) {
                    
                    this.setState({
                        aboutTarget: res.data.data[0].aboutMe,
                        avaliationsPoints:res.data.data[0].avaliationsPoints,
                        totalAvaliations:res.data.data[0].totalAvaliations,
                    })
                }
            })
        // console.log(this.state.aboutTarget,this.state.avaliationsPoints,this.state.totalAvaliations)
        
    }

    render() {
        const { img, target, aboutTarget, avaliationsPoints, totalAvaliations} = this.state
        

        return (
            <div>
                <Nav />
                <div className='m-2 p-2 d-flex flex-column'>
                    <h1 className='text-center m-3'>Sobre {target.name}</h1>
                    {img !== '' ?
                        <img
                            src={img}
                            width='30%'
                            className='img-fluid rounded mx-auto d-block rounded-circle ' alt=""
                        /> :
                        <div>
                            <h5 className='mt-2 mb-2 text-center font-weight-bold'>Usuário sem foto de perfil</h5>
                        </div>
                        }
                    
                    {totalAvaliations === 0 ? <h5 className='mt-2 text-center font-weight-bold'>
                        Usuário ainda não foi avaliado</h5> :
                        <h5 className='text-center font-weight-bold mt-3'>
                            Avaliação: Nota {avaliationsPoints / totalAvaliations} de 10</h5>
                    }
                    
                    {aboutTarget !== '' &&
                        <div className='mt-5'>
                        <h5 className='text-center font-weight-bold'>Sobre mim</h5>
                        <h5 className='text-center'>{aboutTarget}</h5>
                        </div>}
                    
    
                    
                </div>
                <Footer />
            </div>
        )
    }
}