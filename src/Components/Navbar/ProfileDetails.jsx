import React from 'react';
import styles from "./Navbar.module.css";
import styled from "styled-components";
import { AccountCircle, Settings, TurnedInNot } from '@material-ui/icons';


const ProfileDetails = ({profiler}) => {
    return (
        <ProfilerWrap profiler={profiler} className={styles.arrow_box_profiler}>
            <div>
                <AccountCircle/>
                <p>Profile</p>
            </div>
            <div>
                <TurnedInNot/>
                <p>Saved</p>
            </div>
            <div>
                <Settings/>
                <p>Settings</p>
            </div>
            <div>
                <p>Switch Accounts</p>
            </div>
            <LogoutTab>Logout</LogoutTab>
        </ProfilerWrap>
    )
}

export {ProfileDetails}

const ProfilerWrap = styled.div`
    display : ${({profiler}) => profiler ? "block" : "none"};
    div{
        height:20%;
        padding: 3% 0% 0% 5%;
        align-items: center;
        cursor: pointer;
        display: flex;
        gap:20px;
        :hover{
            background: #FAFAFA;
        }
    };
`
const LogoutTab = styled.div`
    border-top: 1px solid lightgrey;
`
