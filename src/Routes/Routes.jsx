import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Login from '../Components/Login/Login'
import Home from '../Components/Home/Home'
import Registration from '../Components/Registration/Registration'
function Routes() {
    return (
        <Switch>
            <Route path='/' exact >
                <Home/>
            </Route>
            <Route path='/accounts/emailsignup'>
                <Registration />
            </Route>
        </Switch>
    )
}

export default Routes
