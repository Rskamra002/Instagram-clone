import React, { useEffect, useState } from "react";
import { makeStyles, Divider, Avatar } from "@material-ui/core";
import styled from "styled-components";
import { comment, like, saved, message, unsaved, unlike } from "./SvgIcons";
import axios from "axios";

const useStyles = makeStyles(() => ({
  avatar: {
    marginRight: "10px",
  },
  divider: {
    marginTop: "20px",
    marginBottom: "5px",
  }
}));

const Comments = ({ fullname, profilePic, username, likes, id, caption }) => {
  const [recentLike, setRecentLike] = useState("");
  const [likedPost, setLikedPost] = useState(false);
  const [savedPost, setSavedPost] = useState(false);
  const [comment, setComment] = useState('');
  // to get the user's data
  useEffect(() => {
    const user = likes[likes.length - 1];
    axios
      .get(
        `http://localhost:2511/users/${user}`
      )
      .then((res) => setRecentLike(res.data.data));
  }, []);

  const classes = useStyles();
  const handleLikeDislike = (e) => {
    e.target.width = "48"
  }
  return (
    <div>
      <Box>
        <Avatar
          className={classes.avatar}
          alt={`${fullname}'s Profile Picture`}
          src={profilePic}
        ></Avatar>
        <div>
          <span>{username}</span> {caption}
        </div>
      </Box>
      <Container>
        <Divider />
        <Icons>
          <svg height="24" width="24" viewBox="0 0 48 48" fill={likedPost ? "#ed4956" : "#262626"} onClick={(e) => handleLikeDislike(e)}>
            <path d={likedPost ? unlike : like}></path>
          </svg>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626"  >
            <path clip-rule="evenodd" d={comment}></path>
          </svg>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626">
            <path d={message}></path>
          </svg>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626" onClick={() => setSavedPost(!savedPost)}>
            <path d={savedPost ? saved : unsaved}></path>
          </svg>
        </Icons>
        {recentLike && (
          <div className={classes.likesInfo}>
            <span>
              <ImgIcon src={recentLike.profilePic}></ImgIcon>
            </span>
            Liked by <span>{recentLike.username}</span> and{" "}
            <span>{likes.length - 1} others</span>
          </div>
        )}
        <Divider className={classes.divider} />
        <Box>
          <Input placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)} />
          <PostBtn disabled={comment.length === 0} onClick={() => console.log('working')}>Post</PostBtn>
        </Box>
      </Container>
    </div >
  );
};

export default Comments;

const Container = styled.div`
  position: absolute;
  bottom: 2px;
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

const Input = styled.input`
  outline:none;
  border:none;
  width:100%;
  height:20px;
  padding:20px;
  margin:2px 0px;
`;

const PostBtn = styled.div`
  color:#0095f6;
  background:transparent;
  outline:none;
  border:none;
  margin-right: 20px;
  font-weight:600;
  opacity:${comment ? "100%" : "20%"};
  :hover {
    cursor:pointer;
  }
`
const Box = styled.div`
  display:flex;
`