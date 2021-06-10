import React, { useEffect, useState } from "react";
import { makeStyles, Divider, Box, Avatar } from "@material-ui/core";
import styled from "styled-components";
import { comment, like, saved, message } from "./SvgIcons";
import axios from "axios";

const useStyles = makeStyles(() => ({
  avatar: {
    marginRight: "10px",
  },
}));

const Comments = ({ fullname, profile_pic, username, likes }) => {
  const [recentLike, setRecentLike] = useState("");
  useEffect(() => {
    const user = likes[likes.length - 1];
    axios
      .get(
        `https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${user}`
      )
      .then((res) => setRecentLike(res.data));
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Box style={{ display: "flex" }}>
        <Avatar
          className={classes.avatar}
          alt={`${fullname}'s Profile Picture`}
          src={profile_pic}
        ></Avatar>
        <div>
          <span>{username}</span> This is the Post Caption.....
        </div>
      </Box>
      <Container>
        <Divider />
        <Icons>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626">
            <path d={like}></path>
          </svg>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626">
            <path d={comment}></path>
          </svg>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626">
            <path d={message}></path>
          </svg>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626">
            <path d={saved}></path>
          </svg>
        </Icons>
        {recentLike && (
          <div className={classes.likesInfo}>
            <span>
              <ImgIcon src={recentLike.profile_pic}></ImgIcon>
            </span>
            Liked by <span>{recentLike.username}</span> and{" "}
            <span>{likes.length - 1} others</span>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Comments;

const Container = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
  padding: 10px;
`;

const Icons = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  margin: 10px 0px;
  svg:nth-child(4) {
    flex-grow: 2;
    right: 10%;
    position: absolute;
  }
`;

const ImgIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 5px;
`;
