import React from 'react'
import styled from 'styled-components'

export default function Image({imgSrc,like,handleLike}) {

  const setLike = () => {
    if(like){
      return;
    }
    handleLike();
  }

  return (
    <div>
      <Img onDoubleClick={setLike}>
          {imgSrc.includes('.jpg') || imgSrc.includes('.png') ? <img src={imgSrc} alt=""/> : null}
          
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
  }
`