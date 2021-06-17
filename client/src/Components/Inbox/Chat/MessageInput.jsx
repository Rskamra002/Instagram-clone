import React, { useState } from 'react'
import styled from 'styled-components'
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { likeIconPath, smileIconPath } from '../../Home/PostItem/svgIcons';

function MessageInput({handleSendMessage}) {

  const [text,setText]  = useState("");

  const handleSubmit = (e)=>{
      e.preventDefault();
      if(text === ""){
        return;
      }
      handleSendMessage(text)
      setText("")
  }

  const [showEmojis,setShowEmojis] = useState(false)


  const addEmoji = (e) => {
    let emoji = e.native;
    setText((prev) => prev + emoji);
  };

  const handleShowEmojis = () => {
    // also one onClick is added in input to close emoji div
    setShowEmojis(prev => !prev)
  }

  const handleSendLike = () => {
    // && e.keyCode === 13
    if(text.length > 0 ){
      return;
    }
    handleSendMessage('❤️');
  }
    
    return (

      <MainDiv>
      <CommentForm onSubmit={handleSubmit}>
            {/* smile icon */}
            <span onClick={handleShowEmojis}>
              <svg aria-label="Emoji" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d={smileIconPath}></path></svg>
            </span>

            <input type="text" placeholder="Message..." value={text} onChange={(e)=>setText(e.target.value)} onClick={()=>setShowEmojis(false)}/>
              <LikeIcon onClick={handleSendLike}>
                  <svg aria-label="Like" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d={likeIconPath}></path></svg>
              </LikeIcon>
            <SendButton></SendButton>
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

         
export default MessageInput


const SendButton = styled.button`
   display: none;
`
const MainDiv = styled.div`
  position:relative;
  width:93%;
  margin:auto;
  margin-bottom:8px;
`
const CommentForm = styled.form`
  display:flex;
  gap:8px;
  align-items:center;
  padding:8px 12px;
  border:1px solid #DBDBDB !important;
  border-radius:20px;
  width:80%;
  height:42px;
  svg{
    cursor: pointer;
  }
  input{
    display:block;
    width:90%;
    height:100%;
    font-size:15px;
    padding:2px;
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
::-webkit-scrollbar {
    display: none;
}
`;

const Box2 = styled.div`
width:100%;
height:420px;
overflow-y:scroll;
overflow-x:hidden;
position:absolute;
top:-83px;
span{
  cursor: pointer !important;
}
::-webkit-scrollbar {
    display: none;
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

const LikeIcon = styled.button`
`