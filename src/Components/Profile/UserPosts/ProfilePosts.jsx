import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../Redux/UserProfile/action";
import { Grid, Container } from "@material-ui/core";
import DisplayPost from "./DisplayPost";

function ProfilePosts({ userId }) {
  console.log("userId", userId);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.profile.posts);

  useEffect(() => {
<<<<<<< HEAD:src/Components/Profile/ProfilePosts.jsx
    dispatch(getUserPosts(2));
  }, [dispatch]);

=======
    dispatch(getUserPosts(userId));
  }, [userId]);
>>>>>>> 233b990a31c7b18d38293efb2edb1429ea921353:src/Components/Profile/UserPosts/ProfilePosts.jsx

  return (
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
