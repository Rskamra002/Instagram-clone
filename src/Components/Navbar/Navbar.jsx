import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Redux/Suggestions/Action';

function Navbar() {
    const scrollRef = useRef()
    const [query, setQuery] = useState("")
    const [active, setActive] = useState(0)
    const [show, setShow] = useState([])
    const [suggestedUsers, setSuggestedUsers] = useState([])
    
    const suggestions = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUsers())
    },[dispatch])

    const handleClear = () => {
        setQuery("")
    }

    useEffect(() => {
        if(query === ""){
            setShow([])
        }else {
            let output = suggestions.filter((item) => item.username.toLowerCase().indexOf(query) !== -1 ? true:false).map((item) => item.username)
            setSuggestedUsers(output)
        }
    },[query, suggestions])



    const handleActiveSuggestions = (e)=> {
        scrollRef.current.scrollTop += 20
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
            // case 13 : {

            // }
            // break;
            default:{
                return;
            }
        }

    }

    return (
        <Wrapper>
            <Container>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/>
                <SearchBar onKeyUp={handleActiveSuggestions}>
                    {/* <Search/> */}
                    <img src="https://icon-library.com/images/white-search-icon-png/white-search-icon-png-18.jpg" width="18px" height="18px" alt=""/>
                    <input 
                    placeholder="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    { query && <div onClick={handleClear}>X</div>}
                </SearchBar>
                {
                    <SuggestionBox ref={scrollRef} len={suggestedUsers.length}>
                        { query &&
                            suggestedUsers.map((item) => (
                                <div key={item} >{item}</div>
                            ))
                        }
                    </SuggestionBox>
                }
                <IconsWrapper>
                    <HomeIcon/>
                    <SendIcon/>
                    <ExploreIcon/>
                    <FavoriteBorderIcon/>
                    <AccountCircleIcon/>
                </IconsWrapper>
            </Container>
        </Wrapper>
    )
}

export {Navbar}

const Wrapper = styled.div`
    height:54px;
    border-bottom: 1px solid rgb(219,219,219);
`
const Container = styled.div`
    width: 68%;
    height:100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const SearchBar = styled.div`
    background: #FAFAFA;
    border: 0.5px solid #DBDBDB;
    align-items: center;
    padding: 2px;
    text-align: center;
    color: #C3C3C3;
    input {
        border: none;
        outline: none;
        background: transparent;
    }
`
const IconsWrapper = styled.div`
    display: flex;
    gap: 18px;
    & * {
        width: 40px;
    }
`
const SuggestionBox = styled.div`
    display: ${({len}) => (len !== 0 ? "flex" : "none")};
    flex-direction: column;
`

