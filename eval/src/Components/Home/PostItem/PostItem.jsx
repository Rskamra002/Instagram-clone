import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo'
import Image from './Image'
import Comments from './Comments'
import Likes from './Likes'
import AddComment from './AddComment'
import axios from 'axios';
import { useEffect } from 'react';
import {unlikeIconPath,likeIconPath ,savedPostIconPath, sendMsgIconPath, commentIconPath} from './svgIcons'

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
        <Header>
          <UserInfo username={postOwnerUserName} imgUrl={postOwnerPic}  />

          {/* More options icon  */}
          <svg aria-label="More options" class="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>

        </Header>
          <Image imgSrc={imgSrc} like={like} setLike={setLike}/>

          <Engagement>
            <Icons>
              <div>
                <LikeIcon onClick={() => setLike(!like)} like={like}>

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
                <SavedPostIcon>
                  <svg aria-label="Save" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                    <path d={savedPostIconPath} />
                  </svg>

                </SavedPostIcon>
              </div>
            </Icons>

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
  width:100%;
  /* min-height:800px; */
  margin:30px 0;
  box-shadow: 0px 0px 4px gray;
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

