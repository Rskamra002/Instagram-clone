import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const DisplayLikesCount = ({ allLikes, recentLike }) => {
  const activeUser = useSelector((state) => state.login.user);
  return (
    <>
      {allLikes.length === 0 ? (
        "Be the first to like this"
      ) :
       allLikes.length == 1 ? (
        `${allLikes.length} like`
      ) : 
      allLikes.length > 2 ? (
        recentLike?.username === activeUser.username ? (
          <LikesInfo>
            <img src={`${recentLike?.profilePic}`} />
            <div>{`Liked by you and ${allLikes.length - 1} others`}</div>
          </LikesInfo>
        ) : 
        (
          <LikesInfo>
            <img src={`${recentLike?.profilePic}`} />

            <div>{`Liked by ${recentLike?.username} and ${
              allLikes.length - 1
            } others`}</div>
          </LikesInfo>
        )
      ) : 
      (
        `${allLikes.length} likes`
      )}
    </>
  );
};

export default DisplayLikesCount;

const LikesInfo = styled.div`
  display: flex;
  img {
    height: 20px;
    margin: 2px 10px 0px 0px;
    width: 20px;
    border-radius: 50%;
  }
`;
