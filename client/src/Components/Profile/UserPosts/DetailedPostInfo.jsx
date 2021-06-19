import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Divider,
  Box,
  Paper,
  Modal,
  Grid,
  Container,
  Avatar,
} from "@material-ui/core";
import styles from "./Posts.module.css";
import styled from 'styled-components'
import CloseIcon from "@material-ui/icons/Close";
import PostEngagement from './PostEngagement'
import axios from 'axios'
// styling material ui elements

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "65%",
    marginTop: "20px",
    outline: "none",
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

  info: {
    position: 'relative',
    "& h6": {
      marginLeft: 15,
      marginTop: 3,
      fontSize: '1rem',
    },

    "& caption": {
      marginTop: 3,

    }
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));

const DetailedPostInfo = (postData) => {
  const { src, handlePostDisplay, userId } = postData;
  const [uploadedBy, setUploadedBy] = useState();

  // getting details of post user
  useEffect(() => {
    userId &&
      axios.get(`http://localhost:2511/users/${userId}`)
        .then(res => setUploadedBy(res.data.data))
  }, [])

  const classes = useStyles();
  return (
    <Container >
      <Modal open={true} className={classes.container}>
        <Paper className={classes.paper}>
          <CloseIcon
            fontSize="large"
            className={classes.close}
            onClick={handlePostDisplay}
          />

          <Grid container className={styles.postInfo}>
            <Grid item xs={7} s={7} md={7} lg={7} xl={7}>
              {
                src && src.substring(src.length - 4) !== '.mp4' ? (
                  <Image src={src} alt={`${uploadedBy?.fullname}'s Post`} />) : (
                  <video alt="" controls width='100%' height='100%'>
                    <source src={src} type="video/mp4" />
                  </video>
                )
              }
            </Grid>

            <Grid
              item
              xs={5}
              s={5}
              md={5}
              lg={5}
              xl={5}
              className={classes.info}
            >
              <Box>
                <Avatar
                  alt={`${uploadedBy?.username}'s Profile Picture`}
                  src={uploadedBy?.profilePic}
                ></Avatar>
                <Typography variant="h6">{uploadedBy?.username}</Typography>
              </Box>
              <Divider />
              <PostEngagement {...postData} username={uploadedBy?.username} profilePic={uploadedBy?.profilePic} />
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Container>
  );
};

export default DetailedPostInfo;

const Image = styled.img`
  object-fit:cover;
`;