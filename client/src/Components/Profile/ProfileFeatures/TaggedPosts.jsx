import React, { useState, useEffect, useContext } from "react";
import styles from "./Features.module.css";
import { Grid } from "@material-ui/core";
import styled from 'styled-components';
import { useSelector } from "react-redux";
import DisplayPosts from './DisplayPosts';
import axios from 'axios';
function TaggedPosts() {
  const loggedInUserData = useSelector(state => state.login.user);
  const [taggedPosts, setTaggedPosts] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:2511/users/${loggedInUserData._id}`)
      .then(res => setTaggedPosts(res.data.data.tagedPosts))
  }, [])

  return setTaggedPosts?.length === 0 ? (
    <>
      <Wrapper>
        <img src="./assets/svgs/tag.svg" alt="Tagged Icon" class={styles.icon} />
        <Title>Save</Title>
        <Title>Photos of you</Title>
        <div>When people tag you in photos, they'll appear here</div>
      </Wrapper>
    </>
  ) : (
    <>
      <Grid container spacing={3}>
        {
          taggedPosts?.map(postId => {
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

export default TaggedPosts;

