import {
    Modal,
    makeStyles,
    Typography,
    Avatar,
    Divider,
    CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loadData } from "../../../Utils/localStorage";
import { unFollowUser } from "./UpdateFollows";

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

const ConfirmUnFollow = (data) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const loggedInUser = loadData("users");
    const { username, profilePic, closePopup, unfollowedSuccess } = data;


    const confirmRemove = (removeFrom, toRemove) => {
        unFollowUser(removeFrom, toRemove, dispatch);
        unfollowedSuccess();
        closePopup();
    };
    const classes = useStyles();
    return (
        <>
            <Modal open={true}>
                <Container>
                    <Avatar src={profilePic} className={classes.avatar}></Avatar>
                    <Typography>{`Unfolow @${username}`}</Typography>
                    <Divider />
                    <Button
                        style={{ color: "#ed4956", fontWeight: "bold" }}
                        onClick={() =>
                            confirmRemove(loggedInUser._id, data.userId, dispatch)
                        }
                    >
                        {isLoading ? <CircularProgress size={25} /> : "Unfollow"}
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
  height: 280px;
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

export default ConfirmUnFollow;
