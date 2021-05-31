import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import { Navbar } from '../Components/Navbar/Navbar'
import Registration from '../Components/Registration/Registration'
import {Explore} from "../Components/Explore/Explore"
function Routes() {
    return (
        <>
        <Navbar/>
        <Switch>
            <Route path='/' exact >
                <Home/>
            </Route>
            <Route path='/accounts/emailsignup' exact>
                <Registration />
            </Route>
            <Route exact path="/explore">
                <Explore/>
            </Route>
        </Switch>
        </>
    )
}

export default Routes
