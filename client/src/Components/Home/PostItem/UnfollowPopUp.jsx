import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  Typography,
  Avatar,
  Divider,
} from "@material-ui/core";
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: "15px auto",
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    outline: "none",
    border: '2px solid grey',
    margin:"auto",
    marginTop: "28vh",
    width: "30vw",
    padding: "30px 0px 0px 0px",
    height: "280px",
    textAlign: "center",
    borderRadius: "10px",
    background: "white"
  },
}));

export default function UnfollowPopUpModal({openModel2,goingToUnfollow, handleCloseModel2,handleUnFollow}) {

  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModel2}
        onClose={handleCloseModel2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModel2}>
          <div className={classes.paper}>
          <Avatar src={goingToUnfollow.profilePic} className={classes.avatar}></Avatar>
                    <Typography>{`Unfolow @${goingToUnfollow.username}`}</Typography>
                    <Divider />
                    <Button
                        style={{ color: "#ed4956", fontWeight: "bold" }}
                        onClick={() =>
                          handleUnFollow(goingToUnfollow.userId)
                        }
                    >
                       Unfollow
                    </Button>
                    <Divider />
                    <Button onClick={handleCloseModel2}>Cancel</Button> 
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


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