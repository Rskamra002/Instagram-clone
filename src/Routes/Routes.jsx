import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import { Navbar } from '../Components/Navbar/Navbar'
import Registration from '../Components/Registration/Registration'
function Routes() {
    return (
        <>
        <Navbar/>
        <Switch>
            <Route path='/' exact >
                <Home/>
            </Route>
            <Route path='/accounts/emailsignup'>
                <Registration />
            </Route>
        </Switch>
        </>
    )
}

export default Routes
