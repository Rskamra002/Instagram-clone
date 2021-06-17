import React, { useState } from 'react'
import styled from 'styled-components'

export default function Image({imgSrc,like,handleLike}) {

  const [likeEffect, setLikeEffect] = useState(false);

  const [size,setSize] = useState(70);

  const [playVideo,setPlayVideo] = useState(false);
  const [pauseIcon,setPauseIcon] = useState(true);

  const handleStart = (e) => {
    setPlayVideo(prev => !prev)
    setPauseIcon(prev => !prev)
    !playVideo ? e.target.play()  : e.target.pause();
  }

  const setLike = () => {
    setLikeEffect(true)
    setTimeout(() => {
      setSize(85)
    },100)
    setTimeout(() => {
      setSize(90)
    },200)
    setTimeout(() => {
      setSize(95)
    },300)
    setTimeout(() => {
      setSize(90)
    },400)
    setTimeout(() => {
      setSize(85)
    },500)
    setTimeout(() => {
      setLikeEffect(false)
    },600)
    if(like){
      return;
    }
    handleLike();
  }
  return (
    <div style={{position:"relative"}}>
      { likeEffect &&
      <DoubleClickEffect height={`${size}px`} alt="heart" src="https://img.icons8.com/ios-filled/2x/ffffff/like.png"/>
      }
      { imgSrc.includes('.mp4') && pauseIcon &&
      <DoubleClickEffect height={`${size}px`} alt="pause" src="https://img.icons8.com/fluent-systems-filled/2x/ffffff/play.png"/>
      }
      
      <Img onDoubleClick={setLike}>
          {imgSrc.includes('.jpg') || imgSrc.includes('.png') ? <img src={imgSrc} alt="image"/> : imgSrc.includes('.mp4') || imgSrc.includes('.png') ? 
          <video onClick={handleStart} alt="video">
            <source src={imgSrc} type="video/mp4" />
        </video > : null}
      </Img>
    </div>
  )
}

// window.onscroll= () => {
//   if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
//     scrollToEnd()
//   }

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
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  opacity: 0.8;
  transition: height 0.1s;
`