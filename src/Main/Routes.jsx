import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Register from '../components/Register/Register'
import Signin from '../components/Signin/Signin'
import Home from '../components/Home/Home'
import PrivateRoute from '../components/PrivateRoute'
import MyServices from '../components/MyServices/MyServices'
import ServicePage from '../components/ServicePage/ServicePage'
import servicesAccepts from '../components/servicesAccepts/servicesAccepts'
import InterestedServices from '../components/InterestedServices/InterestedServices'
import Contact from '../components/Contact/Contact'
import ServiceArea from '../components/ServiceArea/ServiceArea'
import Payment from '../components/Payment/Payment'
import About from '../components/About/About'
import Contato from '../components/Contato/Contato'
import Termos from '../components/Termos/Termos'
import Profile from '../components/Profile/Profile'
import PublicProfile from '../components/PublicProfile/PublicProfile'
import NewPassword from '../components/ResetPassword/NewPassword'
import Start from '../components/start/Start'
import AboutUs from '../components/start/AboutUs'
import ContactInitial from '../components/start/ContactInitial'


export default props =>
    <Switch>
        <Route exact path='/' component={Start} />
        <Route path='/Register' component={Register} />
        <Route path='/Signin' component={Signin} />
        <Route path='/About' component={About} />
        <Route path='/Termos' component={Termos} />
        <Route path='/NewPassword' component={NewPassword} />
        <Route path='/Start' component={Start} />
        <Route path='/AboutUs' component={AboutUs} />
        <Route path='/ContactInitial' component={ContactInitial} />

        <PrivateRoute path='/Home' component={Home} />
        <PrivateRoute path='/MyServices' component={MyServices} />
        <PrivateRoute path='/ServicePage' component={ServicePage} />
        <PrivateRoute path='/servicesAccepts' component={servicesAccepts} />
        <PrivateRoute path='/InterestedServices' component={InterestedServices} />
        <PrivateRoute path='/Contact' component={Contact} />
        <PrivateRoute path='/ServiceArea' component={ServiceArea} />
        <PrivateRoute path='/Payment' component={Payment} />
        <PrivateRoute path='/Contato' component={Contato} />
        <PrivateRoute path='/Profile' component={Profile} />
        <PrivateRoute path='/publicProfile' component={PublicProfile} />
    </Switch>