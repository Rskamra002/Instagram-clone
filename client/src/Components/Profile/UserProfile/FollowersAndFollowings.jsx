import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { settings } from "../UserPosts/SvgIcons";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FollowersPopup from "./FollowersPopup";
import FollowingsPopup from "./FollowingsPopup";
import PersonIcon from "@material-ui/icons/Person";
import { loadData } from "../../../Utils/localStorage";
import axios from "axios";
import { getUserData } from "../../../Redux/UserProfile/action";
import { followUser, unFollowUser } from "./UpdateFollows";

// styling material ui elements
const useStyles = makeStyles((theme) => ({
    option: {
        justifyContent: "center",
        display: "flex",
        gap: 50,
        margin: theme.spacing(2, 0),
    },
    personIcon: {
        border: "1px solid rgb(231, 231, 231)",
        width: "60px",
        height: "inherit",
        borderRadius: "5px",
    },
}));

const FollowersAndFollowings = (data) => {
    const { _id, username, bio } = data;
    const user = useParams();
    const classes = useStyles();
    const [loggedIn, setLoggedIn] = useState("");
    const [followPopUp, setFollowPopUp] = useState("");
    const userPosts = useSelector((state) => state.profile.posts);
    const loggedInUser = loadData("users");
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.profile.data); //params
    const { followers, following } = profileData;

    useEffect(() => {
        axios
            .get(`http://localhost:2511/users/${loggedInUser.username}`)
            .then((res) => setLoggedIn(res.data.data));
        dispatch(getUserData(username)); // PARAMS
    }, [dispatch, followers]);

    const handlePopUp = () => {
        setFollowPopUp(null);
    };

    const handleFollow = () => {
        followUser(loggedIn._id, profileData._id, dispatch);
    };

    const handleUnFolow = () => {
        unFollowUser(loggedIn._id, profileData._id, dispatch);
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
                            {loggedIn && loggedIn.following.includes(_id) ? (
                                <UnFollowBtn>
                                    <MessageBtn>Message</MessageBtn>
                                    <PersonIcon
                                        fontSize="small"
                                        onClick={handleUnFolow}
                                        className={classes.personIcon}
                                    />
                                </UnFollowBtn>
                            ) : (
                                <FollowBtn onClick={handleFollow}>follow</FollowBtn>
                            )}
                        </>
                    )}
                </Box>

                <Wrapper>
                    <Typography>
                        <span style={{ fontWeight: "bold" }}>{userPosts.length}</span> posts
                    </Typography>
                    <Typography onClick={() => setFollowPopUp("followers")}>
                        <span style={{ fontWeight: "bold" }}>{followers?.length}</span>{" "}
                        followers
                    </Typography>
                    <Typography onClick={() => setFollowPopUp("followings")}>
                        <span style={{ fontWeight: "bold" }}>{following?.length}</span>{" "}
                        following
                    </Typography>

                    {followPopUp == "followers" ? (
                        <FollowersPopup handlePopUp={handlePopUp} followers={followers} />
                    ) : followPopUp == "followings" ? (
                        <FollowingsPopup handlePopUp={handlePopUp} />
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
const UnFollowBtn = styled.div`
  height: 30px;
  display: flex;
  width: 50px;
`;
const FollowBtn = styled.div`
  background: #0095f6;
  font-weight: 500;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  color: white;
  height: 30px;

  outline: none;
  position: relative;
  font-size: 0.9rem;
  padding: 2px 25px;
  :hover {
    cursor: pointer;
  }
`;
const MessageBtn = styled.div`
  font-weight: 500;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  outline: none;
  text-align: center;
  position: relative;
  top: -10px;
  margin-right: 5px;
  height: 30px;
  font-size: 0.9rem;
  padding: 2px 15px;
  :hover {
    cursor: pointer;
  }
`;
