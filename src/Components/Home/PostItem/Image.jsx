import React from 'react'
import styled from 'styled-components'

export default function Image({imgSrc,like,setLike}) {
  return (
    <div>
      <Img onDoubleClick={() => setLike(!like)}>
          <img src={imgSrc} alt=""/>
        </Img>
    </div>
  )
}

const Img = styled.div`
  width:100%;
  height:560px;
  cursor: pointer;
  img{
    width:100%;
    height:100%;
  }
`