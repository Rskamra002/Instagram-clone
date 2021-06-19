import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Box,
  Button,
  IconButton,
} from "@material-ui/core";
import { settings } from "../UserPosts/SvgIcons";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FollowersPopup from "./FollowersPopup";
import FollowingsPopup from "./FollowingsPopup";
import axios from "axios";
import { followUser, unFollowUser } from "./UpdateFollows";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Redirect } from "react-router";

const FollowersAndFollowings = (data) => {
  const activeUser = useSelector((state) => state.login.user);
  const { _id, username, bio } = data;
  const user = useParams();
  const [loggedIn, setLoggedIn] = useState(null);
  const [followPopUp, setFollowPopUp] = useState(null);
  const userPosts = useSelector((state) => state.profile.posts);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.data); //params
  const { followers, following } = profileData;
  const [conversationId, setConversationId] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:2511/users/${activeUser.username}`)
      .then((res) => setLoggedIn(res.data.data));
  }, [followers]);

  const handlePopUp = () => {
    setFollowPopUp(null);
  };

  const handleFollow = async () => {
    followUser(loggedIn._id, profileData._id, dispatch);
  };

  const handleUnfollow = () => {
    unFollowUser(loggedIn._id, profileData._id, dispatch);
  };

  const handleMessage = async () => {
    const payload = {
      senderId: activeUser._id,
      receiverId: _id,
    };
    await axios
      .post("http://localhost:2511/newConversation", payload)
      .then((res) => setConversationId(res.data._id));
  };
  if (conversationId !== "") {
    return <Redirect to={`/direct/inbox/${conversationId}/${_id}`} push />;
  }
  return (
    <>
      <Container>
        <Box>
          <User>{username}</User>
          <InnerContainer>
            {activeUser.username === user.username ? (
              <Profile>
                <Btn>Edit Profile</Btn>
                <svg width="24" height="24" viewBox="0 0 48 48" fill="#262626">
                  <path d={settings} />
                </svg>
              </Profile>
            ) : (
              <>
                {loggedIn && loggedIn.following.includes(_id) ? (
                  <Followed>
                    <Btn onClick={handleMessage}>Message</Btn>
                    <Image onClick={handleUnfollow}>
                      <img
                        src="https://i.ibb.co/CPfvXYK/Followed-Icon.png"
                        alt="Person Icon"
                      />
                    </Image>
                  </Followed>
                ) : (
                  <Follow>
                    <FollowBtn onClick={handleFollow}>Follow</FollowBtn>
                    <KeyboardArrowDownIcon />
                  </Follow>
                )}
              </>
            )}
          </InnerContainer>
        </Box>

        <Wrapper>
          <Box>
            <Typography>
              <span style={{ fontWeight: "bold" }}>{userPosts.length}</span>{" "}
              posts
            </Typography>
          </Box>

          <Box>
            <Typography onClick={() => setFollowPopUp("followers")}>
              <span style={{ fontWeight: "bold" }}>{followers?.length}</span>{" "}
              followers
            </Typography>
          </Box>

          <Box>
            <Typography onClick={() => setFollowPopUp("followings")}>
              <span style={{ fontWeight: "bold" }}>{following?.length}</span>{" "}
              following
            </Typography>
          </Box>

          {followPopUp == "followers" ? (
            <FollowersPopup handlePopUp={handlePopUp} followers={followers} />
          ) : followPopUp == "followings" ? (
            <FollowingsPopup handlePopUp={handlePopUp} following={following} />
          ) : null}
        </Wrapper>

        <Box>
          <Typography>{bio}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default FollowersAndFollowings;

// styled components

const Btn = styled.button`
  background: #fafafa;
  font-weight: 600;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  height: 30px;
  padding: 2px 12px;
  min-width: 100px;
  :hover {
    cursor: pointer;
  }
`;

const Image = styled.div`
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: auto;
`;

const Followed = styled.div`
  height: 30px;
  position: absolute;
  top: -10px;
  img {
    margin-bottom: 2px;
  }
`;

const User = styled.div`
  font-size: 28px;
  font-weight: lighter;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  div {
    display: flex;
    width: 30px;
  }
  p {
    display: flex;
    gap: 5px;
  }
`;

const FollowBtn = styled.div`
  background: #0095f6;
  font-weight: 500;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  font-size: 0.8rem;
  color: white;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  height: 30px;
  padding: 2px 25px;
  :hover {
    cursor: pointer;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  align-items: center;
  position: relative;
  svg {
    margin-bottom: 5px;
  }
  img {
    object-fit: contain;
    padding: 0px 8px;
  }
`;
const Profile = styled.div`
  width: 100%;
  position: absolute;
  top: -10px;
  svg {
    margin-bottom: 5px;
  }
  img {
    object-fit: contain;
    padding: 0px 10px;
  }
`;
const Follow = styled.div`
  position: absolute;
  top: -10px;
  svg {
    background: #0095f6;
    color: white;
    padding: 2px;
    display: flex;
    width: 30px;
    height: 27px;
    margin-top: 2px !important;
    border-radius: 5px;
  }
`;
