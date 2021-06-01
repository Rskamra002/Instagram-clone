import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import { Navbar } from '../Components/Navbar/Navbar'
import Registration from '../Components/Registration/Registration'
import Login from "../Components/Login/Login"
import {PrivateRoute} from "./PrivateRoute"
import {Explore} from "../Components/Explore/Explore"

function Routes() {
    return (
        <>
        <Navbar/>
        <Switch>
            <PrivateRoute path='/' exact >
                <Home/>

            </PrivateRoute>
            <PrivateRoute path='/accounts/emailsignup'>
                <Registration />
            </PrivateRoute>
            <Route path='/login'>
                <Login />
            </Route>
            <PrivateRoute exact path="/explore">
                <Explore/>
            </PrivateRoute>
        </Switch>
        </>
    )
}

export default Routes
