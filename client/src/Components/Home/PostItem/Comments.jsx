import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {timeConverter} from '../../../Utils/timeConverter'

export default function Comments({comment}) {

  const [commentBy,setCommentBy] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:2511/users/${comment.userId}`).then((res) => {
      setCommentBy(res.data.data.username)
    })
  },[])

  return (
         <>
          <div id={comment._id}>
            <span>
              <span>{commentBy}</span>
              {comment.comment}
            </span>
            <span>
              {timeConverter(comment.commentTime)}
            </span>
          </div>
      </>
  )
}
