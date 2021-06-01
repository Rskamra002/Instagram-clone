import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo'
import Image from './Image'
import Comments from './Comments'
import Likes from './Likes'
import AddComment from './AddComment'
import axios from 'axios';
import { useEffect } from 'react';

const PostItem = ({photoId,userId,imgSrc,caption,likes,comments,dateCreation}) => {
  const [postOwnerUserName,setPostOwnerUserName] = useState("")
  const [postOwnerPic,setPostOwnerPic] = useState("")

  const [like,setLike] = useState(false);
  const [allComments,setAllComments] = useState(comments);
  const [viewMore,setViewMore] = useState(false);
  const [query,setQuery] = useState("");
  const inputRef = useRef();


  const fetchPostOwner = () => {
    axios.get(`https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${userId}`).then((res) => {
      setPostOwnerUserName(res.data.username)
      setPostOwnerPic(res.data.profile_pic)
    })
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if(query === ""){
      return;
    }
    const payload = {
      displayName: "username", 
      comment: query, 
      commentTime: Date.now()
    }
    setAllComments([payload,...allComments]);
    setQuery("");
  }

  useEffect(() => {
    fetchPostOwner();
  },[])

    return (
      <Container>
          <UserInfo postOwnerUserName={postOwnerUserName} postOwnerPic={postOwnerPic}  />
          <Image imgSrc={imgSrc} like={like} setLike={setLike}/>

          <Engagement>
            <Like onClick={() => setLike(!like)} like={like}>
              {like ? <i className="fas fa-heart fa-lg"></i> : <i className="far fa-heart fa-lg"></i>}
            </Like>
            <CommentIcon onClick={() => {inputRef.current.focus()}} >
              <i className="far fa-comment fa-lg"></i>
            </CommentIcon>

            <Likes likes={likes} />
            
            <Caption>
              <div><span>{postOwnerUserName}</span>{caption}</div>
            </Caption>

            <Comments allComments={allComments} viewMore={viewMore} setViewMore={ setViewMore} />
          </Engagement>
          
          <AddComment handleAddComment = {handleAddComment} inputRef={inputRef} query={query} setQuery={setQuery} />

      </Container>
    );
}

export {PostItem}
const Container = styled.div`
  width:30%;
  min-width:400px;
  min-height:700px;
  margin:30px auto;
  border:1px solid #333;
`
const Engagement = styled.div`
  padding:6px;
`
const Like = styled.button`
  color: ${props => props.like === true ? "red ": "black"};
  border:none;
  background-color:transparent;
  margin:6px 6px 6px 0px;
  cursor: pointer;
`
const CommentIcon = styled.button`
  cursor: pointer;
  border:none;
  background-color:transparent;
  margin:6px 8px;
`

const Caption = styled.div`
   div{
    font-size:15px;
    font-weight:500;
    span{
      font-size:16px;
      font-weight:bold;
      display:inline-block;
      margin-right:4px;
    }
  }
  margin-bottom:10px;
`

