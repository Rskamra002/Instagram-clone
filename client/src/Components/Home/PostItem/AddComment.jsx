import React from 'react'
import styled from 'styled-components'
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { smileIconPath } from './svgIcons';
import { useState } from 'react';

export default function AddComment({handleAddComment,inputRef,query,setQuery}) {

  const [showEmojis,setShowEmojis] = useState(false)

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setQuery((prev) => prev + emoji);
  };

  const handleShowEmojis = () => {
    // also one onClick is added in input to close emoji div
    setShowEmojis(prev => !prev)
  }

  return (
    <MainDiv>
      <CommentForm onSubmit={handleAddComment}>
            {/* smile icon */}
            <span onClick={handleShowEmojis}>
              <svg aria-label="Emoji" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d={smileIconPath}></path></svg>
            </span>

             <input type="text" ref={inputRef} placeholder="Add a comment..." value={query} onChange={handleChange} onClick={()=>setShowEmojis(false)}/>

             <button>Post</button>
      </CommentForm>
      <Box1 show={showEmojis}>
        <Box2>
          <Picker onSelect={addEmoji} />
        </Box2>
      </Box1>
      <Arrow show={showEmojis}>
        <i className="fas fa-sort-down fa-2x"></i>
      </Arrow>
      
    </MainDiv>
  )
}

const MainDiv = styled.div`
  position:relative;
`

const CommentForm = styled.form`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0px 10px;

  svg{
    cursor: pointer;
  }
  input{
    display:block;
    width:90%;
    height:50px;
    font-size:16px;
    padding:10px 10px 10px 14px;
    border:none;
    outline:none;
  }
  button{
    width:10%;
    cursor: pointer;
    border:none;
    font-size:18px;
    font-weight:bold;
    color:#55B7F7;
    opacity:0.7;
    background-color:transparent;
  }
  border-top:1px solid rgb(200,200,200);;
  display:flex;
  width:100%;
`

const Box1 = styled.div`
display: ${props => props.show === true ? "block" : "none"};
width:340px;
height:273px;
overflow:auto;
position:absolute;
bottom:100%;
`;

const Box2 = styled.div`
width:100%;
height:420px;
overflow:scroll;
position:absolute;
top:-83px;
span{
  cursor: pointer !important;
}
`;

const Arrow = styled.div`
  display: ${props => props.show === true ? "block" : "none"};
  position:absolute;
  top:-20px;
  left:10px;
  i{
    color:rgb(240,240,240);
  }
`