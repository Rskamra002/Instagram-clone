import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {format} from "timeago.js"

function Message({ownMessage,data}) {
    const [messenger,setMessenger] = useState(null)

    useEffect(async () => {
        await axios.get(`http://localhost:2511/users/${data.senderId}`).then(res=>setMessenger(res.data.data))
    }, [data])

    return (
        <WrapperMain ownMessage={ownMessage}>
            <IndMsgWrapper ownMessage={ownMessage}>
                {
                    ownMessage?
                    <>
                        <MessageText ownMessage={ownMessage}>
                            {data.text}
                        </MessageText>
                        <MessageImage ownMessage={ownMessage} src={messenger?.profilePic} alt=""/>
                    </>:<>
                        <MessageImage ownMessage={ownMessage} src={messenger?.profilePic} alt=""/>
                        <MessageText ownMessage={ownMessage}>
                            {data.text}
                        </MessageText>
                    </>
                }
            </IndMsgWrapper>
            <TimeAgo>
                {format(data.createdAt)}
            </TimeAgo>
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
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
`
const MessageText = styled.p`
    padding:.5rem;
    border:1px solid #DBDBDB;
    border-radius: 20px;
    background-color:${props=>props.ownMessage?"#EFEFEF":"#FFFFFF"};
    max-width: 250px;
    word-wrap: break-word
`
const TimeAgo = styled.p`
    font-size: 11px;
    margin: 0px 60px;
    color: #b6b6b6;
`
