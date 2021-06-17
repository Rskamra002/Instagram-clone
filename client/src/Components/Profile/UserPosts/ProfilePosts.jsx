import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../Redux/UserProfile/action";
import { Grid, Container, CircularProgress } from "@material-ui/core";
import DisplayPost from "./DisplayPost";
import { Spinner } from "../../Loader/Spinner";

function ProfilePosts({ _id }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.profile.posts);

  useEffect(() => {
    dispatch(getUserPosts(_id));
  }, [_id, dispatch]);

  return posts && (
    <>
      <Container>
        <Grid container spacing={3}>

          {posts?.map((post, id) => (
            <DisplayPost key={id} {...post} />
          ))}

        </Grid>
      </Container>
    </>
  );
}
export default ProfilePosts;
