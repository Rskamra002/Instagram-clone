import axios from "axios";
export const UpdateFollows = (loggedIn, toFollow, reRender) => {
  let updateFollowings = new Promise((resolve, reject) => {
    let followings = axios
      .get(
        `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${loggedIn}`
      )
      .then((res) => res.data.following);
    if (followings) {
      resolve(followings);
    } else {
      reject("rejected");
    }
  });

  let updateFollowers = new Promise((resolve, reject) => {
    let followers = axios
      .get(
        `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${toFollow}`
      )
      .then((res) => res.data.followers);
    if (followers) {
      resolve(followers);
    } else {
      reject("rejected");
    }
  });

  updateFollowings
    .then((currentFollowings) => {
      var updatedFollowings;
      if (currentFollowings.includes(toFollow)) {
        updatedFollowings = currentFollowings.filter(item => item != toFollow)
      } else {
        updatedFollowings = [...currentFollowings, toFollow]
      }
      axios
        .patch(
          `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${loggedIn}`,
          {
            following: updatedFollowings,
          }
        )
        .then((res) => res);
    })
    .catch((msg) => msg);

  updateFollowers
    .then((currentFollowers) => {
      var updatedFollowers;
      if (currentFollowers.includes(loggedIn)) {
        updatedFollowers = currentFollowers.filter(item => item != loggedIn)
      } else {
        updatedFollowers = [...currentFollowers, loggedIn]
      }
      axios
        .patch(
          `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${toFollow}`,
          {
            followers: updatedFollowers,
          }
        )
        .then((res) => {
          reRender()
        });
    })
    .catch((msg) => msg);
};