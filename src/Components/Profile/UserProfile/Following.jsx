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

import { Title, Wrapper, Button, MainDiv, Follow } from "./Followers";
// styling material ui elements

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
  },
  paper: {
    width: "30%",
    margin: "auto",
    marginTop: "20vh",
    outline: "none",
    borderRadius: "15px",
  },

  close: {
    right: 30,
    top: 20,
    color: "white",
    position: "absolute",
    "& :hover": {
      cursor: "pointer",
    },
  },
}));

const Following = ({ active, handlePopUp }) => {
  const [profileFollowing, setProfileFollowing] = useState([]);
  const classes = useStyles();
  const profileData = useSelector((state) => state.profile.data);
  const { following } = profileData;
  useEffect(() => {
      
    if (following) {
      following.forEach((userId) => {
        axios
          .get(
            `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${userId}`
          )
          .then((res) => {
            setProfileFollowing((prev) => [
              ...prev,
              {
                username: res.data.username,
                fullname: res.data.fullname,
                profilePic: res.data.profile_pic,
              },
            ]);
          });
      });
    }
  }, []);

  return (
    <Container className={classes.container}>
      <Modal open={active}>
        <Paper className={classes.paper}>
          <Wrapper>
            <Title>Following</Title>
            <CloseIcon onClick={handlePopUp} />
          </Wrapper>
          <Divider />
          <Follow>
            {profileFollowing?.map((follower) => {
              return (
                <Wrapper>
                  <Avatar
                    src={follower.profilePic}
                    alt={`${follower.fullname}'s Profile Picture`}
                  ></Avatar>
                  <MainDiv>
                    <div>{follower.username}</div>
                    <div>{follower.fullname}</div>
                  </MainDiv>
                  <Button>Remove</Button>
                </Wrapper>
              );
            })}
          </Follow>
        </Paper>
      </Modal>
    </Container>
  );
};

export default Following;
