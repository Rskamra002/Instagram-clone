import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./UserProfile.module.css";
import {
  Container,
  makeStyles,
  Typography,
  Divider,
  LinearProgress,
  Box,
} from "@material-ui/core";
import { settings } from "../UserPosts/SvgIcons";
import ProfilePosts from "../UserPosts/ProfilePosts";
import styled from "styled-components";
import IgTvUploads from "../ProfileFeatures/IgTvUploads";
import SavedPosts from "../ProfileFeatures/SavedPosts";
import TaggedPosts from "../ProfileFeatures/TaggedPosts";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../Redux/UserProfile/action";
import Followers from "./Followers";
import Following from "./Following";
import Categories from "./Categories";
import { loadData } from "../../../Utils/localStorage";
import { UpdateFollows } from './UpdateFollows'
// styling material ui elements
const useStyles = makeStyles((theme) => ({
  main: {
    width: "70vw",
    padding: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(5),
  },
  loader: {
    marginTop: theme.spacing(0.5),
  },
  option: {
    justifyContent: "center",
    display: "flex",
    gap: 50,
    margin: theme.spacing(2, 0),
  },
}));

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const user = useParams();
  const classes = useStyles();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activePage, setActivePage] = useState("posts");
  const [loggedIn, setLoggedIn] = useState();
  const [followPopUp, setFollowPopUp] = useState("");
  const profileData = useSelector((state) => state.profile.data);
  const userPosts = useSelector((state) => state.profile.posts);
  const { username, profile_pic, fullname, followers, following, id, bio } =
    profileData;
  const loggedInUser = loadData("users");

  useEffect(() => {
    dispatch(getUserData(user));
    return () => ({})
  }, [user, followers]);


  const handlePopUp = () => {
    setFollowPopUp(null);
  };

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  const handleFollow = () => {
    UpdateFollows(loggedInUser.id, id)
  }



  return !profileData ? (
    <LinearProgress className={classes.loader} />
  ) : (
    <>
      <Container className={classes.main}>
        <Profile>
          <Box className={styles.userProfile}>
            <Box>
              <img src={profile_pic} alt={`${fullname}'s Profile Picture`} />
            </Box>

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
                    <FollowBtn onClick={handleFollow}>Follow</FollowBtn>
                  </>
                )}
              </Box>

              <Wrapper>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>{userPosts.length}</span>{" "}
                  posts
                </Typography>
                <Typography onClick={() => setFollowPopUp("followers")}>
                  <span style={{ fontWeight: "bold" }}>{followers.length}</span>{" "}
                  followers
                </Typography>
                <Typography onClick={() => setFollowPopUp("followings")}>
                  <span style={{ fontWeight: "bold" }}>{following.length}</span>{" "}
                  following
                </Typography>
              </Wrapper>

              <Box>
                <Typography>{bio}</Typography>
              </Box>
            </Box>
          </Box>
        </Profile>
        <Divider className={classes.divider} />
        <Categories handleActivePage={handleActivePage} />

        {activePage === "posts" ? (
          <ProfilePosts userId={id} />
        ) : activePage === "igtv" ? (
          <IgTvUploads />
        ) : activePage === "saved" ? (
          <SavedPosts />
        ) : (
          <TaggedPosts />
        )}

        {followPopUp == "followers" ? (
          <Followers handlePopUp={handlePopUp} active={followPopUp} />
        ) : followPopUp == "followings" ? (
          <Following handlePopUp={handlePopUp} active={followPopUp} />
        ) : null}
      </Container>
    </>
  );
};

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
  height: 30px;
  font-size: 0.9rem;
  padding: 2px 25px;
  :hover {
    cursor: pointer;
  }
`;

const Profile = styled.div`
  width: 100%;
  margin-left: 6%;
`;

export default ProfileDetails;
