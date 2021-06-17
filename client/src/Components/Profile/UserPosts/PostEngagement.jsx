import React, { useEffect, useState, useRef } from "react";
import { makeStyles, Divider, Avatar } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import DisplayComments from "./DisplayComments";
import AddComment from "./AddComment";
import DisplayLikesCount from "./DisplayLikesCount";
import Icons from "./Icons";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  avatar: {
    marginRight: "10px",
  },
}));

const PostEngagement = (data) => {
  const classes = useStyles();
  const loggedInUserData = useSelector(state => state.login.user);

  const { fullname, username, profilePic, caption, _id, likes, comments } =
    data;
  const [like, setLike] = useState(false);
  const [allLikes, setAllLikes] = useState(likes);
  const [savedPost, setSavedPost] = useState(false);
  const [allComments, setAllComments] = useState(comments);
  const [recentLike, setRecentLike] = useState();

  // comment
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  const user = loggedInUserData;
  // after like or dislike getting new data of post

  const handleLikeCount = () => {
    axios.get(`http://localhost:2511/posts/${_id}`).then((res) => {
      setAllLikes(res.data.data.likes);
    });
  };

  // is post already saved by logged in user
  const isPostSavedByUser = () => {
    axios.get(`http://localhost:2511/users/${user._id}`)
      .then(res => res.data.data.savedPosts.includes(_id) ? setSavedPost(true) : setSavedPost(false))
  };

  // is post already liked by logged in user
  const isPhotoLikedByUser = () => {
    axios.get(`http://localhost:2511/posts/${_id}`).then((res) => {
      res.data.data.likes.includes(user._id) ? setLike(true) : setLike(false);
    });
  };

  // handling save-unsave operation
  const handleSaveUnsave = (_id) => {
    if (savedPost) {
      // unsave
      axios
        .patch(`http://localhost:2511/users/removesavedpost/${user._id}`, {
          postId: _id,
        })
        .then((res) => {
          setSavedPost(false);
          // handleSaveUnsaveUpdate();
        });
    } else {
      // save
      axios
        .patch(`http://localhost:2511/users/savepost/${user._id}`, {
          postId: _id,
        })
        .then((res) => {
          setSavedPost(true);
        });
    }
  };

  // handling like-unlike operation
  const handleLike = () => {
    if (like) {
      // unlike
      axios
        .patch(`http://localhost:2511/posts/unlikepost/${_id}`, {
          userId: user._id,
        })
        .then((res) => {
          setLike(false);
          handleLikeCount();
        });
    } else {
      // like
      axios
        .patch(`http://localhost:2511/posts/likepost/${_id}`, {
          userId: user._id,
        })
        .then((res) => {
          setLike(true);
          handleLikeCount();
        });
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (query === "") {
      return;
    }

    // logged in user
    const payload = {
      userId: user._id,
      comment: query,
    };

    // _id => postId
    axios
      .patch(`http://localhost:2511/posts/addcomment/${_id}`, payload)
      .then((res) => {
        handleCommentCount();
      });
    setQuery("");
  };

  const handleCommentCount = () => {
    // after like or dislike getting new data of post
    axios.get(`http://localhost:2511/posts/${_id}`).then((res) => {
      setAllComments(res.data.data.comments);
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2511/users/${allLikes[allLikes.length - 1]}`)
      .then((res) => {
        setRecentLike(res.data.data);
      });
    isPostSavedByUser();
    isPhotoLikedByUser();
  }, [allLikes]);

  return (
    <>
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
      <Comment>
        {allComments.map((comment) => {
          return <DisplayComments {...comment} />;
        })}
      </Comment>
      <Container>
        <Divider />

        <Icons
          handleLike={handleLike}
          like={like}
          inputRef={inputRef}
          handleSaveUnsave={handleSaveUnsave}
          savedPost={savedPost}
          _id={_id}
        />

        <LikesCount>
          <span>
            <DisplayLikesCount allLikes={allLikes} recentLike={recentLike} />
          </span>
        </LikesCount>
        <CommentBox>
          <AddComment
            handleAddComment={handleAddComment}
            inputRef={inputRef}
            query={query}
            setQuery={setQuery}
          />
        </CommentBox>
      </Container>
    </>
  );
};

export default PostEngagement;

const Container = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  height: 70px;
`;

const CommentBox = styled.div`
margin-top:50px;
  width: 95%;
  position: absolute;
`;

const Box = styled.div`
  display: flex;
`;

const LikesCount = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div`
  height: 250px;
  width: 100%;
  gap: 20px;
  height: 315px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
