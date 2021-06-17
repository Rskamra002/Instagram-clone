import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import styles from "./Posts.module.css";
import DetailedPostInfo from "./DetailedPostInfo";

const DisplayPost = (post) => {
  const [popUp, setPopUp] = useState(false);
  const handlePostDisplay = () => {
    setPopUp(!popUp);
  };

  return (
    <>
      <Grid
        item
        xs={4}
        s={4}
        md={4}
        lg={4}
        xl={4}
        className={styles.postContainer}
        onClick={handlePostDisplay}
      >
        {
          post &&
            post.src.substring(post.src.length - 4) !== '.mp4' ? (
            <img src={post.src} className={styles.postImg} />) :
            (<video src={post.src} width='100%' height='100%'></video>)
        }
        
        <Box className={styles.postInfoContainer}>
          <Box>
            <FavoriteIcon />
            <Box>{post.likes.length}</Box>
            <ModeCommentOutlinedIcon />
            <Box>{post.comments.length}</Box>
          </Box>
        </Box>
      </Grid>

      {popUp && (
        <DetailedPostInfo {...post} handlePostDisplay={handlePostDisplay} />
      )}

    </>
  );
};

export default DisplayPost;
