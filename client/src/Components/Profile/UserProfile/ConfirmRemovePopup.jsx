import {
    Modal,
    makeStyles,
    Typography,
    Avatar,
    Divider,
    CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: "15px auto",
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    loader: {
        color: "gray",
        margin: theme.spacing(0.6, 0),
    },
}));

const ConfirmRemovePopup = (data) => {
    const profileData = useSelector((state) => state.profile.data);
    const loggedInUser = profileData.id;
    const { username, profilePic, closePopup, userId } = data;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const confirmRemove = (removeFrom, toRemove) => {
        setIsLoading(true);
        let updateFollowers = new Promise((resolve, reject) => {
            let followers = axios
                .get(
                    `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${removeFrom}`
                )
                .then((res) => res.data.followers);
            if (followers) {
                resolve(followers);
            } else {
                reject("rejected");
            }
        });

        let updateFollowings = new Promise((resolve, reject) => {
            let followings = axios
                .get(
                    `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${toRemove}`
                )
                .then((res) => res.data.following);
            if (followings) {
                resolve(followings);
            } else {
                reject("rejected");
            }
        });

        updateFollowers
            .then((followers) => {
                let updatedFollowers = followers.filter((item) => item != toRemove);
                axios
                    .patch(
                        `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${removeFrom}`,
                        {
                            followers: updatedFollowers,
                        }
                    )
                    .then((res) => res);
            })
            .catch((msg) => msg);

        updateFollowings
            .then((followings) => {
                let updatedFollowings = followings.filter((item) => item != removeFrom);
                axios
                    .patch(
                        `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${toRemove}`,
                        {
                            following: updatedFollowings,
                        }
                    )
                    .then((res) => {
                        setIsLoading(false)
                        closePopup();
                    });
            })
            .catch((msg) => setIsError(setIsError))
    }

    const classes = useStyles();
    return (
        <>
            <Modal open={true}>
                <Container>
                    <Avatar src={profilePic} className={classes.avatar}></Avatar>
                    <Typography variant="h6">Remove Follower?</Typography>
                    <Typography>{`Instagram wont tell ${username} they were removed from your followers`}</Typography>
                    <Divider />
                    <Button
                        style={{ color: "#ed4956", fontWeight: "bold" }}
                        onClick={() => confirmRemove(loggedInUser, userId)}
                    >
                        {isLoading ? <CircularProgress size={25} /> : "Remove"}
                    </Button>
                    <Divider />
                    <Button onClick={closePopup}>Cancel</Button>
                </Container>
            </Modal>
        </>
    );
};

const Container = styled.div`
  margin: auto;
  margin-top: 25vh;
  width: 30vw;
  padding: 30px 0px 0px 0px;
  height: 350px;
  text-align: center;
  border-radius: 10px;
  background: white;
  h6 {
    font-weight: lighter;
  }
  p {
    font-size: 0.9rem;
    color: gray;
    margin: 10px 50px;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 15%;
  :hover {
    cursor: pointer;
  }
`;

export default ConfirmRemovePopup;
