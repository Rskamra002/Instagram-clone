import React, { useEffect } from "react"
import {Container,Paper,Modal, makeStyles } from "@material-ui/core";
import styled from "styled-components"
import CloseIcon from '@material-ui/icons/Close';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Redux/Suggestions/Action";
import { Link } from "react-router-dom";

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

    return (
        <>
         <Container>
            <Modal open={open}
                >
                <Paper className={classes.paper}>
                    <Head>
                        <CloseIcon onClick={close}/>
                        <h4>New Message</h4>
                        <p>Next</p>
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
                            <p>No account found.</p>
                        }
                        { query &&
                            suggestedUsers?.map((item) => (
                                <Link to={`/${item[2]}`}>
                                    <UsersProfile key={item[0]}>
                                        <img src={item[1]} alt="profile"/>
                                        <div>
                                            <p>{item[2]}</p>
                                            <p>{item[3]}</p>
                                        </div>
                                    </UsersProfile>
                                </Link>
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
    h4{
        color: #454545;
        font-weight: 600
    }
    p{
        color: #D3EDFE;
        font-weight: 600
    }
    
`
const Search = styled.div`
    display: flex;
    border-bottom: 1px solid lightgrey;
    padding: 4% 3%;
    h5{
        color: #454545;
        font-weight: 600
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
    height: 290px;
    h5{
        color: #454545;
        font-weight: 600
    }
    p{
        color: lightgrey;
        padding-top: 6%;
        font-size: 14px;
    }
`

export const UsersProfile = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin:5px;
    :hover{
        background: rgb(250,250,250);
    }
    img {
        border-radius: 25px;
        margin: 2px;
        width: 40px;
        height: 40px;
    }

`
