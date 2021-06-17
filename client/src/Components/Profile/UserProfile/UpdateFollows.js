import axios from "axios";
import { getUserData } from "../../../Redux/UserProfile/action";

export const followUser = (loggedInUser, userToFollow, dispatch) => {
  axios
    .patch(`http://localhost:2511/users/follow/${loggedInUser}`, {
      userId: `${userToFollow}`,
    })
    .then((res) => {
      axios
        .get(`http://localhost:2511/users/${userToFollow}`)
        .then((res) => dispatch(getUserData(res.data.data)));
    });
};

export const unFollowUser = (loggedInUser, userToUnfollow, dispatch) => {
  axios
    .patch(`http://localhost:2511/users/unfollow/${loggedInUser}`, {
      userId: `${userToUnfollow}`,
    })
    .then((res) => {
      axios
        .get(`http://localhost:2511/users/${loggedInUser}`)
        .then((res) => dispatch(getUserData(res.data.data)));
    });
};
