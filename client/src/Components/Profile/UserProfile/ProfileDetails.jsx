import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import {
  Container,
  makeStyles,
  Divider,
  LinearProgress,
  Box,
} from "@material-ui/core";
import ProfilePosts from "../UserPosts/ProfilePosts";
import styled from "styled-components";
import IgTvUploads from "../ProfileFeatures/IgTvUploads";
import SavedPosts from "../ProfileFeatures/SavedPosts";
import TaggedPosts from "../ProfileFeatures/TaggedPosts";
import { useParams } from "react-router";
import FollowersAndFollowings from './FollowersAndFollowings'
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../Redux/UserProfile/action";
import Categories from "./Categories";

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
}));

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const user = useParams();
  const classes = useStyles();
  const [activePage, setActivePage] = useState("posts");
  const profileData = useSelector((state) => state.profile.data);
  const { profilePic, fullname } = profileData;
  const [totalFollower, setTotalFollower] = useState(useSelector((state) => state.profile.data.followers?.length))


  const increaseMe = () => {
    setTotalFollower((prev) => prev + 1)
    console.log('calling', totalFollower)
  }

  useEffect(() => {
    dispatch(getUserData(user));
  }, [user, dispatch])

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  return !profileData ? (
    <LinearProgress className={classes.loader} />
  ) : (
    <>
      <Container className={classes.main}>
        <Profile>
          <Box className={styles.userProfile}>
            <Box>
              <img src={profilePic} alt={`${fullname}'s Profile Picture`} />
            </Box>
            <FollowersAndFollowings {...profileData} increaseMe={increaseMe} totalFollower={totalFollower} />
          </Box>
        </Profile>
        <Divider className={classes.divider} />
        <Categories handleActivePage={handleActivePage} />

        {activePage === "posts" ? (
          <ProfilePosts {...profileData} />
        ) : activePage === "igtv" ? (
          <IgTvUploads />
        ) : activePage === "saved" ? (
          <SavedPosts />
        ) : (
          <TaggedPosts />
        )}
      </Container>
    </>
  );
};

// styled components
const Profile = styled.div`
  width: 100%;
  margin-left: 6%;
`;

export default ProfileDetails;
