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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserData } from "../../../Redux/UserProfile/action";
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
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const activeUser = useSelector((state) => state.login.user);
    const { username, profilePic, closePopup } = data;

    const confirmRemove = (removeFrom, toRemove) => {
        setIsLoading(true);
        axios
            .patch(`http://localhost:2511/users/unfollow/${removeFrom}`, {
                userId: `${toRemove}`,
            })
            .then((res) => {
                axios.get(`http://localhost:2511/users/${toRemove}`).then((res) => {
                    setIsLoading(false);
                    closePopup();
                    dispatch(getUserData(res.data.data));
                });
            });
    };

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
                        onClick={() =>
                            confirmRemove(data.userId, activeUser?._id, dispatch)
                        }
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
