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
import ConfirmUnFollow from "./ConfirmUnFollow";
import { Title, Wrapper, Button, MainDiv, Follow } from "./FollowersPopup";
import Following from "./Following";
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

const FollowersPopups = ({ handlePopUp, following }) => {
  const [profileFollowing, setProfileFollowing] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (following) {
      following.forEach((userId) => {
        axios.get(`http://localhost:2511/users/${userId}`).then((res) => {
          setProfileFollowing((prev) => [
            ...prev,
            {
              username: res.data.data.username,
              fullname: res.data.data.fullname,
              profilePic: res.data.data.profilePic,
              userId: res.data.data._id,
            },
          ]);
        });
      });
    }
  }, []);

  return (
    <Container className={classes.container}>
      <Modal open={true}>
        <Paper className={classes.paper}>
          <Wrapper>
            <Title>Following</Title>
            <CloseIcon onClick={handlePopUp} />
          </Wrapper>
          <Divider />
          <Follow>
            {profileFollowing?.map((following) => {
              return <Following {...following} />;
            })}
          </Follow>
        </Paper>
      </Modal>
    </Container>
  );
};

export default FollowersPopups;
