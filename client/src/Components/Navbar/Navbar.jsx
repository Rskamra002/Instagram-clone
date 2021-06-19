import React, { useEffect, useRef, useState } from 'react';
import {Wrapper, Container, SearchBar, SuggestionBox, Tabs, UsersProfile} from "./NavbarUI"
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Redux/Suggestions/Action';
import styles from "./Navbar.module.css";
import { Notifications } from './Notifications';
import { ProfileDetails } from './ProfileDetails';
import { NavbarIcons } from './NavbarIcons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notificationSeen } from '../../Redux/Notification/action';

function Navbar() {
    const scrollRef = useRef()
    const [query, setQuery] = useState("")
    const [active, setActive] = useState(0)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [searchUserPopUp, setSearchUserPopup] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [profiler, setProfiler] = useState(false) 
    const [profilePic, setProfilePic] = useState("")
    const [username, setUsername] = useState("")
    const [tag, setTag] = useState([])
    const [suggestedTag, setSuggestedTag] = useState([])

    const loggedInUser = useSelector(state => state.login.user);
    const suggestions = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUsers())
        axios.get("http://localhost:2511/hashtags")
        .then((res) => setTag(res.data.data))
        .catch((err) => console.log("error"))
    },[dispatch])
    const handleClear = () => {
        setQuery("")
        setSearchUserPopup(false)
    }
    
    useEffect(() => {
        let output = suggestions?.filter((item) => item.username.toLowerCase().indexOf(query) !== -1 ? true:false).map((item) => [item._id, item.profilePic, item.username, item.fullname])
        setSuggestedUsers(output)
        
        const tagOutput = tag?.filter((item) => item.hashtagName.toLowerCase().indexOf(query) !== -1 ? true: false).map((item) => [item.id, item.hashtagName])
        setSuggestedTag(tagOutput)
        let b = JSON.parse(localStorage.getItem("users"))
        setProfilePic(b.profilePic)
        setUsername(b.username)
    },[suggestions, query, tag])


    const handleActiveSuggestions = (e)=> {
        // scrollRef.current.scrollTop += 20
        switch(e.keyCode) {
            case 40: {
                if(active >= suggestions.length){
                    setActive(0)
                }
                else {
                    setActive((prev) => prev+1)
                }
                break;
            }
            case 38: {
                if(active === 1){
                    setActive(0)
                }else if (active <=0){
                    setActive(suggestions.length)
                }
                else {
                    setActive((prev) => prev-1)
                }
                break;
            }
            default:{
                return;
            }
        }
    }
    const getNotification = () => {
        setShowNotifications(!showNotifications)
        setProfiler(false)
        setSearchUserPopup(false)

    }
    const getUserSettings = () => {
        setProfiler(!profiler)
        setShowNotifications(false)
        setSearchUserPopup(false)
    }
    const openProfile = () => {
        setSearchUserPopup(false)
        setShowNotifications(false)
        setProfiler(false)
        setQuery("")
    }
    const userSuggest = () => {
        setSearchUserPopup(!searchUserPopUp)
        setShowNotifications(false)
        setProfiler(false)
    }
    return (
        <>
        <Wrapper>
            <Container>
                <Link to="/">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/></Link>
                <SearchBar onKeyUp={handleActiveSuggestions}>
                    <img src="https://icon-library.com/images/white-search-icon-png/white-search-icon-png-18.jpg" width="18px" height="18px" alt=""/>
                    <input
                    placeholder="Search"
                    value={query}
                    onFocus={userSuggest}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    { searchUserPopUp &&
                    <div onClick={handleClear}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZR8YEGei6RTXhP4zHE-hDP4GtVtA5jLqnF4FJbK9ixayJ0aObad1qqnIfmZjXxfrXVE4&usqp=CAU" alt="" width="18px" height="18px" style={{padding: "2px", opacity:"0.5"}} />
                    </div>}
                </SearchBar>
                <NavbarIcons getNotification={getNotification} getUserSettings={getUserSettings}
                profilePic={profilePic}
                />
                {searchUserPopUp &&
                <div className={styles.arrow_box}>
                <div className={styles.overs}>
                {
                    !query && 
                    <SuggestionBox ref={scrollRef} len={suggestedUsers?.length}>
                        <Tabs>
                            <p>Search Users</p>
                            {/* <h4>Clear All</h4> */}
                        </Tabs>
                        {
                            suggestions?.map((item) => (
                                <Link to={`/${item.username}`}>
                                <UsersProfile onClick={openProfile} key={item._id}>
                                    <img src={item.profilePic} alt="profile"/>
                                    <div>
                                        <p style={{fontWeight:"600"}}>{item.username}</p>
                                        <p>{item.fullname}</p>
                                    </div>
                                </UsersProfile>
                                </Link>
                            ))
                        }
                    </SuggestionBox>
                }
                {
                    <SuggestionBox ref={scrollRef} len={suggestedUsers?.length}>
                        
                        { query &&
                            suggestedUsers?.map((item) => (
                                <Link to={`/${item[2]}`}>
                                    <UsersProfile onClick={openProfile} key={item[0]}>
                                        <img src={item[1]} alt="profile"/>
                                        <div>
                                            <p style={{fontWeight:"600"}}>{item[2]}</p>
                                            <p>{item[3]}</p>
                                        </div>
                                    </UsersProfile>
                                </Link>
                            ))
                        }
                        {
                            query && suggestedTag.map((item) => (
                                <Link to={`/explore/${item[1]}`}>
                                <UsersProfile onClick={openProfile} key={item[0]}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFJmZhuriNDDE-GBRtIMzFUtpg1hq6ypihFw&usqp=CAU" alt=""/>
                                    <div>
                                        <p>{`#${item[1]}`}</p>
                                    </div>
                                </UsersProfile>
                                </Link>
                            ))
                        }
                    </SuggestionBox>
                }
            </div>
        </div>
        }
        <Notifications showNotifications={showNotifications}/>
        <ProfileDetails profiler={profiler} username={username} 
                openProfile={openProfile}/>
            </Container>
        </Wrapper>
        
        </>
    )
}

export {Navbar}


