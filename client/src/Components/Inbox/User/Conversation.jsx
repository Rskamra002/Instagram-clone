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
            <UsernameDetails>
                <p>{friendDetails?.username}</p>
                <FullNamePara>{friendDetails?.fullname}</FullNamePara>
            </UsernameDetails>
        </UsersLink>
    )
}

export default Conversation
const UsersLink = styled(Link)`
    text-decoration: none;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    gap:7px;
    color: black;
    padding:.2rem .5rem;
    &:focus, &:hover, &:visited, &:link {
        text-decoration: none;
    }
    
`;
const UsernameDetails= styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`
const FullNamePara= styled.p`
    color:#9E9E9E;
    font-size: 12px;
`
