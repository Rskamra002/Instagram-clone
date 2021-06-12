import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../Redux/Suggestions/Action';
import { loadData } from '../../../Utils/localStorage';
import UsersStyle from './users.module.css'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Users() {
    const loggedInUser = loadData("users");
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div className={UsersStyle.main} >
            <div className={UsersStyle.loginuser}>
                <div></div>
                <div className={UsersStyle.loginUserName}>
                    <p>
                        {loggedInUser.username} 
                    </p>
                    <p>
                        <svg style={{transform: "rotate(180deg)",marginTop:"5px"}} fill="#262626" height="20" viewBox="0 0 48 48" width="20">
                            <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                        </svg>
                    </p>
                </div>
                <svg fill="#262626" viewBox="0 0 44 44" height="24" width="24">
                    <path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path>
                    <path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path>
                    <path d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"></path>
                </svg>
            </div>
            <div className={UsersStyle.userMain}>
                {
                    user?.filter(it=>it.id !== loggedInUser.id).map(item=>(
                        <UsersLink to={`/direct/inbox/${item.username}`} key={item.id} className={UsersStyle.indItems} >
                            <div>
                                <img className={UsersStyle.userProfileImg} src={item.profile_pic} alt="" />
                            </div>
                            <div>
                                <p>{item.username}</p>
                                <p>{item.fullname}</p>
                            </div>
                        </UsersLink>
                    ))
                }
            </div>
        </div>
    )
}

export default Users
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