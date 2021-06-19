import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { exploreFill, exploreOutline, homeFill, homeOutline, likeFill, likeOutline, messageFill, messageOutline, postUploadOutline } from './IconSvg'


const NavbarIcons = ({getNotification, getUserSettings, profilePic}) => {

    const [activePage, setActivePage] = useState("/")

    const isNewNotificationSeen = useSelector(state => state.notifications.isNewNotificationSeen);

  


    return (
        <IconsWrapper>
                <Link to="/">
                <div onClick={() => setActivePage("/")}>
                {
                    activePage === "/" ? (homeOutline) : (homeFill)
                }
                </div>
                </Link>
                <Link to="/post/upload">
                <div onClick={() => setActivePage("/post/upload")}>
                    {
                        activePage === "/post/upload" ? postUploadOutline : postUploadOutline
                    }
                </div>
                </Link>
                <Link to="/direct/inbox">
                <div onClick={() => setActivePage("/direct/inbox")}>
                    {
                        activePage === "/direct/inbox" ? messageFill : messageOutline
                    }
                </div>
                </Link>
                <Link to="/explore">
                <div onClick={() => setActivePage("/explore")}>
                    {
                        activePage === "/explore" ? exploreFill : exploreOutline
                    }
                </div>
                </Link>
                <Notifiy onClick={getNotification}>
                    {
                        activePage === "activity" ? likeFill : likeOutline
                    }
                    {!isNewNotificationSeen ? <span>.</span> : null}
                </Notifiy>
                <div onClick={() => setActivePage("/profile")}>
                <ProfilePicture onClick={getUserSettings} src={profilePic} alt="profilePic"/>
                </div>
        </IconsWrapper>
    )
}

export {NavbarIcons}

const IconsWrapper = styled.div`
    display: flex;
    gap: 18px;
    & * {
        cursor: pointer;
    }
`
const Notifiy = styled.div`
    position:relative;
    span{
        position:absolute;
        bottom:-11px;
        left:50%;
        font-size:34px;
        color:#ed4956;
        transform:translate(-50%,0)
    }
`

const ProfilePicture = styled.img`
    width: 25px;
    height:25px;
    border-radius: 50%;
    padding: 2px;
    border:1px solid black
`
