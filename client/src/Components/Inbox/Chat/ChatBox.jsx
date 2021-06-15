import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadData } from '../../../Utils/localStorage';
import chatBoxStyles from "./chatBox.module.css";
import Message from './Message';
import MessageInput from './MessageInput';
import {io} from "socket.io-client"
import styled from 'styled-components';
import { SearchPopUp } from '../User/SearchPopUp';


function ChatBox() {
    const {conversationId,friendId} = useParams()
    const loggedInUser = loadData("users");
    const [currentChat, setCurrentChat] = useState([])
    const [friendDetails, setFriendDetails] = useState(null)
    const scrollRef = useRef()
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef()
    const [open, setOpen] = useState(false)

    const handleOpen = (e) => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        socket.current=io("ws://localhost:2512")
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
              senderId: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });
    }, [])
    
    useEffect(() => {
        arrivalMessage &&
        (loggedInUser._id === arrivalMessage.senderId || friendId === arrivalMessage.senderId) &&
        setCurrentChat((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        socket.current.emit("addUser",loggedInUser._id)
        socket.current.on("getUsers",users=>{
    })
    }, [loggedInUser])

    useEffect(async ()=>{
        if(friendId !== undefined){
            await axios.get(`http://localhost:2511/users/${friendId}`).then((res)=> setFriendDetails(res.data.data))
        }
    },[friendId])
    useEffect(async () => {     
        await axios.get(`http://localhost:2511/message/${conversationId}`).then((res)=>setCurrentChat([...res.data]))
    }, [conversationId])
    const handleSendMessage=async (text)=>{
        const payload = {
            conversationId: conversationId,
            senderId: loggedInUser._id ,
            text: text
        }

        socket?.current.emit("sendMessage",{
            senderId:loggedInUser._id,
            receiverId:friendId,
            text:text
        })

        await axios.post("http://localhost:2511/message",payload).then((res)=>setCurrentChat([...currentChat,res.data]))
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [currentChat])

    if(friendDetails === null){
        return(
            <Wrapper>
                <MessageImg src="https://static.thenounproject.com/png/172101-200.png" alt="" />
               <MsgPara>Your Messages</MsgPara>
               <PrivateMsgPara>Send private messages to a friend.</PrivateMsgPara>
               <NewMsgBtn onClick={handleOpen}>Send Message</NewMsgBtn>
               { open&&
                    <SearchPopUp open={open} close={handleClose}/>
                }
            </Wrapper>
        )
    }else{
        return (
            <div className={chatBoxStyles.main}>
               {/* top */}
                <div className={chatBoxStyles.frienddata}>
                    <img className={chatBoxStyles.friendProfileImg}  src={friendDetails?.profilePic} alt="" />
                    <p>
                        {friendDetails?.username} 
                    </p>    
                </div>
               <div className={chatBoxStyles.messageBox}>
                    {
                        currentChat?.map((item)=>
                            <div ref={scrollRef}>
                                <Message data={item} ownMessage={item.senderId===loggedInUser._id}/>
                            </div>
                        )
                    }
               </div>
               {/* inpt own msg */}
               <div>
                    <MessageInput handleSendMessage={handleSendMessage} />
               </div>
            </div>
        )
    }
}

export default ChatBox

const Wrapper= styled.div`
    border:1px solid #DBDBDB;
    border-left: none;
    width:65%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const MessageImg = styled.img`
    width: 15% ;
    border: 2px solid black;
    border-radius: 50%;
    padding: .7rem;
    padding-left: .5rem;
    transform: rotate(12deg);
`
const NewMsgBtn = styled.button`
    margin: 20px;
    padding: .4rem;
    border: none;
    outline: none;
    border-radius: .3rem;
    background-color: #0095F6 ;
    color: white;
    cursor: pointer;
`
const MsgPara = styled.p`
    font-weight: 300;
    color: #262634;
    font-size: 22px;
    margin-top: 10px;
    margin-bottom: 5px;
`
const PrivateMsgPara = styled.p`
    color: #9D8E8E;
    font-size: 14px;
`