import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { loadData } from '../../../Utils/localStorage'
import { UpdateFollows } from '../../Profile/UserProfile/UpdateFollows'
import UnFollowPopup from './UnFollowPopup'
const IndividualUserSuggestion = (data) => {
    const { profilePic, username, id } = data;
    const [isFollowing, setIsFollowing] = useState(false);
    const [popup, setPopup] = useState(false)
    const loggedInUser = loadData('users')

    const handleFollow = (id) => {
        UpdateFollows(loggedInUser.id, id)
        setIsFollowing(!isFollowing);
    }
    const handleUnfollow = (id) => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false)
    }

    const updateFollowStatus = () => {
        setIsFollowing(!isFollowing)
    }
    
    return (
        <UserSuggested>
            <InnerBox>
                <img src={profilePic} alt="pp" />
                <div>
                    <Link to={`/${username}`}><h4>{username}</h4></Link>
                    <p>New to instagram</p>
                </div>
            </InnerBox>
            {
                !isFollowing ? <Follow onClick={() => handleFollow(id)}>{"Follow"}</Follow> :
                    <Unfollow onClick={() => handleUnfollow(profilePic, username, id)}>{"Following"}</Unfollow>
            }
            <UnFollowPopup {...data} popup={popup} closePopup={closePopup} updateFollowStatus={updateFollowStatus} />
        </UserSuggested>
    )
}

export { IndividualUserSuggestion }


const UserSuggested = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2px 0px;
    img {
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    h4{
        font-weight: 600;
        font-size: 14px;
    }
    p{
        color: #9C9C9C;
        font-size: 12px;
    }
`
const InnerBox = styled.div`
    display: flex;
    align-items: center;
    gap:15px;
    a{
        text-decoration: none;
        color:black
    }
`
const Follow = styled.div`
    color: #55B7F7;
    font-size: 14px;
    cursor: pointer;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
`
const Unfollow = styled.div`
    color: #000000;
    font-size: 14px;
    cursor: pointer;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
`