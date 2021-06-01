import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import { Navbar } from '../Components/Navbar/Navbar'
import Registration from '../Components/Registration/Registration'
import Login from "../Components/Login/Login"
import { PrivateRoute } from "./PrivateRoute"
import { Explore } from "../Components/Explore/Explore"
import Profile from '../Components/Profile/Profile'
import { UploadPosts } from '../Components/Uploads/UploadPosts'

function Routes() {
    return (
        <>

            <Switch>
                <PrivateRoute path='/' exact >
                    <Navbar />
                    <Home />
                </PrivateRoute>
                <PrivateRoute path='/accounts/emailsignup'>
                    <Registration />
                </PrivateRoute>
                <Route eaxct path='/login'>
                    <Login />
                </Route>
                <PrivateRoute exact path="/explore">
                    <Navbar />
                    <Explore />
                </PrivateRoute>
                <PrivateRoute path="/post/upload">
                    <Navbar />
                    <UploadPosts/>
                </PrivateRoute>
                <PrivateRoute exact path="/:username">
                    <Navbar />
                    <Profile />
                </PrivateRoute>
            </Switch>
        </>
    )
}

export default Routes
