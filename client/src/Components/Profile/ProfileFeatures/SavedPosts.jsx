import React, { useState, useEffect, useContext } from "react";
import styles from "./Features.module.css";
import styled from "styled-components";
import axios from 'axios'
import DisplayPosts from "./DisplayPosts";
import { Grid} from "@material-ui/core";
import { useSelector } from "react-redux";


function SavedPosts() {
  const loggedInUserData = useSelector(state => state.login.user);
  const [savedPosts, setSavedPosts] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:2511/users/${loggedInUserData._id}`)
      .then(res => setSavedPosts(res.data.data.savedPosts))
  }, [])

  return savedPosts?.length === 0 ? (
    <>
      <Wrapper>
        <img src="./assets/svgs/save.svg" alt="Saved Icon" class={styles.icon} />
        <Title>Save</Title>
        <div>
          Save photos and videos that you want to see again. No <br /> one is
          notified, and only you can see what you've saved.
        </div>
      </Wrapper>
    </>
  ) : (
    <>
      <Grid container spacing={3}>
        {
          savedPosts?.map(postId => {
            return <DisplayPosts postId={postId} />
          })
        }
      </Grid>
    </>
  )
}

const Wrapper = styled.div`
      margin: auto;
      text-align: center;
      font-size: 0.8rem;
      `;

const Title = styled.div`
      font-size: 2rem;
      font-weight: lighter;
      margin: 10px 0px;
      color: #262626;
      `;

export default SavedPosts;
