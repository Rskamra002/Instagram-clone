import React from 'react'
import { useParams } from 'react-router-dom'

function ChatBox() {
    const {username} = useParams()
    if(username === undefined || username == {} || username === null){
        return(
            <div style={{border:"1px solid black",width:"65%"}}>
                hyyy this is not having username
            </div>
        )
    }else{
        return (
            <div style={{border:"1px solid black",width:"65%"}}>
               {username}
            </div>
        )
    }
}

export default ChatBox
