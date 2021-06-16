import React, { useState } from 'react'
import styled from 'styled-components'
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { smileIconPath } from '../../Home/PostItem/svgIcons';

function MessageInput({handleSendMessage}) {
    const [text,setText]  = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault()
        handleSendMessage(text)
        setText("")
    }
    return (
        <Wrappper>
            <form>
                <div>
                {/* <Box1 show={showEmojis}>
                    <Box2>
                    <Picker onSelect={addEmoji} />
                    </Box2>
                </Box1>
                <Arrow show={showEmojis}>
                    <i className="fas fa-sort-down fa-2x"></i>
                </Arrow> */}
                </div>
                <InputBox type="text" placeholder="Message..." value={text} onChange={(e)=>setText(e.target.value)}/>
                <SendButton type="submit" onClick={handleSubmit}></SendButton>
            </form>
        </Wrappper>
    )
}

export default MessageInput

const Wrappper = styled.div`
    width: 100%;
    padding:.5rem;
`
const InputBox = styled.input`
    width: 100%;
    padding:.5rem;
    outline: none;
    border-radius: .5rem;
    border:1px solid #DBDBDB;
`
const SendButton = styled.button`
   display: none;
`
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