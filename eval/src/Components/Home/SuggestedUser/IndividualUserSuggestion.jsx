import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"

const IndividualUserSuggestion = ({profile_pic, username}) => {
    return (
        <UserSuggested>
            <InnerBox>
                <img src={profile_pic} alt="pp"/>
                <div>
                    <Link to={`/${username}`}><h4>{username}</h4></Link>
                    <p>New to instagram</p>
                </div>
            </InnerBox>
            <Follow>Follow</Follow>
        </UserSuggested>
    )
}

export {IndividualUserSuggestion}


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
