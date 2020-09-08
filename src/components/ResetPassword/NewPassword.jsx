import React from 'react'
import api from '../../services/api'


export default class NewPassword extends React.Component{
    state = {
        permited: 0,
        password: '',
        confirmPassword:'',
    }

    async componentDidMount() {
        console.log(this)
        const email = localStorage.getItem('EmailReset')
 
        await api.get(`forgotPassword/${email}`)
            .then(res => {
                // console.log(res.data.token[0].tokenForgot)
                const token = res.data.token[0].tokenForgot
                this.setState({permited:1})
                
            })
            .catch(err => {
            alert(err)
            })
        
        
    }

    async handleSubmit(e) {
        e.preventDefault()
        const { password, confirmPassword } = this.state
        const email = localStorage.getItem('EmailReset')
        const id=email
        const body = {
            password,
            confirmPassword,
        }
        
        await api.put(`forgotPassword/${id}`,body)
            .then(res => {
                // this.setState({password:'',confirmPassword:''})
                this.props.history.push('/Signin')
                localStorage.removeItem('EmailReset')
                alert('Senha alterada com sucesso')
            })
            .catch(err=>alert(err.response.data || 'Erro'))
    }
    render() {
        const {permited} =this.state
        return (
            <div className='m-3'>
                {permited === 1 && 
                    <div>
                  
                     
                    <form
                    onSubmit={e=>this.handleSubmit(e)}
                    >
                        <div className='form-group'>

                        <label for='password'>Nova senha</label>
                            <input
                                onChange={e=>this.setState({password:e.target.value})}
                                id='password'
                                type='password'
                                className='form-control' />
                        </div>

                        
                        <div className='form-group'>
                            <label
                                for='newPassword'
                            >Confirme a nova senha</label>
                            <input
                                type='password'
                                onChange={e=>this.setState({confirmPassword:e.target.value})}
                                id='newPassword'
                                className='form-control' />
                        </div>

                        <button className='btn btn-primary' type='submit'>Confirmar</button>

                    </form>
                        </div>}
            </div>
        )
    }
}