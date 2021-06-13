import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UsersStyle from './users.module.css'

function Conversation({loggedInUser,connverUser}) {
    const [friendDetails,setfriendDetails] = useState(null)
    
    useEffect(async () => {
        const friendId = connverUser.members.find(it=>it !== loggedInUser._id)
        await axios.get("")
    }, [])
    
    return (
        <div></div>
        // <UsersLink to={`/direct/inbox/${item._id}`} key={item._id} className={UsersStyle.indItems} >
        //     <div>
        //         <img className={UsersStyle.userProfileImg} src={item.profilePic} alt="" />
        //     </div>
        //     <div>
        //         <p>{item.username}</p>
        //         <p>{item.fullname}</p>
        //     </div>
        // </UsersLink>
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