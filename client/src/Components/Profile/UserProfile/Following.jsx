import React, { useEffect, useState } from "react";
import {
    Container,
    makeStyles,
    Divider,
    Paper,
    Modal,
    Avatar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import axios from "axios";
import ConfirmUnFollow from './ConfirmUnFollow'
import { Title, Wrapper, Button, MainDiv, Follow } from "./FollowersPopup";
import styled from 'styled-components'

const Following = (data) => {
    const [unfollow, setUnfollow] = useState(null);
    const { profilePic, fullname, username } = data;
    const [unfollowSuccess, setUnfollowSuccess] = useState(false);

    const unfollowedSuccess = () => {
        setUnfollowSuccess(true);
    }
    const handleUnfollow = (following, e) => {
        setUnfollow(following);
    };
    const closePopup = () => {
        setUnfollow('');
    }

    return (
        <>
            <Wrapper>
                <Avatar
                    src={profilePic}
                    alt={`${fullname}'s Profile Picture`}
                ></Avatar>
                <MainDiv>
                    <div>{username}</div>
                    <div>{fullname}</div>
                </MainDiv>
                {
                    !unfollowSuccess ?
                        <FollowingBtn onClick={(e) => handleUnfollow(data, e)} >Following</FollowingBtn> :
                        <FollowBtn onClick={(e) => handleUnfollow(data, e)} > Follow </FollowBtn>
                }
                {
                    unfollow && <ConfirmUnFollow {...unfollow} closePopup={closePopup} unfollowedSuccess={unfollowedSuccess} />
                }
            </Wrapper>
        </>
    )
}

export default Following

export const FollowingBtn = styled.button`
  background: white;
  font-weight: bold;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  padding: 8px 18px;
  :hover {
    cursor: pointer;
  }
`;


export const FollowBtn = styled.button`
  background: #0095f6;
  font-weight: bold;
  color:white;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  padding: 8px 18px;
  :hover {
    cursor: pointer;
  }
`;