import React, { useState } from 'react'
import styled from 'styled-components'
import LikesDetails from './LikesDetails'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Likes({likes}) {
  const [showLikes,setShowLikes] = useState(false);
  const loggedInUser = useSelector(state => state.login.user);

  const [loggedInUserFollowing,setLoggedInUserFollowing] = useState([])

  const handleShowLikes = () => {
    axios.get(`http://localhost:2511/users/${loggedInUser._id}`).then((res) => {
      setLoggedInUserFollowing(res.data.data.following);
    }).finally(() => {
     setShowLikes(true);
    })
  }
  const handleHideLikes = () => {
    setShowLikes(false);
  }

  return (
       <LikesBox>
       {showLikes ? <LikesDetails loggedInUserId={loggedInUser._id} likes={likes} showLikes={showLikes} handleHideLikes={handleHideLikes} loggedInUserFollowing={loggedInUserFollowing}/> : null} 
       {likes.length === 0 ? <button>Be the first to <span>like this</span></button> : <button type="button"  onClick={handleShowLikes}> {likes.length} likes
         </button>}
        </LikesBox>
  )
}

const LikesBox = styled.div`
  button{
    background-color:transparent;
    font-size:15px;
    border:none;
    font-weight:600;
    font-size: 13px;
    color: #262626;
    cursor: pointer;
  }
`


