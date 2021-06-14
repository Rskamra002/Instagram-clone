import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'

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
`
const SendButton = styled.button`
   display: none;

`