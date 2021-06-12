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
import styled from "styled-components";
import axios from "axios";
import ConfirmRemovePopup from "./ConfirmRemovePopup";
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

const Followers = ({ active, handlePopUp }) => {
  const [profileFollowers, setProfileFollowers] = useState([]);
  const [removeFollower, setRemoveFollower] = useState();
  const classes = useStyles();
  const profileData = useSelector((state) => state.profile.data);
  const { followers } = profileData;

  const closePopup = () => {
    setRemoveFollower('')
  }

  const handleRemove = (follower, e) => {
    setRemoveFollower(follower)
    e.target.disabled = true;
  }

  useEffect(() => {
    if (followers) {
      followers.forEach((userId) => {
        axios
          .get(
            `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${userId}`
          )
          .then((res) => {
            setProfileFollowers((prev) => [
              ...prev,
              {
                username: res.data.username,
                fullname: res.data.fullname,
                profilePic: res.data.profile_pic,
                userId: res.data.id,
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
            <Title>Followers</Title>
            <CloseIcon onClick={handlePopUp} />
          </Wrapper>
          <Divider />
          <Follow>
            {profileFollowers?.map((follower) => {
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
                  <Button onClick={(e) => handleRemove(follower, e)}>Remove</Button>
                </Wrapper>
              );
            })}
          </Follow>
        </Paper>
      </Modal>
      {
        removeFollower && <ConfirmRemovePopup {...removeFollower} closePopup={closePopup} />
      }
    </Container>
  );
};

export const Title = styled.p`
  text-align: center;
  padding: 10px;
  font-weight: 500;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  margin: 14px;
`;

export const Button = styled.button`
  background: white;
  font-weight: bold;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  padding: 8px 18px;
  :hover {
    cursor: pointer;
  }
`;

export const MainDiv = styled.div`
  flex-grow: 1;
  margin-left: 14px;
  div:nth-child(1) {
    font-weight: 500;
  }
  div:nth-child(2) {
    color: grey;
  }
`;

export const Follow = styled.div`
  overflow-y: scroll;
  height: 400px;
`;

export default Followers;