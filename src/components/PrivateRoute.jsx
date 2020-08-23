import React from 'react'
import { Route, Redirect } from 'react-router'

const PrivateRoute = props => {
    const isLogged = !!localStorage.getItem('__userService')
    return isLogged ? <Route {...props} /> : <Redirect to='/Signin' />
    
} 

export default PrivateRoute 