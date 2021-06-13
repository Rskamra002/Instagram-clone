import React, { useState, useEffect } from "react";
import {
    makeStyles,
    Typography,
    Box,
    CircularProgress,
} from "@material-ui/core";
import { settings } from "../UserPosts/SvgIcons";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FollowersPopup from "./FollowersPopup";
import FollowingsPopup from "./FollowingsPopup";
import { loadData } from "../../../Utils/localStorage";
import axios from "axios";
import { getUserData } from "../../../Redux/UserProfile/action";
import { UpdateFollows } from "./UpdateFollows";

// styling material ui elements
const useStyles = makeStyles((theme) => ({
    option: {
        justifyContent: "center",
        display: "flex",
        gap: 50,
        margin: theme.spacing(2, 0),
    },
}));

const FollowersAndFollowings = () => {
    const dispatch = useDispatch();
    const user = useParams();
    const classes = useStyles();
    // const [isLoading, setIsLoading] = useState(false);
    const [followUpdate, setFollowUpdate] = useState(false);
    const [loggedIn, setLoggedIn] = useState();
    const [isLoading, setIsLoading] = useState();

    const [followPopUp, setFollowPopUp] = useState("");
    const profileData = useSelector((state) => state.profile.data);
    const { username, profile_pic, fullname, followers, following, id, bio } =
        profileData;
    const userPosts = useSelector((state) => state.profile.posts);
    const loggedInUser = loadData("users");
    // const isLoading = useSelector((state) => state.UpdateFollows.isLoading)

    useEffect(() => {
        axios
            .get(
                `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${loggedInUser.id}`
            )
            .then((res) => setLoggedIn(res.data));
        dispatch(getUserData(user));
    }, [followUpdate]);

    const handlePopUp = () => {
        setFollowPopUp(null);
    };

    const handleFollow = () => {
        UpdateFollows(loggedInUser.id, id, reRender)
    };

    const reRender = () => {
        setFollowUpdate(!followUpdate);
    };

    return (
        <>
            <Box>
                <Box>
                    <User>{username}</User>
                    {loggedInUser.username === user.username ? (
                        <Box>
                            <EditBtn>Edit Profile</EditBtn>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 48 48"
                                fill="#262626"
                                style={{ margin: "0px 10px" }}
                            >
                                <path d={settings} />
                            </svg>
                        </Box>
                    ) : (
                        <>
                            <FollowBtn onClick={handleFollow}>
                                {loggedIn && loggedIn.following.includes(id) ? (
                                    "Unfollow"
                                ) : isLoading ? (
                                    <CircularProgress className={classes.circle} size={25} />
                                ) : (
                                    "Follow"
                                )}
                            </FollowBtn>
                        </>
                    )}
                </Box>

                <Wrapper>
                    <Typography>
                        <span style={{ fontWeight: "bold" }}>{userPosts.length}</span> posts
                    </Typography>
                    <Typography onClick={() => setFollowPopUp("followers")}>
                        <span style={{ fontWeight: "bold" }}>{followers.length}</span>{" "}
                        followers
                    </Typography>
                    <Typography onClick={() => setFollowPopUp("followings")}>
                        <span style={{ fontWeight: "bold" }}>{following.length}</span>{" "}
                        following
                    </Typography>

                    {followPopUp == "followers" ? (
                        <FollowersPopup handlePopUp={handlePopUp} reRender={reRender} />
                    ) : followPopUp == "followings" ? (
                        <FollowingsPopup handlePopUp={handlePopUp} reRender={reRender} />
                    ) : null}
                </Wrapper>

                <Box>
                    <Typography>{bio}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default FollowersAndFollowings;

// styled components

const EditBtn = styled.button`
  background: #fafafa;
  font-weight: bold;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  height: 30px;
  margin-top: 3px;
  padding: 0px 8px;
  :hover {
    cursor: pointer;
  }
  svg {
    border: 1px solid red;
  }
`;

const User = styled.div`
  font-size: 28px;
  font-weight: lighter;
`;

const Wrapper = styled.div`
  * {
    cursor: pointer;
  }
`;

const FollowBtn = styled.div`
  background: #0095f6;
  font-weight: 500;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  color: white;
  outline: none;
  position: relative;
  height: 30px;
  font-size: 0.9rem;
  padding: 2px 25px;
  :hover {
    cursor: pointer;
  }
`;
