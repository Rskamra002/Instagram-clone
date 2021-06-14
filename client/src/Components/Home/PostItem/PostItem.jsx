import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo'
import Image from './Image'
import Comments from './Comments'
import Likes from './Likes'
import AddComment from './AddComment'
import axios from 'axios';
import { useEffect } from 'react';
import {unlikeIconPath,likeIconPath ,savedPostIconPath,unsavedPostIconPath, sendMsgIconPath, commentIconPath} from './svgIcons'
import { useSelector } from 'react-redux';

const PostItem = ({_id,userId,src,caption,likes,comments}) => {
  const [postOwnerUserName,setPostOwnerUserName] = useState("")
  const [postOwnerPic,setPostOwnerPic] = useState("")

  // logged in user info
  const user = useSelector(state => state.login.user);

  // current post like status
  const [like,setLike] = useState(false);

  // post likes array
  const [allLikes,setAllLikes] = useState(likes);

  // post comments array
  const [allComments,setAllComments] = useState(comments);
  const [viewMore,setViewMore] = useState(false);

  // comment 
  const [query,setQuery] = useState("");

  // on clicking on comment icon comment input will be focused
  const inputRef = useRef();


  // is post saved
  const [isPostSaved,setIsPostSaved] = useState(false);

  const fetchPostOwner = () => {
    axios.get(`http://localhost:2511/users/${userId}`).then((res) => {
      setPostOwnerUserName(res.data.data.username)
      setPostOwnerPic(res.data.data.profilePic)
    })
  }

  const isPhotoLikedByUser = () => {
    axios.get(`http://localhost:2511/posts/${_id}`).then(res => {
      res.data.data.likes.includes(user._id) ? setLike(true) : setLike(false);
    })
  }

  const handleLike = () => {
    if(like){
      // unlike
      axios.patch(`http://localhost:2511/posts/unlikepost/${_id}`,{
        "userId": user._id
      }).then(res => {
      setLike(false)
      handleLikeCount()
    })
    } else{
      // like
      axios.patch(`http://localhost:2511/posts/likepost/${_id}`,{
        "userId": user._id
      }).then(res => {
        setLike(true);
        handleLikeCount()
    })
    }
  }

  const handleLikeCount = () =>{
    // after like or dislike getting new data of post
    axios.get(`http://localhost:2511/posts/${_id}`).then(res => {
      setAllLikes(res.data.data.likes)
    })
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if(query === ""){
      return;
    }

  // logged in user
    const payload = {
      userId: user._id, 
      comment: query, 
    }

    // _id => postId
    axios.patch(`http://localhost:2511/posts/addcomment/${_id}`, payload).then(res => {
      handleCommentCount()
    })
    setQuery("");
  }

  const handleCommentCount = () =>{
    // after like or dislike getting new data of post
    axios.get(`http://localhost:2511/posts/${_id}`).then(res => {
      setAllComments(res.data.data.comments)
    })
  }
  
  // is this post save in user savedPosts array

  const isPostSavedFunc = () => {
     const isPresent = user.savedPosts.filter(savedPostId => savedPostId === _id);
     if(isPresent.length !== 0){
        setIsPostSaved(true);
     }
  }
  
  // saving the post
  const handleSavePost = () => {
    if(isPostSaved){
      // removepost
      axios.patch(`http://localhost:2511/users/removesavepost/${user._id}`,{
        "postId": _id
      }).then(res => {
        setIsPostSaved(false)
    })
    } else{
      // save post
      axios.patch(`http://localhost:2511/users/savepost/${user._id}`,{
        "postId": _id
      }).then(res => {
        setIsPostSaved(true);
    })
    }
  }

  useEffect(() => {
    fetchPostOwner();
    isPhotoLikedByUser();
    isPostSavedFunc();
  },[])

    return (
      <Container>
        <Header>
          <UserInfo username={postOwnerUserName} imgUrl={postOwnerPic}  />

          {/* More options icon  */}
          <svg aria-label="More options" class="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>

        </Header>
          <Image imgSrc={src} like={like} handleLike={handleLike}/>

          <Engagement>
            <Icons>
              <div>
                <LikeIcon onClick={handleLike} like={like}>

                  {like ? <svg aria-label="Unlike" class="_8-yf5 " fill="#ed4956" height="24" viewBox="0 0 48 48" width="24"><path d={unlikeIconPath}></path></svg> : <svg aria-label="Like" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d={likeIconPath}></path></svg>}
                </LikeIcon>
                <CommentIcon onClick={() => {inputRef.current.focus()}} >


                <svg aria-label="Comment" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d={commentIconPath} fill-rule="evenodd"></path></svg>
                </CommentIcon>

                <SendMsgIcon>
                <svg aria-label="Share Post" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d={sendMsgIconPath} /></svg>
                </SendMsgIcon>
              </div>
              <div>
                <SavedPostIcon onClick={handleSavePost}>
                  {isPostSaved ? <svg aria-label="Remove" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d={savedPostIconPath}></path></svg> : <svg aria-label="Save" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                    <path d={unsavedPostIconPath} />
                  </svg>} 
                </SavedPostIcon>
              </div>
            </Icons>

            <Likes likes={allLikes} />
            
            <Caption>
              <div><span>{postOwnerUserName}</span>{caption}</div>
            </Caption>

            {allComments.length > 2 ? <ViewMoreComments >
            <button onClick={() => {setViewMore(!viewMore)}}>{viewMore ? "Hide comments": "View more comments"}</button>
            </ViewMoreComments> : null}
            <AllComments viewMore={viewMore}> 
              {allComments?.map((commentItem) => <Comments key={commentItem._id} comment={commentItem}/>)}
            </AllComments>
          </Engagement>
          
          <AddComment handleAddComment = {handleAddComment} inputRef={inputRef} query={query} setQuery={setQuery} />

      </Container>
    );
}

export {PostItem}
const Container = styled.div`
  width:100%;
  /* min-height:800px; */
  margin:30px 0;
  border:1px solid #DBDBDB;
  /* box-shadow: 0px 0px 4px gray; */
`
const Header = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  svg{
    margin-right:10px;
  }
`

const Engagement = styled.div`
  padding:6px 18px;
`

const Icons = styled.div`
  display:flex;
  justify-content:space-between;
`
const LikeIcon = styled.button`
  color: ${props => props.like === true ? "red ": "black"};
  border:none;
  background-color:transparent;
  margin:6px 10px 2px;
  margin-left:0px;
  cursor: pointer;
`
const CommentIcon = styled.button`
  cursor: pointer;
  border:none;
  background-color:transparent;
  margin:6px 10px 2px ;
`
const SendMsgIcon = styled.button`
  margin:6px 10px 2px;
  cursor: pointer;
  border:none;
  background-color:transparent;
`
const SavedPostIcon = styled.button`
  margin:6px 0px;
  cursor: pointer;
  border:none;
  background-color:transparent;
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



const ViewMoreComments = styled.div`
  button{
    cursor: pointer;
    border:none;
    background-color:transparent;
  }
`
const AllComments = styled.div`
  max-height:58px;
  overflow-y: ${props => props.viewMore ? "scroll" :"hidden"} ;
  div{
    font-size:15px;
    margin:6px 0px;
    display:flex;
    justify-content:space-between;
    & > span > span{
      font-weight:bold;
      display:inline-block;
      margin-right:4px;
    }

  }
`