import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Message({ownMessage,data}) {
    const [messenger,setMessenger] = useState(null)

    useEffect(async () => {
        await axios.get(`http://localhost:2511/users/${data.senderId}`).then(res=>setMessenger(res.data.data))
    }, [data])

    return (
        <WrapperMain ownMessage={ownMessage}>
            <IndMsgWrapper ownMessage={ownMessage}>
                <MessageImage ownMessage={ownMessage} src={messenger?.profilePic} alt=""/>
                <MessageText ownMessage={ownMessage}>
                    {data.text}
                </MessageText>
            </IndMsgWrapper>
        </WrapperMain>
    )
}

export default Message

const WrapperMain = styled.div`
    display:  flex;
    flex-direction: column;
    align-items:${props=>props.ownMessage?"flex-end":"flex-Start"}
`
const IndMsgWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: .2rem .8rem;
`
const MessageImage = styled.img`
    display:${props=>props.ownMessage?"none":"inline"} ;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
`
const MessageText = styled.p`
    padding:.5rem;
    border-radius: 20px;
    background-color:${props=>props.ownMessage?"#EFEFEF":"#FFFFFF"};
    max-width: 250px;
    word-wrap: break-word
`
