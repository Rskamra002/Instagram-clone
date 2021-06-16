import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {unlikeIconPath,likeIconPath} from './svgIcons'
import styled from "styled-components"
  

  export default function Comments({comment}) {

  const [commentBy,setCommentBy] = useState("")
  const [like,setLike] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:2511/users/${comment.userId}`).then((res) => {
      setCommentBy(res.data.data.username)
    })
  },[])

  const handleCommentLike = () => {
    setLike(!like)
  }

  return (
         <>
          <div id={comment._id}>
            <span>
              <Link to={`/${commentBy}`}>{commentBy}</Link>
              {comment.comment}
            </span>
            <span>
            <LikeIcon onClick={handleCommentLike} like={like}> 
              {like ? <svg aria-label="Unlike" class="_8-yf5 " fill="#ed4956" height="12" viewBox="0 0 48 48" width="12"><path d={unlikeIconPath}></path></svg> : <svg aria-label="Like" class="_8-yf5 " fill="#262626" height="12" viewBox="0 0 48 48" width="12"><path d={likeIconPath}></path></svg>}
            </LikeIcon>
            </span>
          </div>
      </>
  )
}


const LikeIcon = styled.button`
  color: ${props => props.like === true ? "red ": "black"};
  border:none;
  background-color:transparent;
  margin:6px 10px 2px;
  margin-left:0px;
  cursor: pointer;
`
