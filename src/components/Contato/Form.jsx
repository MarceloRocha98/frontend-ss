import React, { Component } from 'react'
import * as emailjs from 'emailjs-com'
// import Layout from '../components/layout'

class ContactForm extends Component {
  state = {
    email: '',
    subject: '',
    message: '',
  }
handleSubmit(e) {
    e.preventDefault()
    const {email, subject, message } = this.state
    let templateParams = {
      from_name: email,
      to_name: 'seuservico.suporte@gmail.com',
      subject: subject,
      message_html: message,
     }
     emailjs.send(
      'gmail',
      'template_lVSZEkOG',
       templateParams,
      'user_I9HMchinqeGSACZnS3DUo'
     )
     this.resetForm()
     
 }
resetForm() {
    this.setState({
      email: '',
      subject: '',
      message: '',
    })
  }
handleChange = (param, e) => {
    this.setState({ [param]: e.target.value })
  }
render() {
    return (
        <form
        onSubmit={this.handleSubmit.bind(this)}
    >
  <div className="form-group p-2">
          <label for="formGroupExampleInput" className='font-weight-bold'
            style={{color:"white"}}
          >Email:</label>
          <input
             style={{fontSize:'17px'}}
                className="form-control text-primary"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange.bind(this, 'email')}
                placeholder="Digite seu email" />
  </div>
  <div className="form-group p-2">
          <label for="formGroupExampleInput2"
            className='font-weight-bold'
            style={{color:"white"}}
          >Assunto:</label>
          <input
            style={{fontSize:'17px'}}
                className="form-control"
                type="text"
                name="subject"
                value={this.state.subject}
                onChange={this.handleChange.bind(this, 'subject')}
                placeholder="Assunto"
            />
  </div>
  <div className="form-group p-2">
          <label
             style={{color:"white"}}
            for="formGroupExampleInput4"
            className='font-weight-bold'
          >Mensagem:</label>
          <textarea 
            style={{fontSize:'17px'}}
    className="form-control" 
    type="textarea"
    name="message"
    // className="text-primary"
    value={this.state.message}
    onChange={this.handleChange.bind(this, 'message')}
    placeholder="Como podemos ajudar ?"
    ></textarea>
            {/* <input
               type="textarea"
               name="message"
               className="text-primary"
               value={this.state.message}
               placeholder='Como podemos ajudar ?'
               onChange={this.handleChange.bind(this, 'message')}
            /> */}
  </div>
        <button type="submit" className="btn btn-info m-3" style={{ width: "25%", alignSelf: "center" }}
          onClick={e => {
            alert('Recebemos sua mensagem, entraremos em contato!')
          }}
        
        >Enviar</button>
</form>
    )
  }
}
export default ContactForm