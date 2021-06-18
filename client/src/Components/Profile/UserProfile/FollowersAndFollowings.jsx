import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { settings } from "../UserPosts/SvgIcons";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FollowersPopup from "./FollowersPopup";
import FollowingsPopup from "./FollowingsPopup";
import axios from "axios";
import { followUser, unFollowUser } from "./UpdateFollows";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Redirect } from "react-router";
// styling material ui elements
const useStyles = makeStyles((theme) => ({
  option: {
    justifyContent: "center",
    display: "flex",
    gap: 50,
    margin: theme.spacing(2, 0),
  },
  arrowDown: {
    background: "#0095f6",
    color: 'white',
    height: '30px',
    padding: '6px',
    borderRadius: '5px',
    width: '35px'
  },
}));

const FollowersAndFollowings = (data) => {
  const activeUser = useSelector((state) => state.login.user);
  const { _id, username, bio } = data;
  const user = useParams();
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(null);
  const [followPopUp, setFollowPopUp] = useState(null);
  const userPosts = useSelector((state) => state.profile.posts);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.data); //params
  const { followers, following } = profileData;
  const [conversationId,setConversationId] = useState("")
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


  const handleMessage = async ()=>{
    const payload = {
        senderId:activeUser._id,
        receiverId:_id
    }
    await axios.post("http://localhost:2511/newConversation",payload).then((res)=>setConversationId(res.data._id))
  }
  if(conversationId !== ""){
    return <Redirect to={`/direct/inbox/${conversationId}/${_id}`} push/>
  }
  return (
    <>
      <Box>
        <Box>
          <User>{username}</User>
          {activeUser.username === user.username ? (
            <Settings>
              <EditBtn>Edit Profile</EditBtn>
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="#262626"
              >
                <path d={settings} />
              </svg>
            </Settings>
          ) : (
            <>
              {loggedIn && loggedIn.following.includes(_id) ? (
                <UnFollowBtn>
                  <MessageBtn onClick={handleMessage}>Message</MessageBtn>
                  <PersonIcon onClick={handleUnfollow}>
                    <img src="https://i.ibb.co/CPfvXYK/Followed-Icon.png" alt="Person icon" />
                  </PersonIcon>
                </UnFollowBtn>
              ) : (
                <InnerContainer>
                  <FollowBtn onClick={handleFollow}>Follow</FollowBtn>
                  <KeyboardArrowDownIcon className={classes.arrowDown} />
                </InnerContainer>
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
            <FollowingsPopup handlePopUp={handlePopUp} following={following} />
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
  position:relative;
  :hover {
    cursor: pointer;
  }
  svg {
    border: 1px solid blue;

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
  display: flex;
  width: 200px;
  position:relative;
  align-items:center;
  :hover {
    cursor:pointer;
  }
`;
export const FollowBtn = styled.div`
  background: #0095f6;
  font-weight: 500;
  max-width:100px;
  border-radius: 3px;
  color: white;
  height: 29px;
  outline: none;
  margin-right:8px;
  margin-top:5px !important;
  position: relative;
  font-size: 0.9rem;
  padding: 2px 25px;
  margin-bottom:10px !important;
  display:flex;
  justify-content:center;
  align-items:center;
  :hover {
    cursor: pointer;
  }
`;
const MessageBtn = styled.div`
  font-weight: 500;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  outline: none;
  width:100px !important;
  text-align: center;
  position: relative;
  top: -10px;
  margin-right: 5px;
  height: 28px;
  font-size: 0.9rem;
  padding: 2px 15px;
  :hover {
    cursor: pointer;
  }
`;
const PersonIcon = styled.div`
img {
  height:28px !important;
  position:absolute;
  top:10px;
  border:1px solid rgb(231, 231, 231);;
  padding:7px;
}
`;

const Settings = styled.div`
margin-top:8px;
  position: relative;
  width:130px;
  svg {
    margin-top:10px;
    right:0px;
    position:absolute;
  }
`
const InnerContainer = styled.div`
  display:flex;
  `;