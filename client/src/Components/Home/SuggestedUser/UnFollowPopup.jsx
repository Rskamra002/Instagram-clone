import {
    Modal,
    makeStyles,
    Typography,
    Avatar,
    Divider
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { loadData } from "../../../Utils/localStorage";
import { UpdateFollows } from "../../Profile/UserProfile/UpdateFollows";

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: "15px auto",
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

const UnFollowPopup = (data) => {
    const classes = useStyles();
    const loggedInUser = loadData('users')
    const { profile_pic, username, id, popup, closePopup, updateFollowStatus } = data;
    const handleUnfollow = (id) => {
        UpdateFollows(loggedInUser.id, id)
        closePopup();
        updateFollowStatus();
    }
    return (
        <>
            <Modal open={popup}>
                <Container>
                    <Avatar src={profile_pic} className={classes.avatar}></Avatar>
                    <Typography>{`Unfollow @${username}?`}</Typography>
                    <Divider />
                    <Button
                        style={{ color: "#ed4956", fontWeight: "bold" }}
                        onClick={() => handleUnfollow(id)}
                    >
                        Unfollow
                    </Button>
                    <Divider />
                    <Button onClick={closePopup}>Cancel</Button>
                </Container>
            </Modal>
        </>
    );
};

export default UnFollowPopup;


const Container = styled.div`
  margin: auto;
  margin-top: 25vh;
  width: 30vw;
  padding: 30px 0px 0px 0px;
  height: 270px;
  text-align: center;
  border-radius: 10px;
  background: white;
  h6 {
    font-weight: lighter;
  }
  p {
    font-size: 0.9rem;
    margin: 10px 50px;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 15%;
  padding:12px;
  :hover {
    cursor: pointer;
  }
`;