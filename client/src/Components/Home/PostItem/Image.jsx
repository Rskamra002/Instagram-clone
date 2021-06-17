import React, { useState } from 'react'
import styled from 'styled-components'

export default function Image({imgSrc,like,handleLike}) {

  const [likeEffect, setLikeEffect] = useState(false)

  const setLike = () => {
    setLikeEffect(true)
    setTimeout(() => {
      setLikeEffect(false)
    },600)
    if(like){
      return;
    }
    handleLike();
  }

  return (
    <div>
      { likeEffect &&
      <DoubleClickEffect alt="" src="https://img.icons8.com/ios-filled/2x/ffffff/like.png"/>
      }
      <Img onDoubleClick={setLike}>
          {imgSrc.includes('.jpg') || imgSrc.includes('.png') ? <img src={imgSrc} alt="image"/> : imgSrc.includes('.mp4') || imgSrc.includes('.png') ? <video src={imgSrc} alt="video"/> : null}
      </Img>
    </div>
  )
}

const Img = styled.div`
  width:100%;
  height:640px;
  cursor: pointer;
  img{
    width:100%;
    height:100%;
    object-fit: cover;
  }
  video{
    width:100%;
    height:100%;
  }
`
const DoubleClickEffect = styled.img`
  position: absolute;
  margin-top:30%;
  margin-left:28%;
  opacity: 0.8;
  height: 80px;
  transition: height 0.1s;
`