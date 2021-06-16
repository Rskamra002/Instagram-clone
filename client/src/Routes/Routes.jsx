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
import { Inbox } from '../Components/Inbox/Inbox'
import { WatchStories } from '../Components/Stories/WatchStories'
import Tags from '../Components/Tags/Tags'
import { IGTVupload } from '../Components/Uploads/IGTVuploadPost'

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
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/signup'>
                    <Registration/>
                </Route>
                <PrivateRoute exact path="/explore">
                    <Navbar />
                    <Explore />
                </PrivateRoute>
                <PrivateRoute path="/post/upload">
                    <Navbar />
                    <UploadPosts/>
                </PrivateRoute>
                <PrivateRoute path="/tv/upload">
                    <Navbar/>
                    <IGTVupload/>
                </PrivateRoute>
                <PrivateRoute exact path="/direct/inbox">
                    <Navbar/>
                    <Inbox/>
                </PrivateRoute>
                <PrivateRoute exact path="/direct/inbox/:conversationId/:friendId">
                    <Navbar/>
                    <Inbox/>
                </PrivateRoute>
                <PrivateRoute exact path="/:username">
                    <Navbar />
                    <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/explore/:tags">
                    <Navbar/>
                    <Tags/>
                </PrivateRoute>
                <PrivateRoute exact path='/stories/:index'>
                    <WatchStories/>
                </PrivateRoute>
            </Switch>
        </>
    )
}

export default Routes
