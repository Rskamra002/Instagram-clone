import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal';
import LikesDetails from './LikesDetails'

export default function Likes({likes}) {
  const [showLikes,setShowLikes] = useState(false);

  const handleShowLikes = () => {
    setShowLikes(true);
  }
  const handleHideLikes = () => {
    setShowLikes(false);
  }

  return (
       <LikesBox>
       {showLikes ? <LikesDetails likes={likes} showLikes={showLikes} handleHideLikes={handleHideLikes} /> : null} 
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


