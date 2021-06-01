import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Redux/Suggestions/Action';
import styles from "./Navbar.module.css"
import { Notifications } from './Notifications';
import { ProfileDetails } from './ProfileDetails';
import { NavbarIcons } from './NavbarIcons';

function Navbar() {
    const scrollRef = useRef()
    const [query, setQuery] = useState("")
    const [active, setActive] = useState(0)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [searchUserPopUp, setSearchUserPopup] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [profiler, setProfiler] = useState(false) 
    
    const suggestions = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUsers())
    },[dispatch])

    const handleClear = () => {
        setQuery("")
        setSearchUserPopup(false)
    }

    useEffect(() => {
        let output = suggestions?.filter((item) => item.username.toLowerCase().indexOf(query) !== -1 ? true:false).map((item) => [item.id, item.profile_pic, item.username, item.fullname])
        setSuggestedUsers(output)
    },[suggestions, query])



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
    const userSuggest = () => {
        setSearchUserPopup(true)
        setShowNotifications(false)
        setProfiler(false)
    }

    return (
        <>
        <Wrapper>
            <Container>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/>
                <SearchBar onKeyUp={handleActiveSuggestions}>
                    <img src="https://icon-library.com/images/white-search-icon-png/white-search-icon-png-18.jpg" width="18px" height="18px" alt=""/>
                    <input
                    placeholder="Search"
                    value={query}
                    onFocus={userSuggest}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    { searchUserPopUp &&
                    <div onClick={handleClear}>X</div>}
                </SearchBar>
                <NavbarIcons getNotification={getNotification} getUserSettings={getUserSettings}/>
            </Container>
        </Wrapper>
        {searchUserPopUp &&
            <div className={styles.arrow_box}>
            <div className={styles.overs}>
                {
                    !query && 
                    <SuggestionBox ref={scrollRef} len={suggestedUsers?.length}>
                        <Tabs>
                            <p>Recent</p>
                            <h4>Clear All</h4>
                        </Tabs>
                        {
                            suggestions?.map((item) => (
                                <UsersProfile key={item.id}>
                                    <img src={item.profile_pic} alt="profile"/>
                                    <div>
                                        <p>{item.username}</p>
                                        <p>{item.fullname}</p>
                                    </div>
                                </UsersProfile>
                            ))
                        }
                    </SuggestionBox>
                }
                {
                    <SuggestionBox ref={scrollRef} len={suggestedUsers?.length}>
                        { query &&
                            suggestedUsers?.map((item) => (
                                // <Link to={`/${item[2]}`}>
                                    <UsersProfile key={item[0]}>
                                        <img src={item[1]} alt="profile"/>
                                        <div>
                                            <p>{item[2]}</p>
                                            <p>{item[3]}</p>
                                        </div>
                                    </UsersProfile>
                                // </Link>
                            ))
                        }
                    </SuggestionBox>
                }
            </div>
        </div>
        }
        <Notifications showNotifications={showNotifications}/>
        <ProfileDetails profiler={profiler}/>
        </>
    )
}

export {Navbar}

const Wrapper = styled.div`
    height:54px;
    background: white;
    border-bottom: 1px solid rgb(219,219,219);
`
const Container = styled.div`
    width: 68%;
    height:100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const SearchBar = styled.div`
    background: #FAFAFA;
    border: 0.5px solid #DBDBDB;
    align-items: center;
    padding: 2px;
    height: 30px;
    display: flex;
    margin-left: 10%;
    width: 24%;
    border-radius: 3px;
    cursor: pointer;
    input {
        text-align: center;
        border: none;
        width: 90%;
        margin:auto;
        outline: none;
        background: transparent;
        :focus {
            text-align: left;
            padding-left: 5px;
        }
    }
    
`
const SuggestionBox = styled.div`
    display: ${({len}) => (len !== 0 ? "flex" : "none")};
    flex-direction: column;
`
const UsersProfile = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin:5px;
    :hover{
        background: rgb(250,250,250);
    }
    img {
        border-radius: 25px;
        margin: 2px;
    }

`
const Tabs = styled.div`
    display: flex;
    margin:10px 20px 0px 20px;
    justify-content: space-between;
    & * {
        font-weight: 600;
    }
    h4 {
        color: #0296F6;
    }
`
