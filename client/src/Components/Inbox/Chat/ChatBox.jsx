import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadData } from '../../../Utils/localStorage';
import chatBoxStyles from "./chatBox.module.css";
import Message from './Message';
import MessageInput from './MessageInput';
import {io} from "socket.io-client"

function ChatBox() {
    const {conversationId,friendId} = useParams()
    const loggedInUser = loadData("users");
    const [currentChat, setCurrentChat] = useState([])
    const [friendDetails, setFriendDetails] = useState(null)
    const scrollRef = useRef()
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef()

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
        await axios.get(`http://localhost:2511/users/${friendId}`).then((res)=> setFriendDetails(res.data.data))

    },[friendId])
    useEffect(async () => {     
        await axios.get(`http://localhost:2511/message/${conversationId}`).then((res)=>setCurrentChat([...res.data]))
    }, [conversationId])
    console.log(currentChat)
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
            <div style={{border:"1px solid black",width:"65%"}}>
                hyyy this is not having friendid
            </div>
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
