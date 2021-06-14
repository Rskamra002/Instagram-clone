import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UsersStyle from './users.module.css'

function Conversation({loggedInUser,connverUser}) {
    const [friendDetails,setfriendDetails] = useState(null)
    
    useEffect(async () => {
        const friendId = connverUser.members.find(it=>it !== loggedInUser)
        await axios.get(`http://localhost:2511/users/${friendId}`).then(res=>setfriendDetails(res.data.data))
    }, [connverUser,loggedInUser])
    
    return (
        // <div></div>
        <UsersLink to={`/direct/inbox/${connverUser?._id}/${friendDetails?._id}`} key={friendDetails?._id}>
            <div>
                <img className={UsersStyle.userProfileImg} src={friendDetails?.profilePic} alt="" />
            </div>
            <div>
                <p>{friendDetails?.username}</p>
                <p>{friendDetails?.fullname}</p>
            </div>
        </UsersLink>
    )
}

export default Conversation
const UsersLink = styled(Link)`
    text-decoration: none;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    gap:10px;
    color: black;
    padding:.2rem .5rem;
    &:focus, &:hover, &:visited, &:link {
        text-decoration: none;
    }
    
`;