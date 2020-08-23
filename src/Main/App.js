import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import { HashRouter,useHistory } from 'react-router-dom'

import Routes from './Routes'
import Register from '../components/Register/Register.jsx'
import { userKey } from '../components/Signin/Signin';
import api from '../services/api';



export default class App extends Component {
  

  
  render() {

    return (
      <div className='app'>
        
        <HashRouter>
          <Routes />
        </HashRouter>
     </div>
      )
  }
}
