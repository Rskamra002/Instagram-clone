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
import styled from "styled-components";
import axios from "axios";
import ConfirmRemovePopup from "./ConfirmRemovePopup";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
  avatar: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const FollowersPopup = ({ handlePopUp, followers }) => {
  const history = useHistory();
  const profile = useParams();
  const [loggedIn, setLoggedIn] = useState(null);
  const loggedInUserData = useSelector((state) => state.login.user);
  const [profileFollowers, setProfileFollowers] = useState([]);
  const [removeFollower, setRemoveFollower] = useState(null);
  const classes = useStyles();

  const closePopup = () => {
    setRemoveFollower(null);
  };

  console.log("loggedIn", loggedIn);
  const handleRemove = (follower, e) => {
    setRemoveFollower(follower);
    e.target.disabled = true;
  };

  const redirectUser = (follower) => {
    handlePopUp();
    history.push(`/${follower.username}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2511/users/${loggedInUserData._id}`)
      .then((res) => setLoggedIn(res.data.data));
  }, []);

  useEffect(() => {
    if (followers) {
      followers.forEach((userId) => {
        axios.get(`http://localhost:2511/users/${userId}`).then((res) => {
          setProfileFollowers((prev) => [
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
            <Title>Followers</Title>
            <CloseIcon onClick={handlePopUp} />
          </Wrapper>
          <Divider />
          <Follow>
            {profileFollowers?.map((follower) => {
              console.log("follower", follower);
              return (
                <Wrapper>
                  <Avatar
                    src={follower.profilePic}
                    alt={`${follower.fullname}'s Profile Picture`}
                    className={classes.avatar}
                    onClick={() => redirectUser(follower)}
                  ></Avatar>
                  <MainDiv onClick={() => redirectUser(follower)}>
                    <div>{follower.username}</div>
                    <div>{follower.fullname}</div>
                  </MainDiv>
                  {profile.username !== loggedIn?.username ? (
                    loggedIn?.following?.includes(follower.userId) ? (
                      <Button onClick={(e) => handleRemove(follower, e)}>
                        Following
                      </Button>
                    ) : (
                      <FollowBtn onClick={(e) => handleRemove(follower, e)}>
                        Follow
                      </FollowBtn>
                    )
                  ) : (
                    <Button onClick={(e) => handleRemove(follower, e)}>
                      Remove
                    </Button>
                  )}
                </Wrapper>
              );
            })}
          </Follow>
        </Paper>
      </Modal>
      {removeFollower && (
        <ConfirmRemovePopup {...removeFollower} closePopup={closePopup} />
      )}
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
  :hover {
    cursor: pointer;
  }
  div:nth-child(1) {
    font-weight: 500;
    color: black;
  }
  div:nth-child(2) {
    color: grey;
  }
`;

export const Follow = styled.div`
  overflow-y: scroll;
  height: 400px;
`;


export const FollowBtn = styled.div`
  background: #0095f6;
  font-weight: 500;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  color: white;
  height: 30px;
  outline: none;
  position: relative;
  font-size: 0.9rem;
  padding: 2px 10px;
  :hover {
    cursor: pointer;
  }
`;
export default FollowersPopup;
