import React, { useEffect } from "react"
import {Container,Paper,Modal, makeStyles } from "@material-ui/core";
import styled from "styled-components"
import CloseIcon from '@material-ui/icons/Close';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Redux/Suggestions/Action";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { loadData } from "../../../Utils/localStorage";

const useStyles = makeStyles((theme) => ({
    paper: {
      width: "30%",
      margin: "auto",
      height: "400px",
      marginTop: theme.spacing(14),
      outline: "none",
      borderRadius: '12px'
    } 
}));

const SearchPopUp = ({open, close}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("")
  const suggestions = useSelector(state => state.user.user)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [active, setActive] = useState(0)
  const dispatch = useDispatch()
  const [conversationId,SetConversationId] = useState("")
  const [reecievedId,setRecievedId] = useState("")

  useEffect(() => {
    dispatch(getUsers())
    },[dispatch])

    useEffect(() => {
        let output = suggestions?.filter((item) => item.username.toLowerCase().indexOf(query) !== -1 ? true:false).map((item) => [item._id, item.profilePic, item.username, item.fullname])
        setSuggestedUsers(output)
    },[suggestions, query])

    const handleActiveSuggestions = (e)=> {
        // scrollRef.current.scrollTop += 20
        switch(e.keyCode) {
            case 40: {
                if(active >= suggestions.length){
                    setActive(0)
                }
                else {
                    setActive((prev) => prev+1)
                }
                break;
            }
            case 38: {
                if(active === 1){
                    setActive(0)
                }else if (active <=0){
                    setActive(suggestions.length)
                }
                else {
                    setActive((prev) => prev-1)
                }
                break;
            }
            default:{
                return;
            }
        }
    }
    const handleConversations = async (recieverId)=>{
        await setRecievedId(recieverId)
        const loggedInUser = loadData("users");
        const payload = {
            senderId:loggedInUser._id,
            receiverId:recieverId
        }
        await axios.post("http://localhost:2511/newConversation",payload).then((res)=>SetConversationId(res.data._id))
    }
    if(conversationId !== ""){
        close()
       return <Redirect to={`/direct/inbox/${conversationId}/${reecievedId}`} push/>
    }
    return (
        <>
         <Container>
            <Modal open={open} onClose={close}
                >
                <Paper className={classes.paper}>
                    <Head>
                        <div></div>
                        <h4>New Message</h4>
                        <CloseIcon onClick={close}/>
                    </Head>
                    <Search onKeyUp={handleActiveSuggestions}>
                        <h5>To: </h5>
                        <input placeholder="Search..." value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                        
                        />
                    </Search>
                    <Suggest>
                        <h5>Suggested</h5>
                        {
                            !query && 
                            suggestions?.map((item) => (
                                <div key={item._id} onClick={()=>handleConversations(item._id)}>
                                    <UsersProfile>
                                        <img src={item.profilePic} alt="profile"/>
                                        <div>
                                            <p>{item.username}</p>
                                            <NamePara>{item.fullname}</NamePara>
                                        </div>
                                    </UsersProfile>
                                
                                </div>
                            ))
                        }
                        { query &&
                            suggestedUsers?.map((item) => (
                                <div key={item._id} onClick={()=>handleConversations(item._id)}>
                                    <UsersProfile key={item[0]}>
                                        <img src={item[1]} alt="profile"/>
                                        <div>
                                            <p>{item[2]}</p>
                                            <NamePara>{item[3]}</NamePara>
                                        </div>
                                    </UsersProfile>
                                </div>
                            ))
                        }
                    </Suggest>
                </Paper>
            </Modal>
        </Container>   
        </>
    )
}

export {SearchPopUp}

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgrey;
    padding: 2% 3%;
    
`
const Search = styled.div`
    display: flex;
    border-bottom: 1px solid lightgrey;
    padding: 4% 3%;
    h5{
        color: #454545;
        font-weight: 600;
        font-size: 15px;
    }
    input {
        width: 100%;
        outline: none;
        border: none;
        padding-left:10%;
        ::placeholder{
            color: lightgrey
        }
    }
`
const Suggest = styled.div`
    padding: 3%;
    overflow-y: scroll;
    height: 295px;
    h5{
        color: #454545;
        font-weight: 600;
        font-size: 15px;
        padding: .6rem;
        padding-top: 0%;
    }
    p{
        color: black;
        font-size: 14px;
    }
`

const UsersProfile = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: .5rem;
    :hover{
        background: rgb(250,250,250);
        cursor: pointer;
    }
    img {
        border-radius: 25px;
        margin: 2px;
        width: 40px;
        height: 40px;
    }
`

const NamePara = styled.div`
    color: gray;
    font-size: 14px;
`