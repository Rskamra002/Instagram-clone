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
                <Button onClick={(e) => handleUnfollow(data, e)}>{!unfollowSuccess ? "Following" : "Follow"}</Button>
                {
                    unfollow && <ConfirmUnFollow {...unfollow} closePopup={closePopup} unfollowedSuccess={unfollowedSuccess} />
                }
            </Wrapper>
        </>
    )
}

export default Following
