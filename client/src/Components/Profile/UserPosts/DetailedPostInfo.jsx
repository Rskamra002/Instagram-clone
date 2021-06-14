import React, { useEffect } from "react";
import {
  Container,
  makeStyles,
  Typography,
  Divider,
  Box,
  Paper,
  Modal,
  Grid,
  Avatar,
} from "@material-ui/core";
import styles from "./Posts.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import Comments from './Comments'
// styling material ui elements

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "70%",
    margin: "auto",
    height: "600px",
    marginTop: theme.spacing(5),
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
}));

const DetailedPostInfo = (data) => {
  const profileData = useSelector((state) => state.profile.data);
  const { username, profile_pic, fullname } = profileData;

  const { src, handlePostDisplay, likes, _id } = data;
  const classes = useStyles();

  return (
    <Container>
      <Modal open={true} className={classes.container}>
        <Paper className={classes.paper}>
          {/* <CloseIcon /> */}
          <CloseIcon
            fontSize="large"
            className={classes.close}
            onClick={handlePostDisplay}
          />

          <Grid container className={styles.postInfo}>
            <Grid item xs={7} s={7} md={7} lg={7} xl={7}>
              {
                src && src.substring(src.length - 4) !== '.mp4' ? (
                  <img src={src} alt={`${fullname}'s Post`} />) : (
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
                  alt={`${fullname}'s Profile Picture`}
                  src={profile_pic}
                ></Avatar>
                <Typography variant="h6">{username}</Typography>
              </Box>
              <Divider />
              <Comments {...profileData} likes={likes} id={_id} />
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Container>
  );
};

export default DetailedPostInfo;
